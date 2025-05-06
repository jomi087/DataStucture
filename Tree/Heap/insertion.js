// insertion for max heap bubble up way
class MaxHeap{
    constructor(){
        this.heap = []
    }


    insert(val){
        this.heap.push(val) // Add the value at the end of the heap
        this.bubbleUp()   // Reorganize to maintain the max-heap property
    }
    
    parentIndex(index){
        return Math.floor((index - 1)/2)
    }
    
    bubbleUp(){
        let index = c - 1
        
        while(index > 0 && this.heap[index] > this.heap[this.parentIndex(index)]){
            [this.heap[this.parentIndex(index)],this.heap[index]]=[this.heap[index],this.heap[this.parentIndex(index)]]
            index = this.parentIndex(index)
        }
    }
}

const h= new MaxHeap()
console.log(h)
h.insert(5)
h.insert(10)
h.insert(15)
h.insert(20)
h.insert(25)
console.log(h.heap) 
