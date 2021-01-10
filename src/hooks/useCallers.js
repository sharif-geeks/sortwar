import { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";
import { callDataGen, callProgram, callReferee } from "../config/functions";
import { authors, formats, languages } from "../config/types";
import { wdir } from "../config/vars";
import {
  algoAtom,
  authorAtom,
  countAtom,
  langAtom,
  modeAtom,
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

  const handleCallDataGen = useCallback(() => {
    const { file, args } = callDataGen({ count, type, mode });

    execFile(file, args, (error, stdout, stderr) => {
      if (error) console.error(`exec error: ${error}`);
      if (stderr) console.error(`stderr: ${stderr}`);
      console.log(`stdout: ${stdout || "done!"}`);
    });
  }, [count, mode, type]);

  const handleCallProgram = useCallback(() => {
    const { file, args } = callProgram({ author, lang, format, algo, count, type });

    const child = execFile(file, args, (error, stdout, stderr) => {
      if (error) console.error(`exec error: ${error}`);
      if (stderr) console.error(`stderr: ${stderr}`);
      if (stdout) {
        console.log(`stdout: ${stdout || "done!"}`);

        // save calc exec time
        const execTimesInit = window.fs.readFileSync(
          `${wdir}\\outputs\\${author}\\exec-times.json`
        );
        const execTimesObj = JSON.parse(execTimesInit);
        execTimesObj[`${languages.cs}-${algo}-${count}-${type}`] = parseInt(stdout);
        const execTimesNew = JSON.stringify(execTimesObj);
        window.fs.writeFileSync(
          `${wdir}\\outputs\\${authors.hayyaun}\\exec-times.json`,
          execTimesNew
        );
      }
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
  }, [algo, author, count, format, lang, type]);

  const handleCallReferee = useCallback(() => {
    const { file, args } = callReferee({ author, lang, algo, count, type });

    execFile(file, args, (error, stdout, stderr) => {
      if (error) console.error(`exec error: ${error}`);
      if (stderr) console.error(`stderr: ${stderr}`);
      console.log(`stdout: ${stdout || "done!"}`);
    });
  }, [algo, author, count, lang, type]);

  return { handleCallDataGen, handleCallProgram, handleCallReferee }
}