import { atom } from "recoil";
import { algorithms, authors, dataTypes, languages, modes, sortRanges } from "../config/types";

// selectors
export const modeAtom = atom({ key: "mode", default: modes.normal, persistence_UNSTABLE: { type: 'mode' } })
export const countAtom = atom({ key: 'count', default: sortRanges[0], persistence_UNSTABLE: { type: 'count' } })
export const typeAtom = atom({ key: "type", default: dataTypes.integer, persistence_UNSTABLE: { type: 'type' } })
export const langAtom = atom({ key: "lang", default: languages.python, persistence_UNSTABLE: { type: 'lang' } })
export const algoAtom = atom({ key: "algo", default: algorithms.heap, persistence_UNSTABLE: { type: 'algo' } })
export const authorAtom = atom({ key: "author", default: authors.hayyaun, persistence_UNSTABLE: { type: 'author' } })
// graphs
export const execTimesAtom = atom({ key: "execTimes", default: {}, persistence_UNSTABLE: { type: 'execTimes' } })
export const statsAtom = atom({ key: "stats", default: [], persistence_UNSTABLE: { type: 'stats' } })
// session
export const snackbarAtom = atom({ key: "snackbar", default: { message: "", severity: "info" } })