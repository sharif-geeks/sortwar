import sys
import string
import numpy as np
import random as rnd

rnd.seed(1)

if __name__ == "__main__":
    count = int(sys.argv[1])
    type = sys.argv[2]
    outDir = sys.argv[3]

    data = None
    arr = []
    if(type == "integer"):
        sub = 2**33
        base = sub * 2
        for i in range(count):
            num = int(rnd.random() * base - sub)
            arr.append(num)
        data = np.asarray(arr)
    elif(type == "double"):
        sub = 5 * 10**(-345)
        base = sub * 2
        for i in range(count):
            num = float(rnd.random() * base - sub)
            arr.append(num)
        data = np.asarray(arr)
    elif(type == "string"):
        scope = string.ascii_letters
        for i in range(count):
            size = int(rnd.random() * 80 + 1)
            rndstr = ''.join(rnd.choice(scope) for i in range(size))
            arr.append(rndstr.encode('utf-8'))
        data = np.array(arr)

    np.save(outDir + '\\' + str(count) + '-' + type + '-normal.npy', data)
