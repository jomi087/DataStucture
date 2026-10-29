// Reverse a string using a stack.

class Stack {
    constructor() {
        this.items = []
    }

    push(val) {
        this.items.push(val)
    }


    pop() {
        return this.items.pop()
    }

    isEmpty() {
        return this.items.length === 0
    }
}

const newStack = new Stack()

let str = "abc"  //cba -> c+b+a
let reverse = ""

for (let s of str) {
    newStack.push(s)
}

console.log(newStack)

while (!newStack.isEmpty()) {
    reverse = reverse + newStack.pop()
}

console.log(reverse)
