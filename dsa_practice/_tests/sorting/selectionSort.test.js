
import test from 'node:test';
import assert from 'node:assert/strict';

import selectionSort from '../../sorting/selectionSort.js';

// ============================================
// 1. FIXED TEST CASES
// ============================================

const fixedCases = [
    { arr: [], expected: [] },
    { arr: [5], expected: [5] },
    { arr: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
    { arr: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] },
    { arr: [3, 1, 2], expected: [1, 2, 3] },
    { arr: [4, 2, 4, 1, 2], expected: [1, 2, 2, 4, 4] },
    { arr: [-5, 3, -1, 0, 2], expected: [-5, -1, 0, 2, 3] },
    { arr: [7, 7, 7], expected: [7, 7, 7] },
    { arr: [0, -1, -3, 2], expected: [-3, -1, 0, 2] },
];

test('Selection Sort: fixed test cases', async (t) => {
    for (const [i, { arr, expected }] of fixedCases.entries()) {
        await t.test(`Case ${i + 1}`, () => {
            const actual = selectionSort([...arr]);

            console.log(
                `Input: ${JSON.stringify(arr)} | Expected: ${JSON.stringify(expected)} | Actual: ${JSON.stringify(actual)}`
            );

            assert.deepEqual(actual, expected);
        });
    }
});

// ============================================
// 2. RANDOMIZED TEST CASES
// ============================================

function referenceSort(arr) {
    return [...arr].sort((a, b) => a - b);
}

function generateRandomArray() {
    const length = Math.floor(Math.random() * 101);
    const arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 201) - 100);
    }

    return arr;
}

test('Selection Sort: randomized test cases', () => {
    for (let i = 0; i < 5000; i++) {
        const arr = generateRandomArray();
        const expected = referenceSort(arr);
        const actual = selectionSort([...arr]);

        assert.deepEqual(
            actual,
            expected,
            `Failed for input=${JSON.stringify(arr)}`
        );
    }
});
