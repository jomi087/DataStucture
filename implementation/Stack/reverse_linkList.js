//print a linked list in rever order using task

class Node {
    
    constructor(value){
        this.value = value 
        this.next = null
    }
}

const firstNode = new Node(5)
const secondNode = new Node(6)
const thirdNode = new Node(7)
const fourthNode = new Node(8)

firstNode.next = secondNode
secondNode.next = thirdNode
thirdNode.next = fourthNode

console.log(firstNode)

let curr = firstNode
let stack = []
while (curr) {
    stack.push(curr.value)
    curr = curr.next
}
console.log(stack)

while (stack.length > 0) {
    console.log(stack.pop())
}