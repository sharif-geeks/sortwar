import numpy as np
import sys

if __name__ == "__main__":
  outputFile = sys.argv[1]
  np_load_old = np.load
  np.load = lambda *a,**k: np_load_old(*a, allow_pickle=True, **k)
  arr = np.load(outputFile)
  result = np.all(np.diff(arr) >= 0)
  print(result)