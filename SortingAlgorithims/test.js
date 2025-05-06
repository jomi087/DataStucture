let o = 0;

function divide(arr) {
    if (arr.length <= 1) {
        return arr; // Base case: return single-element or empty array
    }
    o++;
    console.log(`length = ${arr.length}`);
    let mid = Math.floor(arr.length / 2);
    console.log(`index ${mid} is the mid of ${o}th array (${arr}) ${arr[mid]}`);

    // Use slice instead of splice to avoid modifying the original array
    let left = divide(arr.slice(0, mid));  // Left half
    let right = divide(arr.slice(mid));   // Right half
}

// Test the function
let array = [6, 4, 7, 2, 5, 1, 8, 3];
divide(array);
