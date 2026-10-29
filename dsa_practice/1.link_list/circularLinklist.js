
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

  traverse() {
    if (!this.head) return null

    let curr = this.head

    while (curr) {
      console.log(curr.val)
      curr = curr.next
      if (curr == this.head) break;
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
    while (curr.next != this.head) {
      curr = curr.next
    }

    curr.next = newNode
    newNode.next = this.head

  }

  insertAtBeginning() {
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

    if (this.head == this.head.next) {
      this.head = null
      return
    }

    let curr = this.head

    while (curr.next != this.head) {
      curr = curr.next
    }

    this.head = this.head.next
    curr.next = this.head


  }

  //can pause here
  deleteFromEnd() {
    if (!this.head) return null

    if (this.head == this.head.next) {
      this.head = null
      return
    }

    let pre = null
    let curr = this.head

    while (curr.next != this.head) {
      pre = curr
      curr = curr.next
    }

    pre.next = this.head

  }

  insertAtPosition() {

  }

  deleteByValue() {

  }

  search() {

  }

  getLength() {

  }

  isEmpty() {

  }

  reverse() {

  }
}