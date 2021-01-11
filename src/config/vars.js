import { algorithms, authors, formats, languages, threads } from "./types"

const app = window.electron.remote.app;
export const wdir = `${app.getAppPath()}\\${process.env.NODE_ENV === "production" ? "programs" : "programs-dev"}`
console.log(wdir)

export const programs = [
  {
    algo: algorithms.merge, // can be anything depending on your app
    author: authors.hayyaun,
    format: formats.py,
    lang: languages.python,
    thread: threads.single,
    name: "Merge Sort (Python)"
  }
]

export const authorHasLangs = {
  hayyaun: [languages.python, languages.cs],
  arman: [languages.go]
}
