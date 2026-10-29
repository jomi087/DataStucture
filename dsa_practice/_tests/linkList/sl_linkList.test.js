/**
 * Singly Linked List (SL) — contract-first test suite
 *
 * Run:
 * node --test _tests/linkList/sl_linkList.test.js
 *
 * The suite stops at the first failed contract and lists
 * the remaining tests as PENDING.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { SL, Node } from '../../1.link_list/singleLinkList.js';

function valuesFromHead(head, limit = 10000) {
  const values = [];
  const seen = new Set();
  let current = head;

  while (current !== null) {
    assert.ok(
      current && typeof current === 'object',
      'Each link must be a Node-like object or null'
    );

    assert.ok(
      !seen.has(current),
      'Unexpected cycle in linked list'
    );

    seen.add(current);
    values.push(current.value);
    current = current.next;

    assert.ok(
      values.length <= limit,
      `List exceeded safety limit (${limit})`
    );
  }

  return values;
}

function getValues(list) {
  return valuesFromHead(list.head);
}

function assertList(list, expected, context = 'list') {
  assert.deepEqual(
    getValues(list),
    expected,
    `${context}: node values/order`
  );

  assert.equal(
    list.size,
    expected.length,
    `${context}: size must equal reachable node count`
  );

  if (expected.length === 0) {
    assert.equal(
      list.head,
      null,
      `${context}: empty list head must be null`
    );
  }
}

function expectRangeError(run, message = 'Expected RangeError') {
  assert.throws(run, (error) => {
    assert.ok(
      error instanceof RangeError,
      `${message}; received ${error?.constructor?.name}: ${error?.message}`
    );

    return true;
  });
}

function makeList(items = []) {
  const list = new SL();

  for (const value of items) {
    list.insertAtTail(value);
  }

  return list;
}

function snapshotLinks(head) {
  const result = [];
  const seen = new Set();
  let current = head;

  while (current && !seen.has(current)) {
    seen.add(current);
    result.push([current, current.next]);
    current = current.next;
  }

  return result;
}

function assertLinksUnchanged(snapshot) {
  for (const [node, next] of snapshot) {
    assert.equal(
      node.next,
      next,
      'Query method must not change next pointers'
    );
  }
}

const cases = [
  [
    'Node constructor stores value and initializes next to null',
    () => {
      const node = new Node('x');

      assert.equal(node.value, 'x');
      assert.equal(node.next, null);
    },
  ],

  [
    'SL constructor creates an empty list with correct state',
    () => {
      const list = new SL();

      assert.equal(list.head, null);
      assert.equal(list.size, 0);
      assert.deepEqual(getValues(list), []);
    },
  ],

  [
    'insertAtHead inserts into an empty list and returns undefined',
    () => {
      const list = new SL();

      assert.equal(list.insertAtHead(10), undefined);
      assertList(list, [10]);
    },
  ],

  [
    'insertAtHead prepends and preserves existing order',
    () => {
      const list = makeList([2, 3]);

      assert.equal(list.insertAtHead(1), undefined);
      assertList(list, [1, 2, 3]);
    },
  ],

  [
    'insertAtHead accepts falsy values and duplicates',
    () => {
      const list = new SL();

      list.insertAtHead(0);
      list.insertAtHead(false);
      list.insertAtHead('');
      list.insertAtHead(null);
      list.insertAtHead(0);

      assertList(list, [0, null, '', false, 0]);
    },
  ],

  [
    'insertAtTail inserts into an empty list and returns undefined',
    () => {
      const list = new SL();

      assert.equal(list.insertAtTail(10), undefined);
      assertList(list, [10]);
    },
  ],

  [
    'insertAtTail appends and preserves existing order',
    () => {
      const list = makeList([1, 2]);

      assert.equal(list.insertAtTail(3), undefined);
      assertList(list, [1, 2, 3]);
    },
  ],

  [
    'insertAtPosition inserts at position zero',
    () => {
      const list = makeList([2, 3]);

      assert.equal(list.insertAtPosition(1, 0), undefined);
      assertList(list, [1, 2, 3]);
    },
  ],

  [
    'insertAtPosition inserts in the middle',
    () => {
      const list = makeList([1, 3]);

      assert.equal(list.insertAtPosition(2, 1), undefined);
      assertList(list, [1, 2, 3]);
    },
  ],

  [
    'insertAtPosition inserts at size',
    () => {
      const list = makeList([1, 2]);

      assert.equal(list.insertAtPosition(3, 2), undefined);
      assertList(list, [1, 2, 3]);
    },
  ],

  [
    'insertAtPosition inserts into an empty list at zero',
    () => {
      const list = new SL();

      assert.equal(list.insertAtPosition('only', 0), undefined);
      assertList(list, ['only']);
    },
  ],

  [
    'insertAtPosition rejects invalid positions without mutation',
    () => {
      for (const position of [
        -1, 3, 0.5, NaN, '1', null, undefined,
      ]) {
        const list = makeList([10, 20]);

        expectRangeError(
          () => list.insertAtPosition(99, position),
          `insertAtPosition(${String(position)})`
        );

        assertList(
          list,
          [10, 20],
          `after invalid insert position ${String(position)}`
        );
      }
    },
  ],

  [
    'deleteAtHead returns the removed value and updates size',
    () => {
      const list = makeList([1, 2, 3]);

      assert.equal(list.deleteAtHead(), 1);
      assertList(list, [2, 3]);
    },
  ],

  [
    'deleteAtHead removes the only node',
    () => {
      const list = makeList([7]);

      assert.equal(list.deleteAtHead(), 7);
      assertList(list, []);
    },
  ],

  [
    'deleteAtHead on an empty list returns null',
    () => {
      const list = new SL();

      assert.equal(list.deleteAtHead(), null);
      assertList(list, []);
    },
  ],

  [
    'deleteAtTail returns the removed value and updates size',
    () => {
      const list = makeList([1, 2, 3]);

      assert.equal(list.deleteAtTail(), 3);
      assertList(list, [1, 2]);
    },
  ],

  [
    'deleteAtTail removes the only node',
    () => {
      const list = makeList([7]);

      assert.equal(list.deleteAtTail(), 7);
      assertList(list, []);
    },
  ],

  [
    'deleteAtTail on an empty list returns null',
    () => {
      const list = new SL();

      assert.equal(list.deleteAtTail(), null);
      assertList(list, []);
    },
  ],

  [
    'deleteAtPosition deletes the head and returns its value',
    () => {
      const list = makeList([1, 2, 3]);

      assert.equal(list.deleteAtPosition(0), 1);
      assertList(list, [2, 3]);
    },
  ],

  [
    'deleteAtPosition deletes a middle node',
    () => {
      const list = makeList([1, 2, 3]);

      assert.equal(list.deleteAtPosition(1), 2);
      assertList(list, [1, 3]);
    },
  ],

  [
    'deleteAtPosition deletes the last node',
    () => {
      const list = makeList([1, 2, 3]);

      assert.equal(list.deleteAtPosition(2), 3);
      assertList(list, [1, 2]);
    },
  ],

  [
    'deleteAtPosition deletes the only node',
    () => {
      const list = makeList([5]);

      assert.equal(list.deleteAtPosition(0), 5);
      assertList(list, []);
    },
  ],

  [
    'deleteAtPosition rejects invalid positions without mutation',
    () => {
      const empty = new SL();

      expectRangeError(() => empty.deleteAtPosition(0));
      assertList(empty, []);

      for (const position of [
        -1, 3, 1.5, NaN, '1', null, undefined,
      ]) {
        const list = makeList([10, 20, 30]);

        expectRangeError(
          () => list.deleteAtPosition(position),
          `deleteAtPosition(${String(position)})`
        );

        assertList(list, [10, 20, 30]);
      }
    },
  ],
  [
    'findLength counts nodes from a supplied node',
    () => {
      const list = makeList([1, 2, 3, 4]);

      assert.equal(list.findLength(null), 0);
      assert.equal(list.findLength(list.head), 4);
      assert.equal(list.findLength(list.head.next), 3);
      assert.equal(list.findLength(list.head.next.next.next), 1);
      assert.equal(list.size, 4);
    },
  ],

  [
    'findLength with no argument counts the full list',
    () => {
      assert.equal(makeList([1, 2, 3]).findLength(), 3);
      assert.equal(new SL().findLength(), 0);
    },
  ],

  [
    'search returns true for existing values and false for missing values',
    () => {
      const list = makeList([4, 8, 12]);

      assert.equal(list.search(8), true);
      assert.equal(list.search(7), false);
    },
  ],

  [
    'search handles empty lists and falsy values',
    () => {
      assert.equal(new SL().search(1), false);

      const list = makeList([0, false, '', null]);

      assert.equal(list.search(0), true);
      assert.equal(list.search(false), true);
      assert.equal(list.search(''), true);
      assert.equal(list.search(null), true);
      assert.equal(list.search(undefined), false);
    },
  ],

  [
    'traverse logs values in order and returns undefined',
    () => {
      const list = makeList([1, 2, 3]);
      const originalLog = console.log;
      const lines = [];

      try {
        console.log = (...args) => {
          lines.push(args.map(String).join(' '));
        };

        assert.equal(list.traverse(), undefined);
      } finally {
        console.log = originalLog;
      }

      assert.deepEqual(lines, ['1', '2', '3']);
      assertList(list, [1, 2, 3]);
    },
  ],

  [
    'traverse on an empty list logs nothing',
    () => {
      const list = new SL();
      const originalLog = console.log;
      const lines = [];

      try {
        console.log = (...args) => {
          lines.push(args.map(String).join(' '));
        };

        assert.equal(list.traverse(), undefined);
      } finally {
        console.log = originalLog;
      }

      assert.deepEqual(lines, []);
      assertList(list, []);
    },
  ],

  [
    'reverse reverses links in place and preserves size',
    () => {
      const list = makeList([1, 2, 3, 4]);

      assert.equal(list.reverse(), undefined);
      assertList(list, [4, 3, 2, 1]);
    },
  ],

  [
    'reverse handles empty and single-node lists',
    () => {
      const empty = new SL();

      assert.equal(empty.reverse(), undefined);
      assertList(empty, []);

      const one = makeList([9]);
      const originalHead = one.head;

      assert.equal(one.reverse(), undefined);
      assertList(one, [9]);
      assert.equal(one.head, originalHead);
    },
  ],

  [
    'findMiddle returns null for an empty list',
    () => {
      assert.equal(new SL().findMiddle(), null);
    },
  ],

  [
    'findMiddle returns the only node for a single-node list',
    () => {
      const list = makeList([1]);

      assert.equal(list.findMiddle(), list.head);
      assert.equal(list.findMiddle().value, 1);
    },
  ],

  [
    'findMiddle returns the middle node for odd-length lists',
    () => {
      const list = makeList([1, 2, 3, 4, 5]);

      assert.equal(list.findMiddle().value, 3);
    },
  ],

  [
    'findMiddle returns the second middle for even-length lists',
    () => {
      const list = makeList([1, 2, 3, 4]);

      assert.equal(list.findMiddle().value, 3);
    },
  ],

  [
    'isPalindrome returns true for an empty list',
    () => {
      const list = new SL();

      assert.equal(list.isPalindrome(), true);
      assertList(list, []);
    },
  ],

  [
    'isPalindrome returns true for a single node',
    () => {
      const list = makeList([1]);
      const snapshot = snapshotLinks(list.head);

      assert.equal(list.isPalindrome(), true);
      assertLinksUnchanged(snapshot);
      assertList(list, [1]);
    },
  ],

  [
    'isPalindrome handles odd and even palindromes and restores links',
    () => {
      for (const items of [
        [1, 2, 3, 2, 1],
        [1, 2, 2, 1],
        ['a', 'b', 'a'],
      ]) {
        const list = makeList(items);
        const snapshot = snapshotLinks(list.head);
        const originalHead = list.head;

        assert.equal(list.isPalindrome(), true);
        assert.equal(list.head, originalHead);
        assertLinksUnchanged(snapshot);
        assertList(list, items);
      }
    },
  ],

  [
    'isPalindrome handles non-palindromes and restores links',
    () => {
      for (const items of [
        [1, 2],
        [1, 2, 3],
        [1, 2, 3, 1],
      ]) {
        const list = makeList(items);
        const snapshot = snapshotLinks(list.head);
        const originalHead = list.head;

        assert.equal(list.isPalindrome(), false);
        assert.equal(list.head, originalHead);
        assertLinksUnchanged(snapshot);
        assertList(list, items);
      }
    },
  ],

  [
    'detectCycle returns false for empty and acyclic lists',
    () => {
      assert.equal(new SL().detectCycle(), false);
      assert.equal(makeList([1, 2, 3]).detectCycle(), false);
    },
  ],

  [
    'detectCycle returns true when a cycle exists',
    () => {
      const list = makeList([1, 2, 3, 4]);
      let tail = list.head;

      while (tail.next) {
        tail = tail.next;
      }

      tail.next = list.head.next;

      assert.equal(list.detectCycle(), true);
      assert.equal(list.size, 4);
    },
  ],

  [
    'removeCycle returns false when no cycle exists',
    () => {
      const list = makeList([1, 2, 3]);
      const snapshot = snapshotLinks(list.head);

      assert.equal(list.removeCycle(), false);
      assertLinksUnchanged(snapshot);
      assertList(list, [1, 2, 3]);
    },
  ],

  [
    'removeCycle removes a cycle and preserves nodes and size',
    () => {
      const list = makeList([1, 2, 3, 4]);
      let tail = list.head;

      while (tail.next) {
        tail = tail.next;
      }

      tail.next = list.head.next;

      assert.equal(list.detectCycle(), true);
      assert.equal(list.removeCycle(), true);
      assert.equal(list.detectCycle(), false);
      assertList(list, [1, 2, 3, 4]);
    },
  ],

  [
    'getNthNode uses one-based indexing',
    () => {
      const list = makeList([10, 20, 30]);

      assert.equal(list.getNthNode(1), list.head);
      assert.equal(list.getNthNode(2).value, 20);
      assert.equal(list.getNthNode(3).value, 30);
    },
  ],

  [
    'getNthNode rejects invalid positions',
    () => {
      const list = makeList([10, 20, 30]);

      for (const n of [
        0, -1, 4, 1.5, NaN, '1', null, undefined,
      ]) {
        expectRangeError(
          () => list.getNthNode(n),
          `getNthNode(${String(n)})`
        );
      }

      expectRangeError(() => new SL().getNthNode(1));
    },
  ],

  [
    'getNthNodeFromEnd uses one-based indexing from the tail',
    () => {
      const list = makeList([10, 20, 30, 40]);

      assert.equal(list.getNthNodeFromEnd(1).value, 40);
      assert.equal(list.getNthNodeFromEnd(2).value, 30);
      assert.equal(list.getNthNodeFromEnd(4).value, 10);
    },
  ],

  [
    'getNthNodeFromEnd rejects invalid positions',
    () => {
      const list = makeList([10, 20, 30]);

      for (const n of [
        0, -1, 4, 1.5, NaN, '1', null, undefined,
      ]) {
        expectRangeError(
          () => list.getNthNodeFromEnd(n),
          `getNthNodeFromEnd(${String(n)})`
        );
      }

      expectRangeError(() => new SL().getNthNodeFromEnd(1));
    },
  ],

  [
    'removeDuplicates preserves first occurrences and updates size',
    () => {
      const list = makeList([3, 1, 3, 2, 1, 2, 4, 4]);

      assert.equal(list.removeDuplicates(), undefined);
      assertList(list, [3, 1, 2, 4]);
    },
  ],

  [
    'removeDuplicates handles empty, unique and all-equal lists',
    () => {
      const empty = new SL();

      assert.equal(empty.removeDuplicates(), undefined);
      assertList(empty, []);

      const unique = makeList([1, 2, 3]);

      assert.equal(unique.removeDuplicates(), undefined);
      assertList(unique, [1, 2, 3]);

      const same = makeList([7, 7, 7, 7]);

      assert.equal(same.removeDuplicates(), undefined);
      assertList(same, [7]);
    },
  ],

  [
    'removeDuplicates safely handles special string values',
    () => {
      const list = makeList([
        '__proto__',
        'constructor',
        'toString',
        '__proto__',
        'constructor',
      ]);

      assert.equal(list.removeDuplicates(), undefined);
      assertList(list, [
        '__proto__',
        'constructor',
        'toString',
      ]);
    },
  ],
  [
    'mergeSortedLists merges two sorted chains',
    () => {
      const receiver = makeList([99]);
      const left = makeList([1, 3, 5]);
      const right = makeList([2, 4, 6]);
      const receiverHead = receiver.head;
      const receiverSize = receiver.size;

      const mergedHead = receiver.mergeSortedLists(
        left.head,
        right.head
      );

      assert.deepEqual(
        valuesFromHead(mergedHead),
        [1, 2, 3, 4, 5, 6]
      );

      assert.equal(receiver.head, receiverHead);
      assert.equal(receiver.size, receiverSize);
    },
  ],

  [
    'mergeSortedLists handles empty input chains',
    () => {
      const receiver = new SL();
      const list = makeList([1, 2]);

      assert.deepEqual(
        valuesFromHead(receiver.mergeSortedLists(null, list.head)),
        [1, 2]
      );

      assert.deepEqual(
        valuesFromHead(receiver.mergeSortedLists(list.head, null)),
        [1, 2]
      );

      assert.equal(
        receiver.mergeSortedLists(null, null),
        null
      );
    },
  ],

  [
    'mergeSortedLists handles equal values',
    () => {
      const receiver = new SL();
      const left = makeList([1, 2, 2, 5]);
      const right = makeList([1, 2, 4, 5]);

      const merged = receiver.mergeSortedLists(
        left.head,
        right.head
      );

      assert.deepEqual(
        valuesFromHead(merged),
        [1, 1, 2, 2, 2, 4, 5, 5]
      );
    },
  ],

  [
    'deterministic mixed operations preserve values and size',
    () => {
      const list = new SL();
      const model = [];

      const operations = [
        () => {
          list.insertAtHead(2);
          model.unshift(2);
        },
        () => {
          list.insertAtTail(4);
          model.push(4);
        },
        () => {
          list.insertAtPosition(3, 1);
          model.splice(1, 0, 3);
        },
        () => {
          assert.equal(
            list.deleteAtPosition(2),
            model.splice(2, 1)[0]
          );
        },
        () => {
          assert.equal(
            list.deleteAtHead(),
            model.shift()
          );
        },
        () => {
          list.insertAtTail(9);
          model.push(9);
        },
        () => {
          assert.equal(
            list.deleteAtTail(),
            model.pop()
          );
        },
        () => {
          list.insertAtPosition(1, 0);
          model.splice(0, 0, 1);
        },
        () => {
          list.reverse();
          model.reverse();
        },
        () => {
          list.insertAtPosition(8, model.length);
          model.push(8);
        },
      ];

      for (let i = 0; i < operations.length; i++) {
        operations[i]();

        assertList(
          list,
          model,
          `after operation ${i + 1}`
        );
      }
    },
  ],

  [
    'randomized operations preserve values and size',
    () => {
      const list = new SL();
      const model = [];
      let seed = 0x12345678;

      const random = (max) => {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        return seed % max;
      };

      for (let i = 0; i < 500; i++) {
        const action = random(6);
        const value = random(21) - 10;

        if (action === 0 || model.length === 0) {
          list.insertAtHead(value);
          model.unshift(value);
        } else if (action === 1) {
          list.insertAtTail(value);
          model.push(value);
        } else if (action === 2) {
          const position = random(model.length + 1);

          list.insertAtPosition(value, position);
          model.splice(position, 0, value);
        } else if (action === 3) {
          const position = random(model.length);

          assert.equal(
            list.deleteAtPosition(position),
            model.splice(position, 1)[0]
          );
        } else if (action === 4) {
          list.reverse();
          model.reverse();
        } else {
          const position = random(model.length);

          assert.equal(
            list.deleteAtPosition(position),
            model.splice(position, 1)[0]
          );
        }

        assertList(
          list,
          model,
          `random operation ${i + 1}/500`
        );
      }
    },
  ],
];

// Fail-fast runner: print all names first, then stop at first failure.
test('SL contract suite — fail fast on the first failure', async () => {
  console.log('\nSL TEST CHECKLIST');

  cases.forEach(([name], index) => {
    console.log(
      `${String(index + 1).padStart(2, '0')}. [PENDING] ${name}`
    );
  });

  console.log('');

  for (let index = 0; index < cases.length; index++) {
    const [name, run] = cases[index];

    try {
      await run();

      console.log(
        `PASS ${index + 1}/${cases.length}: ${name}`
      );
    } catch (error) {
      console.error(
        `\nFIRST FAILURE (${index + 1}/${cases.length}): ${name}`
      );

      console.error(
        error?.stack ?? String(error)
      );

      console.log('\nREMAINING TESTS (not run):');

      cases.slice(index + 1).forEach(([pendingName], offset) => {
        console.log(
          `${String(index + offset + 2).padStart(2, '0')}. [PENDING] ${pendingName}`
        );
      });

      throw new Error(
        `FIRST FAILURE (${index + 1}/${cases.length}): ${name}`,
        { cause: error }
      );
    }
  }

  console.log(`\nAll ${cases.length} contract checks passed.`);
});