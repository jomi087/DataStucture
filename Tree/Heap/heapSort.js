// heap sort using heapify 
let arr = [1,11,13,5,6,17]

function  heapify(arr,n,i){
    let largest = i 
    let leftChildIndex = (2*i)+1
    let rightChildIndex = (2*i)+2
    
    if(leftChildIndex < n && arr[leftChildIndex] > arr[largest] ){
        largest = leftChildIndex
    }
    if(rightChildIndex < n && arr[rightChildIndex] > arr[largest] ){
        largest = rightChildIndex
    }
    if(i != largest){
        [arr[i],arr[largest]] = [arr[largest],arr[i]]
        
        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}


function heapSort(arr){
    let n = arr.length
    
    //build max heap
    for(let i = Math.floor(n/2)- 1; i >= 0 ;  i--){
        heapify(arr,n,i) 
    }
    
    //extract one by one
    for(let i = n-1 ; i > 0 ; i--){
        [arr[0],arr[i]]=[arr[i],arr[0]]
         
        // Call heapify on the reduced heap
        heapify(arr,i,0) 
    }
   
    return arr
}

console.log(heapSort(arr))
