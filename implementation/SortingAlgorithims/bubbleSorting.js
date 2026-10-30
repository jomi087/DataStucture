
let arr1 = [1,2,3,4,6,5]  //w0rst CaseO(n2)  best-case time complexity: 𝑂(𝑛))


let alreadySorted    // this is stop the iteration if array has got sorted before full iteration 
// let count = 0   //log count to check hiwmuch iteration heppend 

for(let i = 0 ; i < arr1.length - 1 ;i++){   //<5
    alreadySorted = true;      // Reset the flag at the start of each outer loop
    for(let j = 0 ; j < arr1.length - i - 1 ; j++ ){  //<5(4)
        if(arr1[j] > arr1[j+1]){
            let temp = arr1[j+1]
            arr1[j+1] = arr1[j]
            arr1[j] = temp
            // count++ 
            alreadySorted  = false 
        }
    }
    if (alreadySorted) break; // Exit early if no swaps were made
}

console.log(arr1)

/*
Here this compares with adjasent index (exple : 0th with 1st , 1st with 2nd , 2nd with 3rd ... ) 

benifts
    can stop the operation if the the array is sorted (𝑂(𝑛))
    How ? 
    by checking in the "j"s iteration if in "j" full iteration if there  has been no swap occured then we can confirm it that array is sorted
*/

