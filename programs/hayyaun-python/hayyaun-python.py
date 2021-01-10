import sys
import string
import numpy as np
import time


# DEFAULT
def defaultSort(arr):

    nparr = np.array(arr)
    return np.sort(nparr)


# INSERTION_SORT
def insertionSort(arr):

    # Traverse through 1 to len(arr)
    for i in range(1, len(arr)):

        key = arr[i]

        # Move elements of arr[0..i-1], that are
        # greater than key, to one position ahead
        # of their current position
        j = i-1
        while j >= 0 and key < arr[j]:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key


# BUBBLE_SORT
def bubbleSort(arr):
    n = len(arr)

    # Traverse through all array elements
    for i in range(n-1):
        # range(n) also work but outer loop will repeat one time more than needed.

        # Last i elements are already in place
        for j in range(0, n-i-1):

            # traverse the array from 0 to n-i-1
            # Swap if the element found is greater
            # than the next element
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]


# MERGE_SORT
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


# QUICK_SORT
def partition(arr, low, high):

    i = (low-1)         # index of smaller element
    pivot = arr[high]     # pivot

    for j in range(low, high):

        # If current element is smaller than the pivot
        if arr[j] < pivot:

            # increment index of smaller element
            i = i+1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i+1], arr[high] = arr[high], arr[i+1]
    return (i+1)


def quickSort(arr, low, high):

    if low < high:

        # pi is partitioning index, arr[p] is now
        # at right place
        pi = partition(arr, low, high)

        # Separately sort elements before
        # partition and after partition
        quickSort(arr, low, pi-1)
        quickSort(arr, pi+1, high)


# HEAP_SORT
def heapify(arr, n, i):

    largest = i  # Initialize largest as root
    l = 2 * i + 1     # left = 2*i + 1
    r = 2 * i + 2     # right = 2*i + 2

    # See if left child of root exists and is
    # greater than root
    if l < n and arr[largest] < arr[l]:
        largest = l

    # See if right child of root exists and is
    # greater than root
    if r < n and arr[largest] < arr[r]:
        largest = r

    # Change root, if needed
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # swap

        # Heapify the root.
        heapify(arr, n, largest)


def heapSort(arr):

    n = len(arr)

    # Build a maxheap.
    for i in range(n//2 - 1, -1, -1):
        heapify(arr, n, i)

    # One by one extract elements
    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]  # swap
        heapify(arr, i, 0)


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

    saveAndCalcTime(sortFunction)
