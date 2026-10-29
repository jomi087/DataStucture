//print a linked list in rever order using stack

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

