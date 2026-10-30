function isPalindrome(str) {
    // Check if the string is equal to its reverse
    return str === str.split('').reverse().join('');
}

function makePalindrome(str) {
    // Check if the string is already a palindrome
    if (isPalindrome(str)) {
        return { isPalindrome: true, result: str };
    }

    // To make it a palindrome, we add characters at the end
    let additions = ''; // Characters to be added
    let i = 0;
    
    // Try adding characters from the beginning one by one
    while (!isPalindrome(str + additions)) {
        additions = str[i] + additions;
        i++;
    }

    // Return the new palindrome
    return { isPalindrome: false, result: str + additions };
}

// Example Usage
const input = "joe"; // Change this to any string
const result = makePalindrome(input);

console.log(`Original String: "${input}"`);
if (result.isPalindrome) {
    console.log("The string is already a palindrome.");
} else {
    console.log(`Modified Palindrome: "${result.result}"`);
}


