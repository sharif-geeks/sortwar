import { useCallback, useMemo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { callDataGen, callProgram, callReferee } from "../config/functions";
import { authors, formats, languages } from "../config/types";
import { wdir } from "../config/vars";
import {
  algoAtom,
  authorAtom,
  countAtom,
  execTimesAtom,
  langAtom,
  modeAtom,
  snackbarAtom,
  typeAtom
} from "../recoil/atoms";

const { execFile } = window.childProcess;

export default function useCallers() {
  const [mode] = useRecoilState(modeAtom);
  const [author] = useRecoilState(authorAtom);
  const [type] = useRecoilState(typeAtom)
  const [lang] = useRecoilState(langAtom);
  const [algo] = useRecoilState(algoAtom);
  const [count] = useRecoilState(countAtom);
  const format = useMemo(
    () => (lang === languages.python ? formats.py : formats.exe),
    [lang]
  );

  const setExecTimes = useSetRecoilState(execTimesAtom)
  const setSnackbar = useSetRecoilState(snackbarAtom)
  const [busy, setBusy] = useState(false)

  const handleCallDataGen = useCallback(() => {
    setBusy(true)
    const { file, args } = callDataGen({ count, type, mode });

    execFile(file, args, (error, stdout, stderr) => {
      if (error) console.error(`exec error: ${error}`);
      if (stderr) console.error(`stderr: ${stderr}`);
      console.log(`stdout: ${stdout || "done!"}`);

      if (!error) {
        setSnackbar({ message: "Data generated successfully!", severity: "success" })
      } else {
        setSnackbar({ message: "Something went wrong!", severity: "error" })
      }
      setBusy(false)
    });
  }, [count, mode, setSnackbar, type]);

  const handleCallProgram = useCallback(() => {
    setBusy(true)
    const { file, args } = callProgram({ author, lang, format, algo, count, type });

    const child = execFile(file, args, (error, stdout, stderr) => {
      if (error) console.error(`exec error: ${error}`);
      if (stderr) console.error(`stderr: ${stderr}`);
      console.log(`stdout: ${stdout || "done!"}`);

      if (stdout) {
        // save calc exec time
        const execTimesInit = window.fs.readFileSync(
          `${wdir}\\outputs\\${author}\\exec-times.json`
        );
        const execTimesObj = JSON.parse(execTimesInit);
        execTimesObj[`${lang}-${algo}-${count}-${type}`] = parseInt(stdout);
        setExecTimes(execTimesObj)
        const execTimesNew = JSON.stringify(execTimesObj);
        window.fs.writeFileSync(
          `${wdir}\\outputs\\${authors.hayyaun}\\exec-times.json`,
          execTimesNew
        );
      }

      if (!error) {
        setSnackbar({ message: `Data sorted successfully in ${stdout}ms!`, severity: "success" })
      } else {
        setSnackbar({ message: "Something went wrong while sorting!", severity: "error" })
      }
      setBusy(false)
    });

    const getChildStats = () =>
      window.pidusage(child.pid, function (err, stats) {
        console.log(stats);
      });

    const statsInterval = setInterval(getChildStats, 1000);

    child.on("exit", () => {
      console.log("EXITED", child.pid);
      clearInterval(statsInterval);
    });
  }, [algo, author, count, format, lang, setExecTimes, setSnackbar, type]);

  const handleCallReferee = useCallback(() => {
    setBusy(true)
    const { file, args } = callReferee({ author, lang, algo, count, type });

    execFile(file, args, (error, stdout, stderr) => {
      if (error) console.error(`exec error: ${error}`);
      if (stderr) console.error(`stderr: ${stderr}`);
      console.log(`stdout: ${stdout || "done!"}`);

      if (!error) {
        if (String(stdout).includes("True")) setSnackbar({ message: "Data is sorted correctly!", severity: "success" })
        else setSnackbar({ message: "Data is sorted with errors!", severity: "warning" })
      } else {
        setSnackbar({ message: "Something went wrong!", severity: "error" })
      }

      setBusy(false)
    });
  }, [algo, author, count, lang, setSnackbar, type]);

  return { handleCallDataGen, handleCallProgram, handleCallReferee, busy }
}