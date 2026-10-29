function isPalindrome(str, l, r) {
    if(l>=r)return true
    if(str[l] != str[r])return false
    return isPalindrome(str, l+1,r-1)
}

console.log(isPalindrome("racecAr",0,"racecAr".length-1))
