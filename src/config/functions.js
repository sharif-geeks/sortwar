import { languages, modes } from "./types"
import { wdir } from "./vars"

export const callDataGen = ({ count, type, mode, start, end }) => mode === modes.normal ? ({
  file: 'python', args: [`${wdir}\\inputs\\data-maker.py`, count, type, `${wdir}\\inputs\\`]
}) : ({
  file: 'python', args: [`${wdir}\\inputs\\data-shuffler.py`, start, end, type, `${wdir}\\inputs\\`]
})

export const callProgram = ({ author, lang, format, algo, count, type, mode }) => {
  const appName = `${wdir}\\${author}-${lang}\\${author}-${lang}.${format}`
  const inputFile = `${wdir}\\inputs\\${count}-${type}-${mode}.npy`
  const outputFile = `${wdir}\\outputs\\${author}\\${lang}-${algo}-${count}-${type}-${mode}.npy`

  return ({
    file: lang === languages.python ? "python" : appName,
    args: [...(lang === languages.python ? [appName] : []), algo, count, type, inputFile, outputFile]
  })
}

export const callReferee = ({ author, lang, algo, count, type, mode }) => ({
  file: 'python', args: [`${wdir}\\outputs\\referee.py`, `${wdir}\\outputs\\${author}\\${lang}-${algo}-${count}-${type}-${mode}.npy`]
})