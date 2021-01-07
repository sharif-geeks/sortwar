import { useCallback } from 'react';
import { algorithms, authors, formats, languages } from './types';

const { execFile } = window.childProcess;

const wdir = ".\\programs"
export const callDataGen = ({ count, type }) => ({
  file: 'python', args: [`${wdir}\\inputs\\data-maker.py`, count, type]
})

export const callProgram = ({ author, lang, format, algo, count, type }) => {
  const appName = `${wdir}\\${author}-${lang}.${format}`
  const inputFile = `${wdir}\\inputs\\${count}-${type}.npy`
  const outputFile = `${wdir}\\outputs\\${author}\\${lang}-${algo}-${count}-${type}.npy`

  return ({
    file: format === formats.py ? "python" : appName,
    args: [...(format === formats.py ? [appName] : []), algo, count, type, inputFile, outputFile]
  })
}

export const callReferee = ({ author, lang, algo, count, type }) => ({
  file: 'python', args: [`${wdir}\\outputs\\referee.py`, `${wdir}\\outputs\\${author}\\${lang}-${algo}-${count}-${type}.npy`]
})

function App() {
  const handleCallDataGen = useCallback(() => {
    const { file, args } = callDataGen({
      count: 10000000,
      type: "integer"
    })

    execFile(file, args, (error, stdout, stderr) => {
      if (error) console.error(`exec error: ${error}`);
      if (stderr) console.error(`stderr: ${stderr}`);
      console.log(`stdout: ${stdout || "done!"}`);
    })
  }, [])

  const handleCallProgram = useCallback(() => {
    const { file, args } = callProgram({
      author: authors.arman,
      lang: languages.go,
      format: formats.exe,
      algo: algorithms.default,
      count: 10000000,
      type: "integer"
    })

    execFile(file, args, (error, stdout, stderr) => {
      if (error) console.error(`exec error: ${error}`);
      if (stderr) console.error(`stderr: ${stderr}`);
      console.log(`stdout: ${stdout || "done!"}`);
    })
  }, [])

  const handleCallReferee = useCallback(() => {
    const { file, args } = callReferee({
      author: authors.arman,
      lang: languages.go,
      algo: algorithms.default,
      count: 10000000,
      type: "integer"
    })

    execFile(file, args, (error, stdout, stderr) => {
      if (error) console.error(`exec error: ${error}`);
      if (stderr) console.error(`stderr: ${stderr}`);
      console.log(`stdout: ${stdout || "done!"}`);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={handleCallDataGen}>Make Random Data</button>
        <button onClick={handleCallProgram}>Sort Gen Data</button>
        <button onClick={handleCallReferee}>Check if correctly sorted</button>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Algo
        </a>
      </header>
    </div>
  );
}

export default App;

