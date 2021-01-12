import sys
import random as rnd
import numpy as np

rnd.seed(1)

if __name__ == "__main__":
    start = int(sys.argv[1])
    stop = int(sys.argv[2])
    type = sys.argv[3] or "integer"
    outDir = sys.argv[4]

    arr = []
    i = 0
    while i < stop:
        num = rnd.randrange(start, stop)
        if(num not in arr):
            arr.append(num)
            i += 1

    data = np.asarray(arr)
    np.save(outDir + '\\' + str(start) + '-' +
            str(stop) + '-' + type + '-shuffle.npy', data)
