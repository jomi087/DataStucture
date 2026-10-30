import test from 'node:test';
import assert from 'node:assert/strict';

import {
  mergeSort,
  Ll,
  mergeSortLl,
} from '../../4.sorting/mergeSort.js';

// ---------- Helpers ----------

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

function randomArray() {
  const length = Math.floor(Math.random() * 101);

  return Array.from(
    { length },
    () => Math.floor(Math.random() * 201) - 100
  );
}

function expectedSortedArray(arr) {
  return [...arr].sort((a, b) => a - b);
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

// ---------- Array Merge Sort ----------

test('Array Merge Sort: fixed test cases', async(t) => {
  for (const [index, input] of fixedCases.entries()) {
    await t.test(`Case ${index + 1}: ${JSON.stringify(input)}`, () => {
      const expected = expectedSortedArray(input);
      const actual = mergeSort([...input]);

      console.log('Input:', input);
      console.log('Expected:', expected);
      console.log('Actual:', actual);

      assert.deepStrictEqual(actual, expected);
    });
  }
});

test('Array Merge Sort: randomized test cases', () => {
  for (let i = 0; i < 5000; i++) {
    const input = randomArray();
    const expected = expectedSortedArray(input);
    const actual = mergeSort([...input]);

    assert.deepStrictEqual(
      actual,
      expected,
      `Failed on input: ${JSON.stringify(input)}`
    );
  }
});

// ---------- Linked List Merge Sort ----------

test('Linked List Merge Sort: fixed test cases', async(t) => {
  for (const [index, input] of fixedCases.entries()) {
    await t.test(`Case ${index + 1}: ${JSON.stringify(input)}`, () => {
      const ll = createLinkedList(input);
      const expected = expectedSortedArray(input);

      mergeSortLl(ll);

      const actual = linkedListToArray(ll);

      console.log('Input:', input);
      console.log('Expected:', expected);
      console.log('Actual:', actual);

      assert.deepStrictEqual(actual, expected);
      assert.strictEqual(actual.length, input.length);
      assert.strictEqual(ll.size, input.length);
    });
  }
});

test('Linked List Merge Sort: randomized test cases', () => {
  for (let i = 0; i < 5000; i++) {
    const input = randomArray();
    const ll = createLinkedList(input);
    const expected = expectedSortedArray(input);

    mergeSortLl(ll);

    const actual = linkedListToArray(ll);

    assert.deepStrictEqual(
      actual,
      expected,
      `Failed on input: ${JSON.stringify(input)}`
    );

    assert.strictEqual(actual.length, input.length);
    assert.strictEqual(ll.size, input.length);
  }
});