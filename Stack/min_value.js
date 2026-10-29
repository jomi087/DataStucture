// i used two stack but there is a way to do with one stack logic also  for that store the value and min { value, min } min is the comparison between currnt value and privious minimum insitail time current value wull be the minimin on next value comapere and that value with min value and store min value so at last the top value will be having stck data ie {value, min } in this the min will be the smallest

class MinStack {
    constructor() {
        this.stack = []
        this.minStack = []
    }

    #lastValue = () => {
        return this.minStack[this.minStack.length - 1]
    }

    #isEmpty() {
        return this.minStack.length === 0
    }

    push(val) {
        this.stack.push(val)
        if (this.#isEmpty() || val <= this.#lastValue()) {
            this.minStack.push(val)
        }
    }

    pop() {
        const del = this.stack.pop()
        if (del === this.#lastValue()) {
            this.minStack.pop()
        }
    }

    getMin() {
        if (this.#isEmpty()) return null
        return this.#lastValue()
    }

    peek() {
        return this.stack[this.stack.length - 1] ?? null
    }
}

const x = new MinStack()

x.push(3)
x.push(5)
x.push(2)
x.push(3)
x.push(6)
x.push(1)

console.log(x)
console.log(x.getMin())

x.pop()

console.log(x)
console.log(x.peek())
console.log(x.getMin())

/*
| Operation | Time | Space |
| --------- | ---- | ----- |
| push      | O(1) | O(n)  |
| pop       | O(1) | O(n)  |
| peek      | O(1) | O(1)  |
| getMin    | O(1) | O(1)  |
*/
