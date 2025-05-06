//Binary Search Through Recurssion in a Sorted array 

let arr = [1,2,3,4,5,6,7]
let target  =  50
let strtIndex = 0 
let endIndex = arr.length-1

function binarySearch(arr,trg,s,e){    //Tc= O(logn) & Sc = O(logn)

    let mid = Math.floor(s / 2); // Ensure mid is an integer

    if(e < s){
        return false
    }

    if(arr[mid] === trg ){
        return `value is in ${mid} index`
    }

    if(arr[mid] >= trg){ //left
        return binarySearch(arr,trg,s,mid-1)
    }else{ //right
        return binarySearch(arr,trg,mid+1,e)
    }
}

let result = binarySearch(arr,target,strtIndex,endIndex)
console.log(result)