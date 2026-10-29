import test from 'node:test';
import assert from 'node:assert/strict';
import { SL } from '../../1.link_list/singleLinkList.js';

// =====================================================
// TEST UTILITIES
// =====================================================

function makeList(values) {
  const list = new SL();

  for (const value of values) {
    list.insertAtTail(value);
  }

  return list;
}

// Detect cycles so a broken list does not cause an infinite loop.
function getValues(list) {
  const values = [];
  const visited = new Set();
  let curr = list.head;

  while (curr) {
    assert.ok(!visited.has(curr), 'Unexpected cycle in linked list');
    visited.add(curr);
    values.push(curr.value);
    curr = curr.next;
  }

  return values;
}

function assertValues(list, expected) {
  assert.deepStrictEqual(getValues(list), expected);
}

function createCycle(list, entryIndex) {
  if (!list.head) return;

  let entry = list.head;

  for (let i = 0; i < entryIndex; i++) {
    assert.ok(entry, 'Cycle entry index is out of range');
    entry = entry.next;
  }

  assert.ok(entry, 'Cycle entry index is out of range');

  let tail = list.head;

  while (tail.next) {
    tail = tail.next;
  }

  tail.next = entry;
}

function seededRandom(seed) {
  let state = seed >>> 0;

  return function () {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

// =====================================================
// A. CONSTRUCTION AND BASIC OPERATIONS
// =====================================================

test('Empty list', () => {
  const list = new SL();

  assert.equal(list.head, null);
  assert.deepStrictEqual(getValues(list), []);
});

test('Insert at tail', () => {
  const list = makeList([10, 20, 30]);

  assertValues(list, [10, 20, 30]);
});

test('Insert at tail into an empty list', () => {
  const list = new SL();

  list.insertAtTail(10);

  assertValues(list, [10]);
});

test('Insert at head', () => {
  const list = makeList([20, 30]);

  list.insertAtHead(10);

  assertValues(list, [10, 20, 30]);
});

test('Insert at head into an empty list', () => {
  const list = new SL();

  list.insertAtHead(10);

  assertValues(list, [10]);
});

test('Insert duplicate values', () => {
  const list = makeList([5, 5, 5]);

  assertValues(list, [5, 5, 5]);
});

test('Find length from head', () => {
  const list = makeList([10, 20, 30]);

  assert.equal(list.findLength(list.head), 3);
});

test('Find length from a middle node', () => {
  const list = makeList([10, 20, 30, 40]);

  assert.equal(list.findLength(list.head.next), 3);
});

test('Find length from null', () => {
  const list = new SL();

  assert.equal(list.findLength(null), 0);
});

test('Search for an existing value', () => {
  const list = makeList([10, 20, 30]);

  assert.equal(list.search(20), true);
});

test('Search for a missing value', () => {
  const list = makeList([10, 20, 30]);

  assert.equal(list.search(99), false);
});

test('Search in an empty list', () => {
  const list = new SL();

  assert.equal(list.search(10), null);
});

// =====================================================
// B. DELETION AT HEAD AND TAIL
// =====================================================

test('Delete head from an empty list', () => {
  const list = new SL();

  assert.equal(list.deleteAtHead(), null);
  assertValues(list, []);
});

test('Delete head from a single-node list', () => {
  const list = makeList([10]);

  list.deleteAtHead();

  assertValues(list, []);
});

test('Delete head from a multiple-node list', () => {
  const list = makeList([10, 20, 30]);

  list.deleteAtHead();

  assertValues(list, [20, 30]);
});

test('Delete tail from an empty list', () => {
  const list = new SL();

  assert.equal(list.deleteAtTail(), null);
  assertValues(list, []);
});

test('Delete tail from a single-node list', () => {
  const list = makeList([10]);

  list.deleteAtTail();

  assertValues(list, []);
});

test('Delete tail from a multiple-node list', () => {
  const list = makeList([10, 20, 30]);

  list.deleteAtTail();

  assertValues(list, [10, 20]);
});

// =====================================================
// C. INSERTION AND DELETION BY POSITION
// Positions are ZERO-BASED.
// =====================================================

test('Insert at position zero', () => {
  const list = makeList([20, 30]);

  list.insertAtPosition(10, 0);

  assertValues(list, [10, 20, 30]);
});

test('Insert in the middle', () => {
  const list = makeList([10, 30]);

  list.insertAtPosition(20, 1);

  assertValues(list, [10, 20, 30]);
});

test('Insert at the end position', () => {
  const list = makeList([10, 20, 30]);

  list.insertAtPosition(40, 3);

  assertValues(list, [10, 20, 30, 40]);
});

test('Insert into an empty list at position zero', () => {
  const list = new SL();

  list.insertAtPosition(10, 0);

  assertValues(list, [10]);
});

test('Reject insertion beyond the end', () => {
  const list = makeList([10, 20]);

  assert.throws(() => list.insertAtPosition(30, 3));
});

test('Reject insertion at a negative position', () => {
  const list = makeList([10, 20]);

  assert.throws(() => list.insertAtPosition(30, -1));
});

test('Reject insertion beyond an empty list', () => {
  const list = new SL();

  assert.throws(() => list.insertAtPosition(10, 1));
});

test('Delete position zero', () => {
  const list = makeList([10, 20, 30]);

  list.deleteAtPosition(0);

  assertValues(list, [20, 30]);
});

test('Delete middle position', () => {
  const list = makeList([10, 20, 30]);

  list.deleteAtPosition(1);

  assertValues(list, [10, 30]);
});

test('Delete last position', () => {
  const list = makeList([10, 20, 30]);

  list.deleteAtPosition(2);

  assertValues(list, [10, 20]);
});

test('Delete the only node', () => {
  const list = makeList([10]);

  list.deleteAtPosition(0);

  assertValues(list, []);
});

test('Reject deletion at list length', () => {
  const list = makeList([10, 20, 30]);

  assert.throws(() => list.deleteAtPosition(3));
});

test('Reject deletion at a negative position', () => {
  const list = makeList([10, 20]);

  assert.throws(() => list.deleteAtPosition(-1));
});

test('Deleting from an empty list returns null', () => {
  const list = new SL();

  assert.equal(list.deleteAtPosition(0), null);
});

// =====================================================
// D. REVERSAL AND MIDDLE NODE
// =====================================================

test('Reverse an empty list', () => {
  const list = new SL();

  list.reverse();

  assertValues(list, []);
});

test('Reverse a single-node list', () => {
  const list = makeList([10]);

  list.reverse();

  assertValues(list, [10]);
});

test('Reverse a multiple-node list', () => {
  const list = makeList([1, 2, 3, 4]);

  list.reverse();

  assertValues(list, [4, 3, 2, 1]);
});

test('Reverse the same list twice', () => {
  const list = makeList([1, 2, 3, 4]);

  list.reverse();
  list.reverse();

  assertValues(list, [1, 2, 3, 4]);
});

test('Middle of an odd-length list', () => {
  const list = makeList([1, 2, 3, 4, 5]);

  assert.equal(list.findMiddle().value, 3);
});

test('Middle of an even-length list is the second middle', () => {
  const list = makeList([1, 2, 3, 4]);

  assert.equal(list.findMiddle().value, 3);
});

test('Middle of a single-node list', () => {
  const list = makeList([10]);

  assert.equal(list.findMiddle().value, 10);
});

test('Middle of an empty list', () => {
  const list = new SL();

  assert.equal(list.findMiddle(), null);
});

// =====================================================
// E. PALINDROME
// Contract tested here:
// - Empty list returns true.
// - The original list remains unchanged.
// =====================================================

test('Palindrome: empty list', () => {
  const list = new SL();

  assert.equal(list.isPalindrome(), true);
});

test('Palindrome: single node', () => {
  const list = makeList([7]);

  assert.equal(list.isPalindrome(), true);
});

test('Palindrome: two equal nodes', () => {
  const list = makeList([7, 7]);

  assert.equal(list.isPalindrome(), true);
});

test('Palindrome: odd length', () => {
  const list = makeList([1, 2, 3, 2, 1]);

  assert.equal(list.isPalindrome(), true);
});

test('Palindrome: even length', () => {
  const list = makeList([1, 2, 2, 1]);

  assert.equal(list.isPalindrome(), true);
});

test('Not a palindrome: odd length', () => {
  const list = makeList([1, 2, 3]);

  assert.equal(list.isPalindrome(), false);
});

test('Not a palindrome: even length', () => {
  const list = makeList([1, 2, 3, 4]);

  assert.equal(list.isPalindrome(), false);
});

test('Palindrome check preserves the original list', () => {
  const list = makeList([1, 2, 3, 2, 1]);
  const before = getValues(list);

  list.isPalindrome();

  assertValues(list, before);
});

test('Non-palindrome check preserves the original list', () => {
  const list = makeList([1, 2, 3, 4]);
  const before = getValues(list);

  list.isPalindrome();

  assertValues(list, before);
});

// =====================================================
// F. CYCLE DETECTION AND REMOVAL
// =====================================================

test('Detect cycle in an empty list', () => {
  const list = new SL();

  assert.ok(!list.detectCycle());
});

test('Detect no cycle', () => {
  const list = makeList([1, 2, 3, 4]);

  assert.equal(list.detectCycle(), false);
});

test('Detect a cycle back to the head', () => {
  const list = makeList([1, 2, 3]);

  createCycle(list, 0);

  assert.equal(list.detectCycle(), true);
});

test('Detect a cycle starting in the middle', () => {
  const list = makeList([1, 2, 3, 4, 5]);

  createCycle(list, 2);

  assert.equal(list.detectCycle(), true);
});

test('Detect a self-loop', () => {
  const list = makeList([1]);

  list.head.next = list.head;

  assert.equal(list.detectCycle(), true);
});

test('Remove a cycle starting at the head', () => {
  const list = makeList([1, 2, 3, 4]);

  createCycle(list, 0);
  list.removeCycle();

  assert.equal(list.detectCycle(), false);
  assertValues(list, [1, 2, 3, 4]);
});

test('Remove a cycle starting in the middle', () => {
  const list = makeList([1, 2, 3, 4, 5]);

  createCycle(list, 2);
  list.removeCycle();

  assert.equal(list.detectCycle(), false);
  assertValues(list, [1, 2, 3, 4, 5]);
});

test('Remove a self-loop', () => {
  const list = makeList([1]);

  list.head.next = list.head;
  list.removeCycle();

  assert.equal(list.detectCycle(), false);
  assertValues(list, [1]);
});

test('Remove cycle when no cycle exists', () => {
  const list = makeList([1, 2, 3]);

  assert.equal(list.removeCycle(), 'no cycle found');
  assertValues(list, [1, 2, 3]);
});

// =====================================================
// G. NTH NODE
// Both methods use ONE-BASED positions.
// =====================================================

test('Get the first node', () => {
  const list = makeList([10, 20, 30]);

  assert.equal(list.getNthNode(1).value, 10);
});

test('Get the last node', () => {
  const list = makeList([10, 20, 30]);

  assert.equal(list.getNthNode(3).value, 30);
});

test('Reject Nth node beyond list length', () => {
  const list = makeList([10, 20, 30]);

  assert.throws(() => list.getNthNode(4));
});

test('Reject Nth node at position zero', () => {
  const list = makeList([10, 20, 30]);

  assert.throws(() => list.getNthNode(0));
});

test('Reject Nth node on an empty list', () => {
  const list = new SL();

  assert.throws(() => list.getNthNode(1));
});

test('Nth node from end: last node', () => {
  const list = makeList([1, 2, 3, 4, 5, 6]);

  assert.equal(list.getNthNodeFromEnd(1).value, 6);
});

test('Nth node from end: second-last node', () => {
  const list = makeList([1, 2, 3, 4, 5, 6]);

  assert.equal(list.getNthNodeFromEnd(2).value, 5);
});

test('Nth node from end: first node', () => {
  const list = makeList([1, 2, 3, 4, 5, 6]);

  assert.equal(list.getNthNodeFromEnd(6).value, 1);
});

test('Reject Nth node from end beyond length', () => {
  const list = makeList([1, 2, 3]);

  assert.throws(() => list.getNthNodeFromEnd(4));
});

test('Reject Nth node from end at position zero', () => {
  const list = makeList([1, 2, 3]);

  assert.throws(() => list.getNthNodeFromEnd(0));
});

test('Reject Nth node from end on an empty list', () => {
  const list = new SL();

  assert.throws(() => list.getNthNodeFromEnd(1));
});

// =====================================================
// H. DUPLICATE REMOVAL
// =====================================================

test('Remove duplicates from an empty list', () => {
  const list = new SL();

  list.removeDuplicates();

  assertValues(list, []);
});

test('Remove adjacent duplicates', () => {
  const list = makeList([1, 1, 2, 2, 3, 3]);

  list.removeDuplicates();

  assertValues(list, [1, 2, 3]);
});

test('Remove non-adjacent duplicates', () => {
  const list = makeList([1, 2, 1, 3, 2]);

  list.removeDuplicates();

  assertValues(list, [1, 2, 3]);
});

test('Preserve a list with no duplicates', () => {
  const list = makeList([1, 2, 3]);

  list.removeDuplicates();

  assertValues(list, [1, 2, 3]);
});

test('Remove duplicates when all values are equal', () => {
  const list = makeList([5, 5, 5, 5]);

  list.removeDuplicates();

  assertValues(list, [5]);
});

// =====================================================
// I. MERGE SORTED LISTS
// =====================================================

function getMergedValues(head) {
  const values = [];
  const visited = new Set();
  let curr = head;

  while (curr) {
    assert.ok(!visited.has(curr), 'Unexpected cycle in merged list');
    visited.add(curr);
    values.push(curr.value);
    curr = curr.next;
  }

  return values;
}

test('Merge two sorted lists', () => {
  const a = makeList([1, 3, 5]);
  const b = makeList([2, 4, 6]);

  const merged = new SL().mergeSortedLists(a.head, b.head);

  assert.deepStrictEqual(getMergedValues(merged), [1, 2, 3, 4, 5, 6]);
});

test('Merge with the first list empty', () => {
  const b = makeList([1, 2, 3]);

  const merged = new SL().mergeSortedLists(null, b.head);

  assert.deepStrictEqual(getMergedValues(merged), [1, 2, 3]);
});

test('Merge with the second list empty', () => {
  const a = makeList([1, 2, 3]);

  const merged = new SL().mergeSortedLists(a.head, null);

  assert.deepStrictEqual(getMergedValues(merged), [1, 2, 3]);
});

test('Merge two empty lists', () => {
  const merged = new SL().mergeSortedLists(null, null);

  assert.equal(merged, null);
});

test('Merge lists containing equal values', () => {
  const a = makeList([1, 2, 2]);
  const b = makeList([2, 2, 3]);

  const merged = new SL().mergeSortedLists(a.head, b.head);

  assert.deepStrictEqual(
    getMergedValues(merged),
    [1, 2, 2, 2, 2, 3]
  );
});

test('Merge when all values in the first list are smaller', () => {
  const a = makeList([1, 2, 3]);
  const b = makeList([4, 5, 6]);

  const merged = new SL().mergeSortedLists(a.head, b.head);

  assert.deepStrictEqual(getMergedValues(merged), [1, 2, 3, 4, 5, 6]);
});

// =====================================================
// J. DETERMINISTIC RANDOMIZED LIST OPERATIONS
// =====================================================

test('Randomized list operations: 500 operations', () => {
  const random = seededRandom(123456);
  const list = new SL();
  const reference = [];

  function rand(max) {
    return Math.floor(random() * max);
  }

  for (let iteration = 0; iteration < 500; iteration++) {
    const operation = rand(8);
    const value = rand(21) - 10;

    if (operation === 0) {
      list.insertAtHead(value);
      reference.unshift(value);
    } else if (operation === 1) {
      list.insertAtTail(value);
      reference.push(value);
    } else if (operation === 2) {
      list.deleteAtHead();

      if (reference.length > 0) {
        reference.shift();
      }
    } else if (operation === 3) {
      list.deleteAtTail();

      if (reference.length > 0) {
        reference.pop();
      }
    } else if (operation === 4) {
      const pos = rand(reference.length + 1);

      list.insertAtPosition(value, pos);
      reference.splice(pos, 0, value);
    } else if (operation === 5) {
      if (reference.length > 0) {
        const pos = rand(reference.length);

        list.deleteAtPosition(pos);
        reference.splice(pos, 1);
      }
    } else if (operation === 6) {
      list.reverse();
      reference.reverse();
    } else {
      assert.equal(list.search(value), reference.length === 0
        ? null
        : reference.includes(value));
    }

    assertValues(list, reference);
  }
});

// =====================================================
// K. RANDOMIZED NTH-NODE CHECKS
// =====================================================

test('Randomized Nth-node checks: 200 lists', () => {
  const random = seededRandom(98765);

  for (let trial = 0; trial < 200; trial++) {
    const length = Math.floor(random() * 30);
    const values = Array.from(
      { length },
      () => Math.floor(random() * 101) - 50
    );

    const list = makeList(values);

    for (let pos = 1; pos <= length; pos++) {
      assert.equal(
        list.getNthNode(pos).value,
        values[pos - 1],
        `getNthNode failed: values=${JSON.stringify(values)}, pos=${pos}`
      );

      assert.equal(
        list.getNthNodeFromEnd(pos).value,
        values[length - pos],
        `getNthNodeFromEnd failed: values=${JSON.stringify(values)}, n=${pos}`
      );
    }

    assert.throws(() => list.getNthNode(length + 1));
    assert.throws(() => list.getNthNodeFromEnd(length + 1));
  }
});

// =====================================================
// L. RANDOMIZED DUPLICATE REMOVAL
// =====================================================

test('Randomized duplicate removal: 200 lists', () => {
  const random = seededRandom(24680);

  for (let trial = 0; trial < 200; trial++) {
    const length = Math.floor(random() * 40);
    const values = Array.from(
      { length },
      () => Math.floor(random() * 10)
    );

    const expected = [...new Set(values)];
    const list = makeList(values);

    list.removeDuplicates();

    assertValues(list, expected);
  }
});
