
import test from 'node:test';
import assert from 'node:assert/strict';

import factorial from '../../Recursion/factorital.js';

// ============================================
// 1. FIXED TEST CASES
// ============================================

const fixedCases = [
  { n: 0, expected: 1 },
  { n: 1, expected: 1 },
  { n: 2, expected: 2 },
  { n: 3, expected: 6 },
  { n: 4, expected: 24 },
  { n: 5, expected: 120 },
  { n: 6, expected: 720 },
  { n: 10, expected: 3628800 },
];

// test('Factorial: fixed test cases', async (t) => {
//   for (const { n, expected } of fixedCases) {
//     await t.test(`factorial(${n}) = ${expected}`, () => {
//       assert.equal(factorial(n), expected);
//     });
//   }
// });


test('Factorial: fixed test cases', async (t) => {
  for (const { n, expected } of fixedCases) {
    await t.test(`factorial(${n})`, () => {
      const actual = factorial(n);

      console.log(
        `Input: n=${n} | Expected: ${expected} | output: ${actual}`
      );

      assert.equal(actual, expected);
    });
  }
});


// ============================================
// 2. RANDOMIZED TEST CASES
// ============================================

// Independent iterative reference implementation
function referenceFactorial(n) {
  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

test('Factorial: randomized test cases', () => {
  for (let i = 0; i < 100; i++) {
    const n = Math.floor(Math.random() * 11); // 0 to 10

    const expected = referenceFactorial(n);
    const actual = factorial(n);

    assert.equal(
      actual,
      expected,
      `Failed for n=${n}: expected ${expected}, received ${actual}`
    );
  }
});
