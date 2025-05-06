//4! = 4*3*2*1

function fact(n){        //Tc = O(n) Sc = O(n)
    if(n == 0 ){
        return 1 
    }
    
    return n * fact(n-1)
}

console.log(fact(3))

/*
Time COmplexity = No of Recurssion Call * Work in each Call 
    So if n = 3  F(3),f(2),f(1),f(0)  so 4 recursion call 
    ie  No of Recurssion Call  = n+1 also we can say it as n (cz adding 1 dosnt make a  dramatic change)
    and in each call 2 constant operation is wrking   
    ie Work in each Call  = 2 
    so there 4  Tc = O(n+2)  we can again nelgate the 2 cz 2 also dosent make any  dramatic change 
    Ther for 
    Tc = O(n)

Space COmplexity =  Height of call Stack * memory in each stack  
    so if , Height of call Stack  = n+1 ie , n
    and memory in each stack   =  nill (cz no additional space is taking )
     Ther for 
    Sc = O(n)
*/