
const assert = require("node:assert/strict");
const { SL } = require("../../1.linked_list/singleLinkList.js");

// =====================================================
// TEST UTILITIES
// =====================================================

function runTest(name, test) {
  try {
    test();
    console.log(`✅ PASS: ${name}`);
  } catch (error) {
    console.error(`❌ FAIL: ${name}`);
    console.error(`   ${error.message}`);
  }
}

function makeList(values) {
  const list = new SL();
  for (const value of values) {
    list.insertAtTail(value);
  }
  return list;
}

// Detect accidental cycles instead of hanging forever.
function getValues(list) {
  const result = [];
  const visited = new Set();
  let curr = list.head;

  while (curr) {
    if (visited.has(curr)) {
      throw new Error("Unexpected cycle in linked list");
    }
    visited.add(curr);
    result.push(curr.value);
    curr = curr.next;
  }

  return result;
}

function assertValues(list, expected) {
  assert.deepStrictEqual(getValues(list), expected);
}

function createCycle(list, entryIndex) {
  if (!list.head) return;

  let entry = list.head;
  for (let i = 0; i < entryIndex; i++) {
    entry = entry.next;
  }

  let tail = list.head;
  while (tail.next) {
    tail = tail.next;
  }

  tail.next = entry;
}

// =====================================================
// A. CONSTRUCTION AND BASIC OPERATIONS
// =====================================================

runTest("Empty list", () => {
  const list = new SL();
  assert.equal(list.head, null);
  assert.deepStrictEqual(getValues(list), []);
});

runTest("Insert at tail", () => {
  const list = makeList([10, 20, 30]);
  assertValues(list, [10, 20, 30]);
});

runTest("Insert at head", () => {
  const list = makeList([20, 30]);
  list.insertAtHead(10);
  assertValues(list, [10, 20, 30]);
});

runTest("Insert duplicate values", () => {
  const list = makeList([5, 5, 5]);
  assertValues(list, [5, 5, 5]);
});

runTest("Find length from head", () => {
  const list = makeList([10, 20, 30]);
  assert.equal(list.findLength(list.head), 3);
});

runTest("Find length from null", () => {
  const list = new SL();
  assert.equal(list.findLength(null), 0);
});

runTest("Search existing and missing values", () => {
  const list = makeList([10, 20, 30]);
  assert.equal(list.search(20), true);
  assert.equal(list.search(99), false);
});

runTest("Search in empty list", () => {
  const list = new SL();
  assert.equal(list.search(10), null);
});

runTest("Delete head from empty list", () => {
  const list = new SL();
  assert.equal(list.deleteAtHead(), null);
});

runTest("Delete head from single-node list", () => {
  const list = makeList([10]);
  list.deleteAtHead();
  assertValues(list, []);
});

runTest("Delete tail from empty list", () => {
  const list = new SL();
  assert.equal(list.deleteAtTail(), null);
});

runTest("Delete tail from single-node list", () => {
  const list = makeList([10]);
  list.deleteAtTail();
  assertValues(list, []);
});

runTest("Delete tail from multiple nodes", () => {
  const list = makeList([10, 20, 30]);
  list.deleteAtTail();
  assertValues(list, [10, 20]);
});

// =====================================================
// B. INSERTION AND DELETION BY POSITION
// Positions are ZERO-BASED in your current implementation.
// =====================================================

runTest("Insert at position zero", () => {
  const list = makeList([20, 30]);
  list.insertAtPosition(10, 0);
  assertValues(list, [10, 20, 30]);
});

runTest("Insert in the middle", () => {
  const list = makeList([10, 30]);
  list.insertAtPosition(20, 1);
  assertValues(list, [10, 20, 30]);
});

runTest("Insert at the end position", () => {
  const list = makeList([10, 20, 30]);
  list.insertAtPosition(40, 3);
  assertValues(list, [10, 20, 30, 40]);
});

runTest("Insert into an empty list at zero", () => {
  const list = new SL();
  list.insertAtPosition(10, 0);
  assertValues(list, [10]);
});

runTest("Reject insertion beyond the end", () => {
  const list = makeList([10, 20]);
  assert.throws(() => list.insertAtPosition(30, 3));
});

runTest("Reject negative insertion position", () => {
  const list = makeList([10, 20]);
  assert.throws(() => list.insertAtPosition(30, -1));
});

runTest("Delete position zero", () => {
  const list = makeList([10, 20, 30]);
  list.deleteAtPosition(0);
  assertValues(list, [20, 30]);
});

runTest("Delete middle position", () => {
  const list = makeList([10, 20, 30]);
  list.deleteAtPosition(1);
  assertValues(list, [10, 30]);
});

runTest("Delete last position", () => {
  const list = makeList([10, 20, 30]);
  list.deleteAtPosition(2);
  assertValues(list, [10, 20]);
});

