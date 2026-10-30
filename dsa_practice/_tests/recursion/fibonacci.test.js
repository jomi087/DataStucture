
import test from 'node:test';
import assert from 'node:assert/strict';

import fibonacci from '../../3.recursion/febonachi.js';

// ============================================
// 1. FIXED TEST CASES
// ============================================

const fixedCases = [
  { n: 0, expected: 0 },
  { n: 1, expected: 1 },
  { n: 2, expected: 1 },
  { n: 3, expected: 2 },
  { n: 4, expected: 3 },
  { n: 5, expected: 5 },
  { n: 6, expected: 8 },
  { n: 7, expected: 13 },
  { n: 10, expected: 55 },
  { n: 15, expected: 610 },
];


test('Fibonacci: fixed test cases', async (t) => {
  for (const { n, expected } of fixedCases) {
    await t.test(`fibonacci(${n})`, () => {
      const actual = fibonacci(n);

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
function referenceFibonacci(n) {
  let a = 0;
  let b = 1;

  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
  }

  return a;
}

test('Fibonacci: randomized test cases', () => {
  for (let i = 0; i < 100; i++) {
    const n = Math.floor(Math.random() * 21); // 0 to 20

    const expected = referenceFibonacci(n);
    const actual = fibonacci(n);

    assert.equal(
      actual,
      expected,
      `Failed for n=${n}: expected ${expected}, received ${actual}`
    );
  }
});
