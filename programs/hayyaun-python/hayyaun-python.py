import string
import sys
import time

import numpy as np

from bubble_sort import bubble_sort
from count_sort import count_sort
from heap_sort import heap_sort
from insertion_sort import insertion_sort
from merge_sort import merge_sort
from quick_sort import quick_sort
from radix_sort import radix_sort


# DEFAULT
def default_sort(arr):

    nparr = np.array(arr)
    return np.sort(nparr)


# MAIN FUNCTION
if __name__ == "__main__":

    algo = sys.argv[1]
    # count = int(sys.argv[2])
    type = sys.argv[3]
    in_file = sys.argv[4]
    out_file = sys.argv[5]

    data = np.load(in_file)

    def save_calc(func):
        arr = data.tolist()
        start_time = time.time()  # start time
        sorted = func(arr)
        print(int((time.time() - start_time) * 1000))  # end time
        np.save(out_file, sorted if algo == "default" else np.array(arr))

    sort_func = None
    if(algo == "default"):
        sort_func = default_sort
    elif(algo == "insertion"):
        sort_func = insertion_sort
    elif(algo == "bubble"):
        sort_func = bubble_sort
    elif(algo == "merge"):
        sort_func = merge_sort
    elif(algo == "quick"):
        def sort_func(arr): return quick_sort(arr, 0, len(arr) - 1)
    elif(algo == "heap"):
        sort_func = heap_sort
    elif(algo == "counting"):
        sort_func = count_sort
    elif(algo == "radix"):
        sort_func = radix_sort

    save_calc(sort_func)
