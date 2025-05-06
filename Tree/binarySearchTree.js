class Node{
    constructor(value){
        this.left = null
        this.value = value
        this.right = null
    }
}

class QNode{   //fifo    frnt[v/n]=>[v/n]=>[v/n]rear
    constructor(value){
        this.value = value
        this.next = null
    }
}

class Queue{
    constructor(){
        this.front = null
        this.rear = null
    }
    
    enQueue(value){
        const newNode = new QNode(value)
        if(this.front == null){
            this.front = this.rear = newNode
        }else{
            this.rear.next = newNode
            this.rear = newNode
        }
    }
    
    deQueue(){
        if(!this.front){
            return false
        }
        let removedNode = this.front        
        this.front = this.front.next
        
        if(this.front == null){
            this.rear = null
        }
        return removedNode.value //[v/nul]
        
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
     
     
    has(value,root = this.root){  //search
        if(!root){
          return false   
        }
        
        if(root.value == value){
            return true
        }else if(value < root.value){
             return this.has(value,root.left)
        }else{
            return this.has(value,root.right)
        }
        
    }
    
    //Traverse 
    preOrder(root= this.root){ //dfs //root,l,r
        if(!root){
            return
        }
        
        console.log(root.value)
        this.preOrder(root.left)
        this.preOrder(root.right)
    }
    
    inOrder(root= this.root){ //dfs
        if(!root){
            return
        }
        
        this.inOrder(root.left)
        console.log(root.value)
        this.inOrder(root.right)
        
    }
    
    postOrder(root= this.root){ //dfs
        if(!root){
            return
        }
        
        this.postOrder(root.left)
        this.postOrder(root.right)
        console.log(root.value)
    }
    
    
    levelOrderWithQueue(){
        if(!this.root)return
        
        let queue = new Queue()

        queue.enQueue(this.root)

        while(queue.front != null ){
            let dequ = queue.deQueue()
            console.log(dequ.value)
            
            if(dequ.left){
                queue.enQueue(dequ.left)
            }
            
              if(dequ.right){
                queue.enQueue(dequ.right)
            }
         }

    }
    
    levelOrderWithArray(){
         if(!this.root)return
         
        let queue = []
        queue.push(this.root) //[b]
        
        while(queue.length){
            //remove
            let dequ = queue.shift()
            console.log(dequ.value)
            
            if(dequ.left){
                queue.push(dequ.left)
            }
            if(dequ.right){
                queue.push(dequ.right)
            }
        }
    }
    
    min(root = this.root){
        if (!root) return null;
        if(root.left){
            return this.min(root.left)
        }else{
            return root.value
        }
    }
    
    max(root = this.root){
        if (!root) return null;
        if(root.right){
            return this.max(root.right)
        }else{
            return root.value
        }
    }
    
    delete(value,root = this.root){
        if(!root) return null
        
        if(value < root.value){
            root.left = this.delete(value,root.left)
        }else if(value > root.value){
            root.right = this.delete(value,root.right)
        }else{
            if(root.left == null && root.right == null){
                return null
            }else if(root.left == null ){
                return root.right
                    
            }else if(root.right == null){
                return root.left   
            }else{
                let newValue = this.min(root.right) //successsor
                root.value = newValue
                root.right = this.delete(newValue,root.right)
            }
        }
        return root
    }

    count(root=this.root){
        
        if(!root){
            return 0
        }
        let x = this.count(root.left)
        let y = this.count(root.right)
        
        return (x+y)+1
        
    }
     
    height(root = this.root){
         if(!root){
             return -1
         }
         let x  = this.height(root.left)
         let y = this.height(root.right)
         return Math.max(x,y)+1
    }
    
    //********** This will have O(n^2) time complexity   (Ask copilote if you forget the reason)  *****************//
    isBalanced(root = this.root) {  
         if (root === null) return true; 
 
         let leftHeight = this.height(root.left);  
         let rightHeight = this.height(root.right);
 
         if (Math.abs(leftHeight - rightHeight) > 1) {
             return false;
         }
 
        return this.isBalanced(root.left) && this.isBalanced(root.right);
    }
 
    //********** Optimized version => This will have O(n) time complexity *****************//
    OptimizedIsBalanced(root = this.root) {  
        const checkBalance = (node) => {
            if (!node) return { height: 0, balanced: true }; 
    
            const left = checkBalance(node.left);
            const right = checkBalance(node.right);
    
            const height = Math.max(left.height, right.height) + 1;
            const balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1;
    
            return { height, balanced }; 
        };
        return checkBalance(root).balanced;
    }

    findDepth(nodeValue, root = this.root, depth = 0) {
        if (!root) return -1; // Node not found
        if (root.value === nodeValue) return depth;

        if (nodeValue < root.value) {
            return this.findDepth(nodeValue, root.left, depth + 1);
        } else {
            return this.findDepth(nodeValue, root.right, depth + 1);
        }
    }
}



const bst = new Bst()
bst.insert(10)
bst.insert(5)
bst.insert(15)
bst.insert(3)
bst.insert(8)

console.log(bst.OptimizedIsBalanced())



