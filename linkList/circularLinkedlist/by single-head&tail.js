class Node{
    constructor(value){
        this.value = value
        this.next = null
    }
}

class lL{
    constructor(){
        this.head = null
        this.tail = null
    }
    
    insert(value){
        const newNode = new Node(value) // {val/null}

        if(this.head == null ){
            this.head = newNode 
            this.tail = newNode
            newNode.next = newNode
        }else{
            this.tail.next = newNode
            newNode.next = this.head
            this.tail = newNode
            
        }
    }
}

const l = new lL()
let arr = [1,2,3]
for( i of arr){
    l.insert(i)
}
// console.log(JSON.stringify(l,null,2))
console.log(l)
