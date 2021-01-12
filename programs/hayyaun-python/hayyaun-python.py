import string
import sys
import time

import numpy as np

from bubbleSort import bubbleSort
from countingSort import countingSort
from heapSort import heapSort
from insertionSort import insertionSort
from mergeSort import mergeSort
from quickSort import quickSort
from radixSort import radixSort


# DEFAULT
def defaultSort(arr):

    nparr = np.array(arr)
    return np.sort(nparr)


# MAIN FUNCTION
if __name__ == "__main__":

    algo = sys.argv[1]
    # count = int(sys.argv[2])
    type = sys.argv[3]
    inFile = sys.argv[4]
    outFile = sys.argv[5]

    data = np.load(inFile)

    def saveAndCalcTime(func):
        arr = data.tolist()
        start_time = time.time()  # start time
        sorted = func(arr)
        print(int((time.time() - start_time) * 1000))  # end time
        np.save(outFile, sorted if algo == "default" else np.array(arr))

    sortFunction = None
    if(algo == "default"):
        sortFunction = defaultSort
    elif(algo == "insertion"):
        sortFunction = insertionSort
    elif(algo == "bubble"):
        sortFunction = bubbleSort
    elif(algo == "merge"):
        sortFunction = mergeSort
    elif(algo == "quick"):
        def sortFunction(arr): return quickSort(arr, 0, len(arr) - 1)
    elif(algo == "heap"):
        sortFunction = heapSort
    elif(algo == "counting"):
        sortFunction = countingSort
    elif(algo == "radix"):
        sortFunction = radixSort

    saveAndCalcTime(sortFunction)
