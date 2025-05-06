let a = [5,7,3,9,1,6,8,0,2]   //O(n2)  [5,5,7,9,1,6,8,0,2] num = 3

for (let i = 1; i < a.length; i++){                 //1,2,3,4
    num = a[i]                                      // indexed value
    let j = i - 1                                   // current index - 1 
    
    while(num < a[j] && j >= 0){  //j=0
         a[j+1] = a[j]
          j--
    }

    a[j+1] = num
}

console.log(a)


/*
here its compares with the privious values 
(expml : Starts with 1st ----compares 1st with 0th , 2nd with 1st and 0th , 3rd with 2nd 1st & 0th 
and if the first privious  comparision failes then with not got to next privious hence reducing the operations  )


 Best-case time complexity (O(n)): [2,1,3,4,5,6]
 cz this also not use the inner loop if its is sorted 
*/