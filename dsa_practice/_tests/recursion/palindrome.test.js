
import test from 'node:test';
import assert from 'node:assert/strict';

import isPalindrome from '../../Recursion/palindrome.js';

// ============================================
// 1. FIXED TEST CASES
// ============================================

const fixedCases = [
    { str: '', expected: true },
    { str: 'a', expected: true },
    { str: 'aa', expected: true },
    { str: 'ab', expected: false },
    { str: 'madam', expected: true },
    { str: 'racecar', expected: true },
    { str: 'hello', expected: false },
    { str: 'abba', expected: true },
    { str: 'abcba', expected: true },
    { str: 'abca', expected: false },
    { str: '12321', expected: true },
    { str: '12345', expected: false },
];

test('Palindrome: fixed test cases', async (t) => {
    for (const [i, { str, expected }] of fixedCases.entries()) {
        await t.test(`Case ${i + 1}`, () => {
            const actual = isPalindrome(str);

            console.log(
                `String: ${JSON.stringify(str)} | Expected: ${expected} | Actual: ${actual}`
            );

            assert.equal(actual, expected);
        });
    }
});

// ============================================
// 2. RANDOMIZED TEST CASES
// ============================================

function referenceIsPalindrome(str) {
    return str === str.split('').reverse().join('');
}

function generateRandomString() {
    const characters = 'abc123';
    const length = Math.floor(Math.random() * 21);
    let str = '';

    for (let i = 0; i < length; i++) {
        str += characters[Math.floor(Math.random() * characters.length)];
    }

    return str;
}

test('Palindrome: randomized test cases', () => {
    for (let i = 0; i < 5000; i++) {
        const str = generateRandomString();

        const expected = referenceIsPalindrome(str);
        const actual = isPalindrome(str);

        assert.equal(
            actual,
            expected,
            `Failed for str=${JSON.stringify(str)}: expected ${expected}, received ${actual}`
        );
    }
});
