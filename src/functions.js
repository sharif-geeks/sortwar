export const dataGen = ({ type, count }) =>
  `python .\\programs\\data-maker.py ${type} ${count === "1m" ? 10000000000 : 1000000000000} > .\\programs\\inputs\\${count}\\${type}.txt`

export const useProgram = ({ author, lang, format, type, count, algo }) =>
  `${format === "py" ? "python " : ""}.\\programs\\${author}-${lang}.${format} .\\programs\\inputs\\${count}\\${type}.txt ${algo} ${type} > .\\programs\\outputs\\${author}\\${lang}\\${count}\\${algo}\\${type}.txt`
