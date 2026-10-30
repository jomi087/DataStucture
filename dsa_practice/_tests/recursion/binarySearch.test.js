
import test from 'node:test';
import assert from 'node:assert/strict';
import { binarySearchIndex, binarySearchBoolean } from '../../3.recursion/binaraySearch.js';


// ============================================
// 1. FIXED TEST CASES
// ============================================

const fixedCases = [
  { arr: [1, 3, 5, 7, 9], target: 5, expected: true, index: 2 },
  { arr: [1, 3, 5, 7, 9], target: 1, expected: true, index: 0 },
  { arr: [1, 3, 5, 7, 9], target: 9, expected: true, index: 4 },
  { arr: [1, 3, 5, 7, 9], target: 4, expected: false, index: -1 },
  { arr: [], target: 5, expected: false, index: -1 },
  { arr: [5], target: 5, expected: true, index: 0 },
  { arr: [5], target: 3, expected: false, index: -1 },
  { arr: [2, 4], target: 4, expected: true, index: 1 },
  { arr: [2, 4], target: 3, expected: false, index: -1 },
  { arr: [-9, -4, 0, 6, 12], target: -4, expected: true, index: 1 },
  { arr: [-9, -4, 0, 6, 12], target: -5, expected: false, index: -1 },
];


test('Binary Search: fixed test cases', async (t) => {
  for (const [i, c] of fixedCases.entries()) {
    await t.test(`Case ${i + 1}: Boolean search`, () => {
      const actual = binarySearchBoolean(c.arr, c.target);

      console.log(
        `Boolean | Array: ${JSON.stringify(c.arr)} | Target: ${c.target} | Expected: ${c.expected} | Actual: ${actual}`
      );

      assert.equal(actual, c.expected);
    });

    await t.test(`Case ${i + 1}: Index search`, () => {
      const actual = binarySearchIndex(c.arr, c.target);

      console.log("____________________________________________________________________________________________")
      console.log(
        `Index | Array: ${JSON.stringify(c.arr)} | Target: ${c.target} | Expected: ${c.index} | Actual: ${actual}`
      );
      console.log("____________________________________________________________________________________________")

      assert.equal(actual, c.index);
    });
  }
});


// ============================================
// 2. RANDOMIZED TEST CASES
// ============================================

// Independent reference implementations
function referenceBoolean(arr, target) {
  return arr.includes(target);
}

function referenceIndex(arr, target) {
  return arr.indexOf(target);
}

// Generate sorted arrays, including possible duplicates
function generateRandomArray() {
  const length = Math.floor(Math.random() * 101);
  const arr = [];

  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 201) - 100);
  }

  return arr.sort((a, b) => a - b);
}

test('Randomized binary search verification', () => {
  const totalCases = 5000;

  for (let i = 0; i < totalCases; i++) {
    const arr = generateRandomArray();

    const target =
      arr.length > 0 && Math.random() < 0.5
        ? arr[Math.floor(Math.random() * arr.length)]
        : Math.floor(Math.random() * 241) - 120;

    const expectedBoolean = referenceBoolean(arr, target);
    const actualBoolean = binarySearchBoolean(arr, target);

    assert.equal(
      actualBoolean,
      expectedBoolean,
      `Boolean search failed: arr=${JSON.stringify(arr)}, target=${target}`
    );

    const actualIndex = binarySearchIndex(arr, target);
    const found = actualIndex !== -1;

    assert.equal(
      found,
      expectedBoolean,
      `Index search failed: arr=${JSON.stringify(arr)}, target=${target}, returnedIndex=${actualIndex}`
    );

    // If an index is returned, it must be valid
    // and point to the target.
    if (found) {
      assert.ok(
        actualIndex >= 0 && actualIndex < arr.length,
        `Invalid index: arr=${JSON.stringify(arr)}, target=${target}, index=${actualIndex}`
      );

      assert.equal(
        arr[actualIndex],
        target,
        `Wrong element: arr=${JSON.stringify(arr)}, target=${target}, index=${actualIndex}`
      );
    }
  }
});
