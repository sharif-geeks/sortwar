import { languages } from "./types"
import { wdir } from "./vars"

export const callDataGen = ({ count, type }) => ({
  file: 'python', args: [`${wdir}\\inputs\\data-maker.py`, count, type, `${wdir}\\inputs\\`]
})

export const callProgram = ({ author, lang, format, algo, count, type }) => {
  const appName = `${wdir}\\${author}-${lang}.${format}`
  const inputFile = `${wdir}\\inputs\\${count}-${type}.npy`
  const outputFile = `${wdir}\\outputs\\${author}\\${lang}-${algo}-${count}-${type}.npy`

  return ({
    file: lang === languages.python ? "python" : appName,
    args: [...(lang === languages.python ? [appName] : []), algo, count, type, inputFile, outputFile]
  })
}

export const callReferee = ({ author, lang, algo, count, type }) => ({
  file: 'python', args: [`${wdir}\\outputs\\referee.py`, `${wdir}\\outputs\\${author}\\${lang}-${algo}-${count}-${type}.npy`]
})