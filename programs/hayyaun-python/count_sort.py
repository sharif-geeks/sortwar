# COUNTING_SORT
def count_sort(arr):
    maxVal = max(arr)
    m = maxVal + 1
    count = [0] * m

    for a in arr:
        count[a] += 1

    i = 0
    for a in range(m):
        for c in range(count[a]):
            arr[i] = a
            i += 1

    return arr
