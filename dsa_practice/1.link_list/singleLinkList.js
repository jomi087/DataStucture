export class Node {
  /**
   * @param {*} value - The value stored in the node.
   * @property {*} value
   * @property {Node|null} next
   */
  constructor(value) {
    this.value = value
    this.next = null
  }
}

export class SL {
  constructor() {
    this.head = null
  }

  /**
   * Inserts a value at the beginning of the linked list.
   *
   * @param {*} value
   * @returns {undefined}
   */
  insertAtHead(value) { }

  /**
   * Inserts a value at the end of the linked list.
   *
   * @param {*} value
   * @returns {undefined}
   */
  insertAtTail(value) {
    const newNode = new Node(value)

    if (!this.head) {
      return this.head = newNode
    }

    let curr = this.head
    while (curr.next) {
      curr = curr.next
    }

    curr.next = newNode
  }

  /**
   * Inserts a value at a specified zero-based position.
   *
   * @param {*} value
   * @param {number} position - Valid range: 0 to size, inclusive.
   * @returns {undefined}
   * @throws {RangeError} If position is not an integer in the valid range. => throw new RangeError("Position out of range");
   *
   * @example
   * List: [10, 30], value = 20, position = 1
   * Result: [10, 20, 30]
   *
   * @example
   * List: [], value = 10, position = 0
   * Result: [10]
   */
  insertAtPosition(value, position) { }

  /**
   * Removes the first node.
   *
   * @returns {*} The removed value, or null if the list is empty.
   */
  deleteAtHead() { }

  /**
   * Removes the last node.
   *
   * @returns {*} The removed value, or null if the list is empty.
   */
  deleteAtTail() { }

  /**
   * Removes the node at a specified zero-based position.
   *
   * @param {number} position - Valid range: 0 to size - 1.
   * @returns {*} The removed value.
   * @throws {RangeError} If position is not an integer in the valid range.
   *
   * @example
   * List: [10, 20, 30], position = 1
   * Returns: 20
   * Result: [10, 30]
   *
   * @example
   * List: [10], position = 0
   * Returns: 10
   * Result: []
   */
  deleteAtPosition(position) { }

  /**
   * Counts the nodes starting from the specified node.
   *
   * @param {Node|null} [node=this.head]
   * @returns {number} The number of nodes; 0 if node is null.
   */
  findLength(node = this.head) { }

  /**
   * Determines whether the list contains the specified value.
   *
   * @param {*} value
   * @returns {boolean}
   */
  search(value) { }

  /**
   * Logs the values of the list in order, from head to tail.
   *
   * @returns {undefined}
   */
  traverse() { }

  /**
   * Reverses the linked list.
   *
   * @returns {undefined}
   */
  reverse() { }

  /**
   * Returns the middle node. For even-length lists, returns the second middle.
   *
   * @returns {Node|null} The middle node, or null if the list is empty.
   *
   * @example
   * List: [10, 20, 30, 40, 50]
   * Returns: Node(30)
   *
   * @example
   * List: [10, 20, 30, 40]
   * Returns: Node(30)
   */
  findMiddle() { }

  /**
   * Determines whether the linked list is a palindrome.
   *
   * @returns {boolean} True if the list is a palindrome; otherwise false.
   *
   * @example
   * List: [1, 2, 3, 2, 1] -> true
   * List: [1, 2, 3] -> false
   * List: [] -> true
   */
  isPalindrome() { }

  /**
   * Determines whether the linked list contains a cycle.
   *
   * @returns {boolean}
   */
  detectCycle() { }

  /**
   * Removes a cycle from the linked list, if present.
   *
   * @returns {boolean} True if a cycle was removed; otherwise false.
   */
  removeCycle() { }

  /**
   * Returns the node at the specified one-based position from the head.
   *
   * @param {number} n - Valid range: 1 to size.
   * @returns {Node} The node at position n.
   * @throws {RangeError} If n is not an integer in the valid range.
   *
   * @example
   * List: [10, 20, 30], n = 2
   * Returns: Node(20)
   */
  getNthNode(n) { }

  /**
   * Returns the node at the specified one-based position from the tail.
   *
   * @param {number} n - Valid range: 1 to size.
   * @returns {Node} The node at position n from the end.
   * @throws {RangeError} If n is not an integer in the valid range.
   *
   * @example
   * List: [10, 20, 30], n = 1
   * Returns: Node(30)
   *
   * @example
   * List: [10, 20, 30], n = 3
   * Returns: Node(10)
   */
  getNthNodeFromEnd(n) { }

  /**
   * Removes duplicate values while preserving the first occurrence.
   *
   * @returns {undefined}
   *
   * @example
   * List: [1, 2, 1, 3, 2]
   * Result: [1, 2, 3]
   */
  removeDuplicates() { }

  /**
   * Merges two sorted linked-list chains into a single sorted chain.
   *
   * @param {Node|null} left - Head of the first chain.
   * @param {Node|null} right - Head of the second chain.
   * @returns {Node|null} Head of the merged chain, or null if both are empty.
   *
   * @example
   * left:  [1, 3, 5]
   * right: [2, 4, 6]
   * Returns: Head of [1, 2, 3, 4, 5, 6]
   *
   * @example
   * left:  []
   * right: [1, 2]
   * Returns: Head of [1, 2]
   */
  mergeSortedLists(left, right) { }
}