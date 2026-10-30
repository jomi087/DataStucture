
import test from 'node:test';
import assert from 'node:assert/strict';

import {
    bubbleSort,
    Ll,
    bubbleSortLl
} from '../../4.sorting/bubbleSort.js'

// ============================================
// HELPERS FOR LINKED LIST
// ============================================

function createLinkedList(arr) {
    const ll = new Ll();

    for (const value of arr) {
        ll.insert(value);
    }

    return ll;
}

function linkedListToArray(ll) {
    const result = [];
    let curr = ll.head;

    while (curr) {
        result.push(curr.val);
        curr = curr.next;
    }

    return result;
}

// ============================================
// 1. ARRAY BUBBLE SORT: FIXED TEST CASES
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
];

test('Array Bubble Sort: fixed test cases', async (t) => {
    for (const [i, { arr, expected }] of fixedCases.entries()) {
        await t.test(`Case ${i + 1}`, () => {
            const actual = bubbleSort([...arr]);

            console.log(
                `Input: ${JSON.stringify(arr)} | Expected: ${JSON.stringify(expected)} | Actual: ${JSON.stringify(actual)}`
            );

            assert.deepEqual(actual, expected);
        });
    }
});

// ============================================
// 2. ARRAY BUBBLE SORT: RANDOMIZED TEST CASES
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

test('Array Bubble Sort: randomized test cases', () => {
    for (let i = 0; i < 5000; i++) {
        const arr = generateRandomArray();
        const expected = referenceSort(arr);
        const actual = bubbleSort([...arr]);

        assert.deepEqual(
            actual,
            expected,
            `Array Bubble Sort failed for input=${JSON.stringify(arr)}`
        );
    }
});

// ============================================
// 3. LINKED-LIST BUBBLE SORT: FIXED TEST CASES
// ============================================

test('Linked List Bubble Sort: fixed test cases', async (t) => {
    for (const [i, { arr, expected }] of fixedCases.entries()) {
        await t.test(`Case ${i + 1}`, () => {
            const ll = createLinkedList(arr);

            bubbleSortLl(ll);

            const actual = linkedListToArray(ll);

            console.log(
                `Input: ${JSON.stringify(arr)} | Expected: ${JSON.stringify(expected)} | Actual: ${JSON.stringify(actual)}`
            );

            assert.deepEqual(actual, expected);

            // Check that sorting preserves the list size.
            assert.equal(ll.size, arr.length);
        });
    }
});

// ============================================
// 4. LINKED-LIST BUBBLE SORT: RANDOMIZED TEST CASES
// ============================================

test('Linked List Bubble Sort: randomized test cases', () => {
    for (let i = 0; i < 5000; i++) {
        const arr = generateRandomArray();
        const expected = referenceSort(arr);

        const ll = createLinkedList(arr);
        bubbleSortLl(ll);

        const actual = linkedListToArray(ll);

        assert.deepEqual(
            actual,
            expected,
            `Linked List Bubble Sort failed for input=${JSON.stringify(arr)}`
        );

        assert.equal(
            ll.size,
            arr.length,
            `Linked list size changed for input=${JSON.stringify(arr)}`
        );
    }
});
