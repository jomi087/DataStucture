class Node{
    constructor(value){
        this.value = value
        this.next = null
    }
}

class lL{
    constructor(){
        this.head = null

    }
    
    insert(value){
        const newNode = new Node(value) // {val/null}

        if(this.head == null ){
            this.head = newNode 
            newNode.next = newNode

           
        }else{
            let curr = this.head
            while(curr.next != this.head ){
                curr= curr.next
            }
            curr.next = newNode
            newNode.next = this.head
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






