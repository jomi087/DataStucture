class Queue{ //FIFO             Tc = O(n) cz of shift
    constructor(){       
        this.item = [] 
    }
    
    enqueue(element){ // add element to the rear /tail/ end
        this.item.push(element)
    }
    
    dequeue(){         //remove element from the head/front/begining
       return  this.item.shift()
    }
    
    peek(){
        return this.item[0]    
    }
    
    isEmpty(){
        return this.item.length < 0
    }
    
    size(){
        return this.item.length 
    }
    
    print(){
        return this.item.toString()
    }
    
 }
 
 const queue = new Queue()
 
console.log(queue.enqueue(5))
console.log(queue.enqueue(51))
console.log(queue.enqueue(165))

console.log(queue.print())
console.log(queue.dequeue())
console.log(queue.peek())
console.log(queue.print())