import sys
import random as rnd
import numpy as np

rnd.seed(1)

if __name__ == "__main__":
    start = int(sys.argv[1])
    stop = int(sys.argv[2])
    type = sys.argv[3]
    outDir = sys.argv[4]

    arr = np.arange(stop)
    np.random.shuffle(arr)

    np.save(outDir + '\\' +
            str(stop) + '-' + type + '-shuffle.npy', arr)
