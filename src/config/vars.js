import { algorithms, authors, formats, languages, threads } from "./types"

export const wdir = ".\\public\\programs"

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
