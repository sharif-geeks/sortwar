import { useCallback } from 'react';
import { callDataGen, callProgram, callReferee } from './config/functions';
import { algorithms, authors, dataTypes, formats, languages, sortRanges } from './config/types';

const { execFile } = window.childProcess;

// const a = window.fs.readFileSync('.\\programs\\outputs\\hayyaun\\calc-times.json')
// const b = JSON.parse(a)
// b.visited = true
// const c = JSON.stringify(b)
// window.fs.writeFileSync('.\\programs\\outputs\\hayyaun\\calc-times.json', c)

function App() {
  const handleCallDataGen = useCallback(() => {
    const { file, args } = callDataGen({
      count: sortRanges[1],
      type: dataTypes.integer
    })

    execFile(file, args, (error, stdout, stderr) => {
      if (error) console.error(`exec error: ${error}`);
      if (stderr) console.error(`stderr: ${stderr}`);
      console.log(`stdout: ${stdout || "done!"}`);
    })
  }, [])

  const handleCallProgram = useCallback(() => {
    const { file, args } = callProgram({
      author: authors.hayyaun,
      lang: languages.csharp,
      format: formats.exe,
      algo: algorithms.quick,
      count: sortRanges[1],
      type: dataTypes.integer
    })

    const child = execFile(file, args, (error, stdout, stderr) => {
      if (error) console.error(`exec error: ${error}`);
      if (stderr) console.error(`stderr: ${stderr}`);
      console.log(`stdout: ${stdout || "done!"}`);
    })

    const getChildStats = () =>
      window.pidusage(child.pid, function (err, stats) {
        console.log(stats);
      });

    const statsInterval = setInterval(getChildStats, 1000);

    child.on('exit', () => {
      console.log('EXITED', child.pid)
      clearInterval(statsInterval)
    })
  }, [])

  const handleCallReferee = useCallback(() => {
    const { file, args } = callReferee({
      author: authors.hayyaun,
      lang: languages.csharp,
      algo: algorithms.quick,
      count: sortRanges[1],
      type: dataTypes.integer
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

