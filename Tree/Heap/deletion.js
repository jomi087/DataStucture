// Delition  for  heap bubble down way

class MaxHeap{
    constructor(){
        this.heap = []
    }

    //for deletin there should be value to delete for that writting again insert method
    insert(val){
        this.heap.push(val) // Add the value at the end of the heap
        this.bubbleUp()   // Reorganize to maintain the max-heap property
    }
    
    parentIndex(index){
        return Math.floor((index - 1)/2)
    }
    
    bubbleUp(){
        let index = this.heap.length - 1

        
        while(index > 0 && this.heap[index] > this.heap[this.parentIndex(index)]){
            [this.heap[this.parentIndex(index)],this.heap[index]]=[this.heap[index],this.heap[this.parentIndex(index)]]
            index = this.parentIndex(index)
        }
    }
    bubbleDown(){
        let index = 0 
        
        while(true){
            const leftChildIndex = (2*index)+1
            const rightChildIndex = (2*index)+2
            let largest = index  
            
            if(leftChildIndex < this.heap.length && this.heap[leftChildIndex] > this.heap[largest]) {
                largest = leftChildIndex 
            }

            if(rightChildIndex < this.heap.length && this.heap[rightChildIndex] > this.heap[largest]) {
                largest = rightChildIndex
            }
            if(largest === index)break;
            [this.heap[index], this.heap[largest]] = 
            [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
    
    delete(){
        if (this.heap.length === 0) return null;
        let max = this.heap[0]
        let end  = this.heap.pop()
        if(this.heap.length > 0) {
            this.heap[0] = end
            this.bubbleDown();
        }
        return max
    }
}

const h= new MaxHeap()
h.insert(5)
// h.insert(10)
// h.insert(6)
// h.insert(15)
// h.insert(20)
// h.insert(25)
// console.log(h.heap)
console.log(h.delete())
console.log(h.delete())
console.log(h.delete())
console.log(h.heap)
