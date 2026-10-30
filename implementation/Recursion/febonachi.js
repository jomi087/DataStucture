// febonachi formula  fn = f(n-1)+f(n-2)   [0,1,1,2,3,5,8,13]




function feb(n){        // TC = O(2n)
    if(n==1 || n==0){
        return n
    }
    return feb(n-1)+feb(n-2)
}

let res = feb(5)
console.log(res)

/*
TC = No of Recurssion Call * Work in each Call   Ie, TC = O(2n) 
How , that you can check in 
https://www.youtube.com/watch?v=4iT-GhvSKzc&t=500s


*/