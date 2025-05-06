class TrieNode{
    constructor(){
        this.children = {}
        this.end = false
    }
}

class Trie{
    constructor(){
        this.root = new TrieNode()
    }
    
    insert(word){
        let curr = this.root
        
        for(let char of word){
            if(!curr.children[char]){
                curr.children[char] = new TrieNode()
            }
            
            curr = curr.children[char]
        }
        
        curr.end = true
    }

    search(word){
         
        let curr = this.root
        
        for(let char of word){
            if(!curr.children[char]){
                return false
            }
            
            curr = curr.children[char]
        }
        
        return curr.end
        
    }

    delete(word) {
        const remove = (node, word, depth) => {
            if (!node) return false;
    
            if (depth === word.length) {
                if (!node.end) return false; // Word not found
                node.end = false;           // Unmark the end of the word
    
                // Check if node can be deleted
                return Object.keys(node.children).length === 0;
            }
    
            const char = word[depth];
            if (!remove(node.children[char], word, depth + 1)) return false;
    
            delete node.children[char];
            return Object.keys(node.children).length === 0 && !node.end;
        };
    
        remove(this.root, word, 0);
    }
    
}

const a = new Trie()
a.insert("jomi")
console.log(a)