runTest("Reject deletion at list length", () => {
  const list = makeList([10, 20, 30]);
  assert.throws(() => list.deleteAtPosition(3));
});

runTest("Reject negative deletion position", () => {
  const list = makeList([10, 20]);
  assert.throws(() => list.deleteAtPosition(-1));
});

// =====================================================
// C. REVERSAL AND MIDDLE NODE
// =====================================================

runTest("Reverse empty list", () => {
  const list = new SL();
  list.reverse();
  assertValues(list, []);
});

runTest("Reverse single-node list", () => {
  const list = makeList([10]);
  list.reverse();
  assertValues(list, [10]);
});

runTest("Reverse multiple nodes", () => {
  const list = makeList([1, 2, 3, 4]);
  list.reverse();
  assertValues(list, [4, 3, 2, 1]);
});

runTest("Middle of odd-length list", () => {
  const list = makeList([1, 2, 3, 4, 5]);
  assert.equal(list.findMiddle().value, 3);
});

runTest("Middle of even-length list", () => {
  const list = makeList([1, 2, 3, 4]);
  assert.equal(list.findMiddle().value, 3);
});

runTest("Middle of empty list", () => {
  const list = new SL();
  assert.equal(list.findMiddle(), null);
});

// =====================================================
// D. PALINDROME
// Expected contract: empty list returns true.
// Also check that the original list is preserved.
// =====================================================

runTest("Palindrome: empty list", () => {
  const list = new SL();
  assert.equal(list.isPalindrome(), true);
});

runTest("Palindrome: single node", () => {
  const list = makeList([7]);
  assert.equal(list.isPalindrome(), true);
});

runTest("Palindrome: odd length", () => {
  const list = makeList([1, 2, 3, 2, 1]);
  assert.equal(list.isPalindrome(), true);
});

runTest("Palindrome: even length", () => {
  const list = makeList([1, 2, 2, 1]);
  assert.equal(list.isPalindrome(), true);
});

runTest("Not a palindrome: odd length", () => {
  const list = makeList([1, 2, 3]);
  assert.equal(list.isPalindrome(), false);
});

runTest("Not a palindrome: even length", () => {
  const list = makeList([1, 2, 3, 4]);
  assert.equal(list.isPalindrome(), false);
});

runTest("Palindrome check preserves original links", () => {
  const list = makeList([1, 2, 3, 2, 1]);
  const before = getValues(list);

  list.isPalindrome();

  assertValues(list, before);
});

// =====================================================
// E. CYCLE DETECTION AND REMOVAL
// =====================================================

runTest("Detect cycle in empty list", () => {
  const list = new SL();
  assert.ok(!list.detectCycle());
});

runTest("Detect no cycle", () => {
  const list = makeList([1, 2, 3, 4]);
  assert.equal(list.detectCycle(), false);
});

runTest("Detect cycle back to head", () => {
  const list = makeList([1, 2, 3]);
  createCycle(list, 0);
  assert.equal(list.detectCycle(), true);
});

runTest("Detect cycle starting in the middle", () => {
  const list = makeList([1, 2, 3, 4, 5]);
  createCycle(list, 2);
  assert.equal(list.detectCycle(), true);
});

runTest("Detect self-loop", () => {
  const list = makeList([1]);
  list.head.next = list.head;
  assert.equal(list.detectCycle(), true);
});

runTest("Remove cycle starting at head", () => {
  const list = makeList([1, 2, 3, 4]);
  createCycle(list, 0);

  list.removeCycle();

  assert.equal(list.detectCycle(), false);
  assertValues(list, [1, 2, 3, 4]);
});

runTest("Remove cycle starting in the middle", () => {
  const list = makeList([1, 2, 3, 4, 5]);
  createCycle(list, 2);

  list.removeCycle();

  assert.equal(list.detectCycle(), false);
  assertValues(list, [1, 2, 3, 4, 5]);
});

runTest("Remove self-loop", () => {
  const list = makeList([1]);
  list.head.next = list.head;

  list.removeCycle();

  assert.equal(list.detectCycle(), false);
  assertValues(list, [1]);
});

// =====================================================
// F. NTH NODE — BOTH ARE ONE-BASED
// =====================================================

runTest("Get first node", () => {
  const list = makeList([10, 20, 30]);
  assert.equal(list.getNthNode(1).value, 10);
});

runTest("Get last node", () => {
  const list = makeList([10, 20, 30]);
  assert.equal(list.getNthNode(3).value, 30);
});

runTest("Reject Nth node beyond list length", () => {
  const list = makeList([10, 20, 30]);
  assert.throws(() => list.getNthNode(4));
});

