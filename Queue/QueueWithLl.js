class Node{  //fifo
    constructor(value){ 
        this.item = value
        this.next = null
    }
}

class Queue{
    constructor(){     //  frnt[]<-[]<-[]rear
        this.front = null
        this.rear = null
        this.size = 0
    }

    enQueue(value){
        const newNode = new Node(value)
        if(this.front == null){
            this.front = this.rear = newNode
        }else{      //frnt[]->[]->[]
            this.rear.next = newNode
            this.rear = newNode
        }
        this.size++
    }

    deQueue(){
        if(this.size === 0 ){
            return "wrng input"
        }

        const dequeuedValue = this.front.item;

        if(this.front == this.rear){
            this.front = this.rear = null
        }else{
            this.front = this.front.next
        }
        this.size--
        return dequeuedValue
    }

    peek(){
        if(this.size === 0) { // If the queue is empty
            return "Queue is empty";
        }
        return this.front.item
        
    }

    
}