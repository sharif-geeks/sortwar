import { algorithms, languages } from "./types";

const app = window.electron.remote.app;
export const wdir = `${app.getAppPath()}\\programs\\`;

export const authorHasLangs = {
  hayyaun: [languages.python, languages.cs],
  arman: [languages.go]
}

export const modeHasAlgos = {
  normal: [algorithms.default, algorithms.insertion, algorithms.bubble, algorithms.merge, algorithms.heap, algorithms.quick],
  shuffle: [algorithms.default, algorithms.insertion, algorithms.bubble, algorithms.merge, algorithms.heap, algorithms.quick, algorithms.counting, algorithms.radix]
}

export const colors = {
  primary: { main: "#8884d8" },
  secondary: { main: "#439d93" }
}