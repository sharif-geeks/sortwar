import logo from './logo.svg';
import './App.css';

function App() {
  const execFile = (cmd, parameters) => {
    const remote = window.remote;
    remote.require('./electron-starter').runExec(cmd)
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p
          onClick={() => execFile("python .\\programs\\data-maker.py hello > .\\inputs\\a.txt")}
        >
          Edit <code>src/App.js</code> and save to reload.
        </p>
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

