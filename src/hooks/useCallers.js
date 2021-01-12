import { useCallback, useMemo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { callDataGen, callProgram, callReferee } from "../config/functions";
import { formats, languages } from "../config/types";
import { wdir } from "../config/vars";
import {
  algoAtom,
  authorAtom,
  countAtom,
  execTimesAtom,
  langAtom,
  modeAtom,
  snackbarAtom,
  statsAtom,
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

  const setStats = useSetRecoilState(statsAtom)
  const setExecTimes = useSetRecoilState(execTimesAtom)
  const setSnackbar = useSetRecoilState(snackbarAtom)
  const [busy, setBusy] = useState(false)

  const execTimesFilePath = useMemo(() => `${wdir}\\outputs\\${author}\\exec-times.json`, [author]);

  /**
   * 
   * handleCallDataGen
   * 
   */
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

  /**
   * 
   * handleCallProgram
   * 
   */
  const handleCallProgram = useCallback(() => {
    setBusy(true)
    const { file, args } = callProgram({ author, lang, format, algo, count, type, mode });

    const child = execFile(file, args, (error, stdout, stderr) => {
      if (error) console.error(`exec error: ${error}`);
      if (stderr) console.error(`stderr: ${stderr}`);
      console.log(`stdout: ${stdout || "done!"}`);

      if (stdout) {
        // save calc exec time
        let execTimesObj = {};
        try {
          const execTimesInit = window.fs.readFileSync(execTimesFilePath);
          execTimesObj = JSON.parse(execTimesInit);
        } catch (e) {
          console.log(e)
        }
        execTimesObj[`${lang}-${algo}-${count}-${type}-${mode}`] = parseInt(stdout);
        setExecTimes(execTimesObj)
        const execTimesNew = JSON.stringify(execTimesObj);
        window.fs.writeFileSync(
          execTimesFilePath,
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
        setStats(s => ([...s, stats]))
      });

    setStats([])
    const statsInterval = setInterval(getChildStats, 1000);

    child.on("exit", () => {
      console.log("EXITED", child.pid);
      clearInterval(statsInterval);
    });
  }, [algo, author, count, execTimesFilePath, format, lang, mode, setExecTimes, setSnackbar, setStats, type]);

  /**
   * 
   * handleCallReferee
   * 
   */
  const handleCallReferee = useCallback(() => {
    setBusy(true)
    const { file, args } = callReferee({ author, lang, algo, count, type, mode });

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
  }, [algo, author, count, lang, mode, setSnackbar, type]);

  return { handleCallDataGen, handleCallProgram, handleCallReferee, busy }
}