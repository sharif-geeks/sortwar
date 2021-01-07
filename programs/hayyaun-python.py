import sys
import string
import numpy as np
import time


def defaultSort(arr): 
  return np.sort(arr)


## MERGE_SORT
def mergeSort(arr):
  if len(arr) > 1:
    # Finding the mid of the array
    mid = len(arr)//2
    # Dividing the array elements
    L = arr[:mid]
    # into 2 halves
    R = arr[mid:]
    # Sorting the first half
    mergeSort(L)
    # Sorting the second half
    mergeSort(R)

    i = j = k = 0
    # Copy data to temp arrays L[] and R[]
    while i < len(L) and j < len(R):
      if L[i] < R[j]:
        arr[k] = L[i]
        i += 1
      else:
        arr[k] = R[j]
        j += 1
      k += 1

    # Checking if any element was left
    while i < len(L):
      arr[k] = L[i]
      i += 1
      k += 1

    while j < len(R):
      arr[k] = R[j]
      j += 1
      k += 1


### QUICK_SORT
def partition(arr,low,high): 
    i = ( low-1 )         # index of smaller element 
    pivot = arr[high]     # pivot 
  
    for j in range(low , high): 
  
        # If current element is smaller than the pivot 
        if   arr[j] < pivot: 
          
            # increment index of smaller element 
            i = i+1 
            arr[i],arr[j] = arr[j],arr[i] 
  
    arr[i+1],arr[high] = arr[high],arr[i+1] 
    return ( i+1 ) 
  
def quickSort(arr,low,high): 
    if low < high: 
  
        # pi is partitioning index, arr[p] is now 
        # at right place 
        pi = partition(arr,low,high) 
  
        # Separately sort elements before 
        # partition and after partition 
        quickSort(arr, low, pi-1) 
        quickSort(arr, pi+1, high) 

if __name__ == "__main__":
  algo = sys.argv[1]
  count = int(sys.argv[2])
  type = sys.argv[3]
  inFile = sys.argv[4]
  outFile = sys.argv[5]

  data = np.load(inFile)

  def saveAndCalcTime(func):
    start_time = time.time()
    sorted = np.array(func(data))
    print(int((time.time() - start_time) * 1000))
    np.save(outFile, sorted)

  if(algo == "default"):
    saveAndCalcTime(defaultSort)
  elif(algo == "merge"):
    saveAndCalcTime(mergeSort)
  elif(algo == "quick"):
    saveAndCalcTime(lambda arr: quickSort(arr, 0, len(arr) - 1))

