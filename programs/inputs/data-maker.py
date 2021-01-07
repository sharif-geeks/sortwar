import sys
import string
import numpy as np
import random as rnd

rnd.seed(1)

if __name__ == "__main__":
  count = int(sys.argv[1])
  type = sys.argv[2]

  if(type == "integer"):
    arr = []
    sub = 2**33
    base = sub * 2
    for i in range(count):
      num = int(rnd.random() * base - sub)
      arr.append(num)
    data = np.asarray(arr)
    np.save('.\\programs\\inputs\\' + str(count) + '-integer.npy', data)
  
  elif(type == "double"):
    arr = []
    sub = 5 * 10**(-345)
    base = sub * 2
    for i in range(count):
      num = float(rnd.random() * base - sub)
      arr.append(num)
    data = np.asarray(arr)
    np.save('.\\programs\\inputs\\' + str(count) + '-double.npy', data)

  elif(type == "string"):
    arr = []
    scope = string.ascii_letters
    for i in range(count):
      size = int(rnd.random() * 80 + 1)
      rndstr = ''.join(rnd.choice(scope) for i in range(size))
      arr.append(rndstr.encode('utf-8'))
    data = np.array(arr)
    np.save('.\\programs\\inputs\\' + str(count) + '-string.npy', data)
