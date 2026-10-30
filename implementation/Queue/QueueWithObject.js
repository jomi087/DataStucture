class Queue{    //Tc = O(1)
    
    constructor(){
        this.item = {}
        this.rear = 0
        this.front = 0 
    }

    enqueue(element){
        this.item[this.rear] = element
        this.rear++
    }

    dequeue(){
        if (this.isEmpty()) {
            console.log("Queue is empty, nothing to dequeue");
            return null;
        }

        delete this.item[this.front] 
        this.front++

        if (this.front === this.rear) {
            this.front = 0;
            this.rear = 0;
            this.item = {}; // Reset the object for memory efficiency
        }
    }

    peek(){
        return this.item[this.front]  
    }
    
    isEmpty(){ 
        return this.rear-this.front === 0
    }

    size(){
        return this.rear-this.front
    }

    print(){
        return this.item
    }  

}

const a = new Queue()

console.log(a)
console.log(a.isEmpty())

a.enqueue(5)
a.enqueue(50)
a.enqueue(500)
console.log(a.print())
console.log(a)
console.log(a.peek())
console.log(a.isEmpty())


a.dequeue()
a.dequeue()

console.log(a.print())
console.log(a)
console.log(a.isEmpty())


a.dequeue()

console.log(a.print())
console.log(a)
console.log(a.isEmpty())

a.dequeue()


