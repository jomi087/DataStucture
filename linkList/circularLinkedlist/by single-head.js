//  * Circular linked list: The final node links back to the head, so every node is part of the circle.
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class Cl {
  constructor() {
    this.head = null
  }

  traverse() { // failed
    if (!this.head) return null

    let curr = this.head
    while (true) {
      console.log(curr.val)
      if (curr.next === this.head) break;
      curr = curr.next

    }
  }

  insertAtEnd(val) {
    const newNode = new Node(val)
    if (!this.head) {
      this.head = newNode
      newNode.next = this.head
      return
    }

    let curr = this.head
    while (curr) {
      if (curr.next === this.head) {
        curr.next = newNode
        newNode.next = this.head
        return
      }
      curr = curr.next
    }
  }

  insertAtBeginning(val) {
    const newNode = new Node(val)
    if (!this.head) {
      this.head = newNode
      newNode.next = this.head
      return
    }

    let curr = this.head

    while (curr.next != this.head) {
      curr = curr.next
    }


    newNode.next = this.head
    this.head = newNode
    curr.next = this.head

  }

  deleteFromBeginning() {
    if (!this.head) return null

    if (this.head.next == this.head) return this.head = null

    let curr = this.head

    while (curr.next != this.head) {
      curr = curr.next
    }

    this.head = this.head.next
    curr.next = this.head

  }

  deleteFromEnd(
    
  ) {

  }

  insertAtPosition() { }

  deleteByValue() { }

  search() { }

  getLength() { }

  isEmpty() { }

  reverse() { }
}