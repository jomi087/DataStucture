
import test from 'node:test';
import assert from 'node:assert/strict';

import sum from '../../recursion/sum.js';

// ============================================
// 1. FIXED TEST CASES
// ============================================

const fixedCases = [
    { n: 0, expected: 0 },
    { n: 1, expected: 1 },
    { n: 2, expected: 3 },
    { n: 3, expected: 6 },
    { n: 4, expected: 10 },
    { n: 5, expected: 15 },
    { n: 10, expected: 55 },
    { n: 100, expected: 5050 },
];

test('Sum: fixed test cases', async (t) => {
    for (const { n, expected } of fixedCases) {
        await t.test(`sum(${n})`, () => {
            const actual = sum(n);

            console.log(
                `Input: n=${n} | Expected: ${expected} | Actual: ${actual}`
            );

            assert.equal(actual, expected);
        });
    }
});

// ============================================
// 2. RANDOMIZED TEST CASES
// ============================================

function referenceSum(n) {
    return (n * (n + 1)) / 2;
}

test('Sum: randomized test cases', () => {
    for (let i = 0; i < 100; i++) {
        const n = Math.floor(Math.random() * 1001);

        const expected = referenceSum(n);
        const actual = sum(n);

        assert.equal(
            actual,
            expected,
            `Failed for n=${n}: expected ${expected}, received ${actual}`
        );
    }
});
