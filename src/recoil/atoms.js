import { atom } from "recoil";
import { algorithms, authors, dataTypes, languages, modes, sortRanges } from "../config/types";

export const modeAtom = atom({ key: "mode", default: modes.normal })
export const countAtom = atom({ key: 'count', default: sortRanges[0] })
export const typeAtom = atom({ key: "type", default: dataTypes.integer })
export const langAtom = atom({ key: "lang", default: languages.python })
export const algoAtom = atom({ key: "algo", default: algorithms.heap })
export const authorAtom = atom({ key: "author", default: authors.hayyaun })

export const execTimesAtom = atom({ key: "execTimes", default: {} })
export const statsAtom = atom({ key: "stats", default: [] })

export const snackbarAtom = atom({ key: "snackbar", default: { message: "", severity: "info" } })