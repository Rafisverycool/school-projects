const fs = require("fs");
const text = fs.readFileSync("input.txt", "utf-8");
const numbers = text.trim().split(/\s+/).map(Number);
console.log(numbers.length);

// Calculates the median-of-three
function calculatePivot(arr, low, high) {
    const mid = (low + high) >> 1;

    if (arr[low] > arr[mid])  [arr[low], arr[mid]]  = [arr[mid], arr[low]];
    if (arr[low] > arr[high]) [arr[low], arr[high]] = [arr[high], arr[low]];
    if (arr[mid] > arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]];

    return mid;
}

function partition(arr, low, high) {
    const pivotIndex = calculatePivot(arr, low, high);
    [arr[pivotIndex], arr[high]] = [arr[high], arr[pivotIndex]];
    const pivot = arr[high];

    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// sorting 
function quickSort(arr, low, high) {
    while (low < high) {
        const pi = partition(arr, low, high);

        if (pi - low < high - pi) {
            quickSort(arr, low, pi - 1);
            low = pi + 1;
        } else {
            quickSort(arr, pi + 1, high);
            high = pi - 1;
        }
    }
}

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// bucket sort splits into range buckets, quicksort completes the buckets.
function hybridSort(arr) {
    const n = arr.length;
    if (n <= 1) return arr;

    let min = arr[0], max = arr[0];
    for (let i = 1; i < n; i++) {
        const v = arr[i];
        if (v < min) min = v;
        else if (v > max) max = v;
    }

    // if every number is the same why even bother calculating???
    if (min === max) return arr;

    const numBuckets = Math.max(16, Math.floor(Math.sqrt(n)));
    const range = (max - min) / numBuckets || 1;

    const buckets = Array.from({ length: numBuckets }, () => []);

    for (let i = 0; i < n; i++) {
        const num = arr[i];
        let idx = ((num - min) / range) | 0;
        if (idx >= numBuckets) idx = numBuckets - 1;
        buckets[idx].push(num);
    }

    const result = new Array(n);
    let k = 0;

    for (let i = 0; i < numBuckets; i++) {
        const bucket = buckets[i];
        const len = bucket.length;

        if (len > 1) {
            if (len < 32) insertionSort(bucket);
            else quickSort(bucket, 0, len - 1);
        }

        for (let j = 0; j < len; j++) {
            result[k++] = bucket[j];
        }
    }

    return result;
}

const sorted = hybridSort(numbers);
console.log(sorted);