//To check the arrray is Sorted or not
let arr = [1,2,3,4,5,6]

function sortedArray(arr,n){   //Tc= O(n) & Sc = O(n)
    if(n==1||n==0){  //0 means no element and 1 mean single element 
        return true 
    }
    if(arr[n-1] >= arr[n-2]){ //6 (5>=4)//5 (4>=3) //4 (3>=2) //3 (2>=1)//2 (1>=0)
        return sortedArray(arr,n-1)
    }else{
        return false
    }
}

let n = arr.length
let result = sortedArray(arr,n)
console.log(result)

/*
Here The Logic is simple 
to check wether the arrray is Sorted or not
is by checkingthe adject value 
ie,
for every array of arr[i] < arr[i+1]  then we can say that array is sorted 
or arr[i] > arr[i-1] 

here we are comparing with the lst element and second last element 
*/