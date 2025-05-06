class Node {
    
    constructor(value){
        this.value = value // here "this" is representing the object which we are goign to make 
        this.next = null
    }
}

class LinkedList {
    
    constructor(){
        this.head = null
        this.tail = null
        this.size = 0// size is required
    }

    getsize(){
        console.log(this.size)
    }
    
    
    prepend(value=0){  
        let newNode = new Node(value)
        if( this.head == null){ 
            this.head = newNode 
            this.tail = newNode
        }else{
            newNode.next = this.head
            this.head = newNode
        }
        this.size++
    }
    
    
    append(value=0){  
        let newNode = new Node(value)
        
        if(this.head == null){
            this.head = newNode
            this.tail = newNode
        }else{
            this.tail.next = newNode
            this.tail = newNode 
        }
        this.size++
    }
    
    removeFirst() {
        if (this.head === null) { 
            console.log('The list is already empty');
            return;
        }
        
        if( this.head === this.tail){
            this.tail = null
            this.head = null
        }else{
        this.head = this.head.next; 
        }
        this.size--;
    }
    
    removeLast(){
         if (this.head === null) { 
            console.log('The list is already empty');
            return;
        }
         if( this.head === this.tail){
             
            this.tail = null
            this.head = null;
             
        }else{
            let pri = this.head
            
            while(pri.next !== this.tail){
                 pri = pri.next;
            }
            pri.next = null
            this.tail = pri
        }
        this.size--;
               
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

let l = new LinkedList()

l.prepend(5)
l.append(78)
l.append(66)
l.prepend(85)

l.print()
    
l.removeFirst()
l.print()
l.removeLast()
l.print()
l.removeLast()
l.print()
l.removeFirst()
l.print()

l.getsize()

    