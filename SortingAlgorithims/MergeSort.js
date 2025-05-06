function divide(arr){
    if(arr.length <= 1){
        return arr
    }
    let mid = Math.floor(arr.length/2)
    
    let left = divide(arr.slice(0,mid))
    let right = divide(arr.slice(mid))   // by default the 2nd arggument will the last index (ie arr[length-1] index)
    return mergSort(left , right)
}

function mergSort(left,right ){
    let sortedArray = [] 
    while(left.length && right.length){
        if(left[0]  < right[0] ){
            sortedArray.push(left.shift())     
        }else{
            sortedArray.push(right.shift()) 
        }
    }
    return [...sortedArray , ...left , ...right] 
}

let array= [6,4,7,2,5,]
let result = divide(array)
console.log("result",result);
