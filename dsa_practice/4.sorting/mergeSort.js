// Array Merge Sort
function mergeSort(arr) {
  
}

// Linked List
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Ll {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insert(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
    } else {
      let curr = this.head;

      while (curr.next) {
        curr = curr.next;
      }

      curr.next = newNode;
    }

    this.size++;
  }
}

// Linked List Merge Sort
function mergeSortLl(ll) {
  // ll is an instance of the Ll class
  // Example: Ll { head: Node, size: 5 }
}

export { mergeSort, Ll, mergeSortLl };