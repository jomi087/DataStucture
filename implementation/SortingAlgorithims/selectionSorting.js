let arr = [6, 16, 2, 8, 4, 6, 5, 4, 1, 3, 7]; //O(n2)  for all cases: best, worst, and average).

for (let i = 0; i < arr.length - 1; i++) {
    let minindex = i;

    // Find the index of the smallest element in the unsorted part
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minindex]) {
            minindex = j;
        }
    }

    // Swap the smallest element with the current position
    if (minindex !== i) {
        [arr[i], arr[minindex]] = [arr[minindex], arr[i]];
    }
}

console.log(arr); // Output: [1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 8]



