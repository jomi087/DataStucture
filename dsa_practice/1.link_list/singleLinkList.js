/**
 * Reminder - a circular LinkedList and linked list with a cycle is diffrent 
 * Circular linked list: The final node links back to the head, so every node is part of the circle.
 * Linked list with a cycle: A node links back to an earlier node, which might not be the head. Some nodes can exist before the cycle begins.
 */
export class Node {

}

export class SL {

  insertAtTail(val) { }

  insertAtHead(val) { }

  findLength(node) { }

  insertAtPosition(val, pos) { } // failed

  deleteAtHead() { }

  deleteAtTail() { }

  deleteAtPosition(pos) { } // failed

  search(val) { }

  traverse() { }

  reverse() { }

  findMiddle() { }

  isPalindrome() { } // failed

  detectCycle() { }

  removeCycle() { } // failed

  getNthNode(pos) { }

  getNthNodeFromEnd(pos) { } // failed

  removeDuplicates() { } // failed

  mergeSortedLists(l1, l2) { }
}


/** HINTS *******************************************************************
 * removeCycle() 
 * - Uses Floyd's Cycle Detection Algorithm (slow and fast pointers).
 * - Detects whether a cycle exists, finds its starting node, were the cycle start
 * 
 * getNthNodeFromEnd(pos)
 * - Uses the two-pointer technique.
 * - Move the fast pointer `pos` steps ahead, then move both pointers
 *
 * isPalindrome()
 * - Find the middle of the linked list using slow and fast pointers.
 * - Reverse the second half of the list.
 * - Compare the first half with the reversed second half.
_________________________________________________________________________________________ */
