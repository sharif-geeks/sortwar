import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();

document.addEventListener("keydown", function (e) {
  if (e.which === 123) {
    window.electron.remote.getCurrentWebContents().toggleDevTools();
  } else if (e.which === 116) {
    window.location.reload();
  }
});