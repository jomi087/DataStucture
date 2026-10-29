import test from 'node:test';
import assert from 'node:assert/strict';

import { quickSort } from '../../sorting/quickSort.js';

// ---------- Helpers ----------

function expectedSortedArray(arr) {
    return [...arr].sort((a, b) => a - b);
}

function randomArray() {
    const length = Math.floor(Math.random() * 101);

    return Array.from(
        { length },
        () => Math.floor(Math.random() * 201) - 100
    );
}

// ---------- Fixed Test Cases ----------

const fixedCases = [
    [],
    [5],
    [1, 2, 3, 4, 5],
    [5, 4, 3, 2, 1],
    [3, 1, 2],
    [4, 2, 4, 1, 2],
    [-5, 3, -1, 0, 2],
    [7, 7, 7],
    [10, -10],
    [8, 3, 6, 2, 7, 1, 5, 4],
];

// ---------- Quick Sort: Fixed Tests ----------

test('Quick Sort: fixed test cases', async (t) => {
    for (const [index, input] of fixedCases.entries()) {
        await t.test(`Case ${ index + 1 } `, () => {
            const expected = expectedSortedArray(input);
            const actual = quickSort([...input]);

            console.log('Input:', input);
            console.log('Expected:', expected);
            console.log('Actual:', actual);

            assert.deepStrictEqual(actual, expected);
        });
    }
});

// ---------- Quick Sort: Randomized Tests ----------

test('Quick Sort: randomized test cases', () => {
    for (let i = 0; i < 5000; i++) {
        const input = randomArray();
        const expected = expectedSortedArray(input);
        const actual = quickSort([...input]);

        assert.deepStrictEqual(
            actual,
            expected,
            `Failed on input: ${ JSON.stringify(input) } `
        );
    }
});