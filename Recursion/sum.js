function fact(n){      //Tc = O(n) Sc = O(n)
    if(n == 1 ){
        return 1 
    }
    return n + fact(n-1)
}

console.log(fact(5))



