class MinHeap {
    constructor() {
        this.heap = []
    }

    parent(i) {
        return Math.floor((i - 1) / 2)
    }



    bubbleUp() {
        let i = this.heap.length - 1

        while (i > 0 && this.heap[i] < this.heap[this.parent(i)]) {
            [this.heap[this.parent(i)], this.heap[i]] = [this.heap[i], this.heap[this.parent(i)]];
            i = this.parent(i)
        }
    }

    bubbleDown() {

        let i = 0

        while (i < this.heap.length) {
            let min = i
            let lci = (2 * i) + 1
            let rci = (2 * i) + 2

            if (lci < this.heap.length && this.heap[lci] < this.heap[min] ) {
                min = lci
            }

            if (rci < this.heap.length && this.heap[rci] < this.heap[min] ) {
                min = rci
            }

            if (i === min) break;
            
            [this.heap[i], this.heap[min]] = [this.heap[min], this.heap[i]];
            i = min

        }

    }

    insert(val) {
    }

    delete() {
    }

}