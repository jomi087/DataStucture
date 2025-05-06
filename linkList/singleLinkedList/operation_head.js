class Node {
    
    constructor(value){
        this.value = value // here "this" is representing the object which we are goign to make 
        this.next = null
    }
}

class LinkedList {
    
    constructor(){
        this.head = null
        this.size = 0  // size is required
    }

    getsize(){
        console.log(this.size)
    }
    
    addFirst(value=0){  //prepending
        let newNode = new Node(value)
        if( this.head == null){ 
            this.head = newNode  
        }else{       
            newNode.next = this.head
            this.head = newNode
        }
        this.size++
    }
    
    addLast(value=0){  //appending
        let newNode = new Node(value)
        
        if(this.head == null){
            this.head = newNode
        }else{
            let currentNode = this.head
            
            while(currentNode.next){  //   [v/a[]],[v/a[]],[v/n]
                currentNode = currentNode.next
            }
            currentNode.next = newNode   //  [v/a[]],[v/a[]],[v/newNOde] 
        }
        this.size++
    }
    
    insert(value=0,index){  
        
        console.log(`value = ${value}, index = ${index}`)
        if(index < 0 || index > this.size || index == undefined){
            console.log('Wrong input')
            return 
        }
        
        if(index === 0){
            this.addFirst(value)
        }else{
        let newNode = new Node(value)  //[5/null]
        // head[200/400add]-[400/600add]-[600/null]
            let pri = this.head
            for(let i = 0 ; i < index-1 ; i++){ //1<2  //
                pri = pri.next
            }
            newNode.next = pri.next  // assigne 600add from[400/600add]  to newnodes address [5/null] ie [5/600add]
            pri.next = newNode // re-aasigned newnode adress (ie newnode) to revious node (ie from [400/600add] to [400/newNode] which ower here is [400/ 5add]  
            this.size++
        }
    }
    
    removeFrom(index){
        if(index<0 || index >= this.size){
            return "Wrong input"
        }
        
        let removedNode
        
        if(index === 0){
            removedNode = this.head
            this.head = this.head.next 
        }else{
            let pri = this.head
            
            for(let i = 0 ; i < index-1; i++){
                pri = pri.next
            }
            removedNode = pri.next
            pri.next = removedNode.next

        }
        this.size--
        return removedNode.value
    }
    
    removeValue(value){
        if(this.head == null){
            console.log('Wrong input')
            return 
        }
        
        if(this.head.value === value){
            this.head = this.head.next
             this.size--
            return value
        }else{
            let pri = this.head
            while(pri.next && pri.next.value != value){
                pri = pri.next
            }
            if(pri.next){
                let removedValue = pri.next 
                pri.next = removedValue.next
                this.size--
                return value
            }else{
                return "Number is not in this linked List"
            }
        }
    }
    
    serch(value){
        if(this.head == null){
            console.log('Wrong Output')
        }
        
        let curr = this.head
        for(let i = 0 ; curr ; i++){
            if(curr.value == value){
                return i
            }
            curr = curr.next
        }
        return "value not found in your linkedList"
    }
    
    reverse(){  
        let pri = null
        let curr = this.head
        
        while(curr){
            let next = curr.next
            curr.next = pri
            pri = curr
            curr=next
        }
        
        this.head = pri
    }
    
    
    print(){
         if(this.head == null){ 
            console.log('List is empty')
        }else{
            let curr = this.head
            let Linklist = ""
            while(curr){
                Linklist = Linklist +`${curr.value} `
                curr = curr.next
            }
            console.log(Linklist)
        }
    }
}

const list = new LinkedList();
list.addFirst(300)
list.addLast(400)
list.addFirst(200)
list.addLast(600)
list.getsize()
list.print()

console.log("\nInsert from here");

list.getsize()
list.insert(250,2)
list.print()

list.getsize()
list.insert(10,0)
list.print()
list.getsize()

console.log("\nRemove from index here");

console.log(list.removeFrom(3))
list.print()
list.getsize()

console.log("\nRemove from value here");
console.log(list.removeValue(400))
list.getsize()
list.print()

console.log('\nSerch value to get index from here')
console.log(list.serch(600)+" index")
console.log(list.serch(500))

list.reverse()
list.print()




