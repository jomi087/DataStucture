
import test from 'node:test';
import assert from 'node:assert/strict';

import isSorted from '../../Recursion/sortedArray.js';

// ============================================
// 1. FIXED TEST CASES
// ============================================

const fixedCases = [
    { arr: [], expected: true },
    { arr: [5], expected: true },
    { arr: [1, 2, 3, 4, 5], expected: true },
    { arr: [1, 1, 2, 3, 3], expected: true },
    { arr: [-5, -3, -1, 0, 4], expected: true },
    { arr: [1, 3, 2, 4, 5], expected: false },
    { arr: [5, 4, 3, 2, 1], expected: false },
    { arr: [1, 2, 3, 2, 5], expected: false },
    { arr: [2, 1], expected: false },
    { arr: [1, 2, 3, 0], expected: false },
];

test('Sorted Array: fixed test cases', async (t) => {
    for (const [i, { arr, expected }] of fixedCases.entries()) {
        await t.test(`Case ${i + 1}`, () => {
            const actual = isSorted(arr);

            console.log(
                `Array: ${JSON.stringify(arr)} | Expected: ${expected} | Actual: ${actual}`
            );

            assert.equal(actual, expected);
        });
    }
});

// ============================================
// 2. RANDOMIZED TEST CASES
// ============================================

function referenceIsSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }

    return true;
}

function generateRandomArray() {
    const length = Math.floor(Math.random() * 101);
    const arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 201) - 100);
    }

    return arr;
}

test('Sorted Array: randomized test cases', () => {
    for (let i = 0; i < 5000; i++) {
        const arr = generateRandomArray();

        const expected = referenceIsSorted(arr);
        const actual = isSorted(arr);

        assert.equal(
            actual,
            expected,
            `Failed for arr=${JSON.stringify(arr)}: expected ${expected}, received ${actual}`
        );
    }
});
