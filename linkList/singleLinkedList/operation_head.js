

/** POINTS *******************************************************************
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


/**
 * head
 *  value , next -> value, next -> value, next 
 */

class Node {
  constructor(val) {
    this.value = val
    this.next = null
  }
}

class SL {
  constructor() {
    this.head = null
  }


  insertAtTail(val) {
    const newNode = new Node(val)

    if (!this.head) {
      return this.head = newNode
    }

    let curr = this.head
    while (curr.next) {
      curr = curr.next
    }

    curr.next = newNode
  }

  insertAtHead(val) {
    const newNode = new Node(val)  //  {val, null }
    if (!this.head) {
      return this.head = newNode
    }

    newNode.next = this.head
    this.head = newNode

  }

  /*
    {
      val : val
      next : null
    } 
  */
  findLength(node) {
    if (!node) return 0;

    let length = 1
    while (node.next) {
      node = node.next
      length++
    }
    return length
  }

  insertAtPosition(val, pos) {
    if (pos < 0) throw new Error("Invalid position")

    if (pos === 0) {
      return this.insertAtHead(val)
    }

    const newNode = new Node(val)
    let curr = this.head
    let step = 0

    while (curr && step < pos - 1) {
      curr = curr.next
      step++
    }

    if (!curr) throw new Error("Invalid position")

    newNode.next = curr.next
    curr.next = newNode
  }



  deleteAtHead() {
    if (!this.head) return null

    this.head = this.head.next
  }



  deleteAtTail() {
    if (!this.head) return null

    if (!this.head.next) {
      this.head = null
      return
    }

    let prev = null
    let curr = this.head

    while (curr.next) {
      prev = curr
      curr = curr.next
    }
    prev.next = null

  }



  deleteAtPosition(pos) {
    if (pos < 0) throw new Error("Invalid position")

    if (!this.head) return null

    if (pos == 0) {
      return this.deleteAtHead()
    }

    let step = 0;
    let curr = this.head

    while (curr && step < pos - 1) {
      curr = curr.next
      step++
    }

    if (!curr || !curr.next) throw new Error("Invalid position")

    curr.next = curr.next.next;
  }



  search(val) {
    if (!this.head) return null

    let curr = this.head

    while (curr) {
      if (curr.value === val) return true // or return node return curr

      curr = curr.next
    }

    return false
  }

  traverse() {
    if (!this.head) return null

    let curr = this.head

    while (curr) {
      console.log(curr.value)
      curr = curr.next
    }
  }



  reverse() { // 1 -> 2 -> 3 -> null
    if (!this.head) return null

    let prev = null
    let curr = this.head
    let next = curr

    while (curr) {
      next = curr.next
      curr.next = prev
      prev = curr
      curr = next
    }

    this.head = prev
  }



  findMiddle() {
    if (!this.head) return null

    let slow = this.head
    let fast = this.head

    while (fast && fast.next) {
      fast = fast.next.next
      slow = slow.next
    }

    return slow

  }

  isPalindrome() {
    if (!this.head) return true // 1 → 2 → 3 → 2 → 1 → null

    let slow = this.head
    let fast = this.head
    let pre = null

    while (fast && fast.next) {
      pre = slow
      fast = fast.next.next
      slow = slow.next
    }

    if (pre) {
      pre.next = null;
    }

    let middle = slow

    let prev = null
    let curr = middle
    let next = curr

    while (curr) {
      next = curr.next
      curr.next = prev
      prev = curr
      curr = next
    }

    let secondHalf = prev
    let firstHalf = this.head
    let isPalindrome = true;


    while (firstHalf && secondHalf) {
      if (firstHalf.value !== secondHalf.value) {
        isPalindrome = false
        break
      }
      firstHalf = firstHalf.next
      secondHalf = secondHalf.next
    }

    curr = prev
    prev = null
    next = curr

    while (curr) {
      next = curr.next
      curr.next = prev
      prev = curr
      curr = next
    }

    if (pre) {
      pre.next = prev
    }
    return isPalindrome
  }



  detectCycle() {
    if (!this.head) return null

    let slow = this.head
    let fast = this.head

    while (fast && fast.next) {
      fast = fast.next.next
      slow = slow.next

      if (fast == slow) return true

    }

    return false

  }



  removeCycle() {
    if (!this.head) return null

    let slow = this.head
    let fast = this.head

    while (fast && fast.next) {
      fast = fast.next.next
      slow = slow.next

      if (fast == slow) break;
    }

    if (!fast || !fast.next) return "no cycle found"


    let d1 = this.head
    let d2 = slow

    while (d1 !== d2) {
      d1 = d1.next
      d2 = d2.next
    }

    let curr = d1

    while (curr.next !== d1) {
      curr = curr.next
    }

    curr.next = null
  }


  getNthNode(pos) {
    if (pos < 1) {
      throw new Error("Invalid position");
    }

    let curr = this.head;
    let step = 1;

    while (curr && step < pos) {
      curr = curr.next;
      step++;
    }

    if (!curr) {
      throw new Error("Invalid position");
    }

    return curr;
  }

  getNthNodeFromEnd(n) {
    if (n < 1) {
      throw new Error("Invalid position");
    }

    let slow = this.head;
    let fast = this.head;

    // Move fast n nodes ahead
    for (let i = 0; i < n; i++) {
      if (!fast) {
        throw new Error("Invalid position");
      }
      fast = fast.next;
    }

    // Move both pointers until fast reaches null
    while (fast) {
      slow = slow.next;
      fast = fast.next;
    }

    return slow;
  }



  removeDuplicates() {
    if (!this.head) return null;
    const seen = new Set();

    let curr = this.head
    let prev = null

    while (curr) {
      if (seen.has(curr.value)) {
        prev.next = curr.next
      } else {
        seen.add(curr.value);
        prev = curr
      }

      curr = curr.next
    }

  }



  mergeSortedLists(l1, l2) {
    if (!l1 && !l2) return null

    let left = l1
    let right = l2

    let dummyhead = new Node(0)
    let curr = dummyhead

    while (left && right) {
      if (left.value < right.value) {
        curr.next = left
        left = left.next
      } else {
        curr.next = right
        right = right.next
      }
      curr = curr.next
    }

    if (left) {
      curr.next = left
    } else {
      curr.next = right
    }


    return dummyhead.next

  }


}


export { Node, SL };


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
