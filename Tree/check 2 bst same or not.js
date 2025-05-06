class Node{
    constructor(value){
        this.left = null
        this.value = value
        this.right = null
    }
}



class Bst{
    constructor(){
        this.root = null
    }
    
    insert(value){
        const newNode = new Node(value)
        if(!this.root){
            this.root = newNode
        }else{
             this.fun(this.root,newNode)
        }
    }
    
    fun(root,newNode){
        if(newNode.value < root.value){
            if(root.left == null){
                root.left  = newNode
            }else{
                this.fun(root.left,newNode)
            }  
        }else{
           if(root.right == null){
                root.right  = newNode
            }else{
                this.fun(root.right,newNode)
            }   
        }
    }
    
}

const bst1 = new Bst()
bst1.insert(10)
bst1.insert(5)
bst1.insert(8)
bst1.insert(25)
bst1.insert(3)
bst1.insert(33)

const bst2 = new Bst()
bst2.insert(10)
bst2.insert(5)
bst2.insert(8)
bst2.insert(25)
bst2.insert(3)
bst2.insert(33)

console.log(bst1)
console.log(bst2)

function checkSame(t1,t2){
    if(!t1 && !t2){
        return true
    }
    if(!t1 || !t2){
        return false
    }
    if(t1.value != t2.value){
        return false
    }
    return checkSame(t1.left,t2.left) && checkSame(t1.right,t2.right)
}

console.log(checkSame(bst1.root,bst2.root))
