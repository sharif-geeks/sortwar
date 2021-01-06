const languages = {
  cpp: "C++",
  go: "GoLang",
  python: "Python",
  java: "Java"
}

const algorithms = {
  bubble: "Bubble Sort",
  insertion: "Insertion Sort",
  heap: "Heap Sort",
  quick: "Quick Sort",
  merge: "Merge Sort",
}

const authors = {
  hayyaun: "Hayyaun",
  arman: "Arman",
  default: "Lang. Default"
}

const formats = {
  exe: "exe", wasm: "wasm", py: "py"
}

const threads = {
  single: "Single Thread",
  multi: "Multi Thread"
}

const programs = [
  {
    author: authors.hayyaun,
    algo: algorithms.merge,
    format: formats.wasm,
    lang: languages.cpp,
    thread: threads.single
  }
]

export default programs