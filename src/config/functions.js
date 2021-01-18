import { languages, modes } from "./types"
import { inputsPath, outputsPath, wdir } from "./vars"

export const callDataGen = ({ count, type, mode }) => mode === modes.normal ? ({
  file: 'python', args: [`${inputsPath}\\data-maker.py`, count, type, inputsPath]
}) : ({
  file: 'python', args: [`${inputsPath}\\data-shuffler.py`, 0, count, type, inputsPath]
})

export const callProgram = ({ author, lang, format, algo, count, type, mode }) => {
  const appName = `${wdir}\\${author}-${lang}\\${author}-${lang}.${format}`
  const inputFile = `${inputsPath}\\${count}-${type}-${mode}.npy`
  const outputFile = `${outputsPath}\\${author}\\${lang}-${algo}-${count}-${type}-${mode}.npy`

  return ({
    file: lang === languages.python ? "python" : appName,
    args: [...(lang === languages.python ? [appName] : []), algo, count, type, inputFile, outputFile]
  })
}

export const callReferee = ({ author, lang, algo, count, type, mode }) => ({
  file: 'python', args: [
    `${outputsPath}\\referee.py`,
    `${outputsPath}\\${author}\\${lang}-${algo}-${count}-${type}-${mode}.npy`
  ]
})