runTest("Reject Nth node at zero", () => {
  const list = makeList([10, 20, 30]);
  assert.throws(() => list.getNthNode(0));
});

runTest("Nth node from end: last node", () => {
  const list = makeList([1, 2, 3, 4, 5, 6]);
  assert.equal(list.getNthNodeFromEnd(1).value, 6);
});

runTest("Nth node from end: second-last node", () => {
  const list = makeList([1, 2, 3, 4, 5, 6]);
  assert.equal(list.getNthNodeFromEnd(2).value, 5);
});

runTest("Nth node from end: first node", () => {
  const list = makeList([1, 2, 3, 4, 5, 6]);
  assert.equal(list.getNthNodeFromEnd(6).value, 1);
});

runTest("Reject Nth node from end beyond length", () => {
  const list = makeList([1, 2, 3]);
  assert.throws(() => list.getNthNodeFromEnd(4));
});

runTest("Reject Nth node from end at zero", () => {
  const list = makeList([1, 2, 3]);
  assert.throws(() => list.getNthNodeFromEnd(0));
});

runTest("Nth node from end on empty list", () => {
  const list = new SL();
  assert.throws(() => list.getNthNodeFromEnd(1));
});

// =====================================================
// G. DUPLICATES
// =====================================================

runTest("Remove duplicates from empty list", () => {
  const list = new SL();
  list.removeDuplicates();
  assertValues(list, []);
});

runTest("Remove adjacent duplicates", () => {
  const list = makeList([1, 1, 2, 2, 3, 3]);
  list.removeDuplicates();
  assertValues(list, [1, 2, 3]);
});

runTest("Remove non-adjacent duplicates", () => {
  const list = makeList([1, 2, 1, 3, 2]);
  list.removeDuplicates();
  assertValues(list, [1, 2, 3]);
});

runTest("Preserve list with no duplicates", () => {
  const list = makeList([1, 2, 3]);
  list.removeDuplicates();
  assertValues(list, [1, 2, 3]);
});

// =====================================================
// H. MERGE SORTED LISTS
// =====================================================

runTest("Merge two sorted lists", () => {
  const a = makeList([1, 3, 5]);
  const b = makeList([2, 4, 6]);

  const merged = new SL().mergeSortedLists(a.head, b.head);
  const result = [];
  let curr = merged;

  while (curr) {
    result.push(curr.value);
    curr = curr.next;
  }

  assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6]);
});

runTest("Merge with one empty list", () => {
  const b = makeList([1, 2, 3]);
  const merged = new SL().mergeSortedLists(null, b.head);

  const result = [];
  let curr = merged;
  while (curr) {
    result.push(curr.value);
    curr = curr.next;
  }

  assert.deepStrictEqual(result, [1, 2, 3]);
});

runTest("Merge two empty lists", () => {
  assert.equal(new SL().mergeSortedLists(null, null), null);
});

runTest("Merge lists containing equal values", () => {
  const a = makeList([1, 2, 2]);
  const b = makeList([2, 2, 3]);

  const merged = new SL().mergeSortedLists(a.head, b.head);
  const result = [];
  let curr = merged;

  while (curr) {
    result.push(curr.value);
    curr = curr.next;
  }

  assert.deepStrictEqual(result, [1, 2, 2, 2, 2, 3]);
});

// =====================================================
// I. DETERMINISTIC RANDOMIZED TESTS
// Same seed = same test sequence.
// =====================================================

function seededRandom(seed) {
  let state = seed >>> 0;

  return function () {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

runTest("Randomized list operations (500 operations)", () => {
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

      if (reference.length > 0) reference.shift();
    } else if (operation === 3) {
      list.deleteAtTail();

      if (reference.length > 0) reference.pop();
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
      assert.equal(list.search(value), reference.includes(value));
    }

    assertValues(list, reference);
  }
});

// =====================================================
// J. RANDOMIZED NTH-NODE TESTS
// =====================================================

runTest("Randomized Nth-node checks (200 lists)", () => {
  const random = seededRandom(98765);

  for (let trial = 0; trial < 200; trial++) {
    const length = Math.floor(random() * 30);
    const values = Array.from(
      { length },
      () => Math.floor(random() * 101) - 50
    );

    const list = makeList(values);

    for (let pos = 1; pos <= length; pos++) {
      assert.equal(list.getNthNode(pos).value, values[pos - 1]);

      assert.equal(
        list.getNthNodeFromEnd(pos).value,
        values[length - pos]
      );
    }

    assert.throws(() => list.getNthNode(length + 1));
    assert.throws(() => list.getNthNodeFromEnd(length + 1));
  }
});

// =====================================================
// K. RANDOMIZED DUPLICATE REMOVAL
// =====================================================

runTest("Randomized duplicate removal (200 lists)", () => {
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

console.log("\nFinished running all tests.");
