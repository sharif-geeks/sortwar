const runExec = (cmd) => {
  const child_process = require('child_process')
  child_process.exec(cmd)
}

exports.runExec = runExec