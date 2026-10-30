let arr = [1,5,6,2,3]        
//this is a  quick sort version //!with out inplace sorting
//easier way (in the point of readable and understandalbe but not that much efficend as inplace  quicksorting sorting way )
function quickSort(arr){    //O(nlogn) but takes extra space
    console.log(arr.length)
    if(arr.length < 2){
        console.log("arr",arr)
        return arr
    }
    
    let piviotPoint = arr[arr.length-1]
    let left = []
    let right = []
    for(let i = 0 ; i  < arr.length - 1 ; i++){
        if(arr[i] < piviotPoint){
            left.push(arr[i]) //[1,2]
        }else{
            right.push(arr[i])//[5,6]
        }
    }
    //  [1,2]    3   [5,6] 
    // [1] 2 []     [5],6,[]
    return[...quickSort(left) , piviotPoint , ...quickSort(right)]
}

//this is a  quick sort version //!with inplace sorting  [once you learn this way comment the above voersion and uncomment this version ]
// function quickSort(arr, low = 0, high = arr.length - 1) {       //O(nlogn) will not take extra space
//     if (low < high) {
//         let pi = partition(arr, low, high); // index of pivot after partition
//         quickSort(arr, low, pi - 1);  // left side
//         quickSort(arr, pi + 1, high); // right side
//     }
//     return arr;
// }

// function partition(arr, low, high) {
//     let pivot = arr[high]; // pick last element as pivot
//     let i = low;

//     for (let j = low; j < high; j++) {
//         if (arr[j] < pivot) {
//             [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
//             i++;
//         }
//     }

//     [arr[i], arr[high]] = [arr[high], arr[i]]; // put pivot in correct place
//     return i;
// }




console.log(quickSort(arr))




/*
Concept is about taking a  element (pivot point)  and allocating it to its wright postion 
[ Here i am taking last element as a pivot point ]
How ? by checking each elemett wether it is small or larger 
if larger then it will be on the right side & vise versa 

by doing this continuesly we can sort the array

another way .........
i = 0 , j = -1
{ array[i] > pv    -> i++ }
{ array[i] <= pv   -> j++  &  if (i > j) Then swap arr[i] & arr[j] Or if(i == j) Then i++ }
Now the piviot (pv) will come in the crct position then again splait into 2 arrray start index to index of pv-1 & index pv+1 to end index then repeate
*/


