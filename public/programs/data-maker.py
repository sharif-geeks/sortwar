import sys
from random import seed
from random import random
seed(1)

if __name__ == "__main__":
  type = int if sys.argv[1] == "integer" else float if sys.argv[1] == "double" else str
  count = int(sys.argv[2])
  if(type == int):
    for i in range(count):
      num = int(random() * 2**33 - 2**32)
      print(num)