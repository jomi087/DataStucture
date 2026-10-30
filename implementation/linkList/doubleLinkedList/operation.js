class Node{
    constructor(value){
        this.pri = null
        this.value = value
        this.next = null
    }
}

class LinkedList{
    constructor(){
        this.head = null
        this.tail = null
        this.size = 0
    }

    first(value){
        let newNode = new Node(value)
        if(this.head == null){
            this.head = newNode  // Node{  pri : null,  value : 5  , next : null }
            this.tail = newNode
        }else{
            newNode.next = this.head
            this.head.pri = newNode
            this.head = newNode
        }
        this.size++
    }

    last(value){
        let newNode = new Node(value)
        if(this.head == null){
            this.head = newNode  // Node{  pri : null,  value : 5  , next : null }
            this.tail = newNode
        }else{
            this.tail.next = newNode
            newNode.pri =this.tail
            this.tail = newNode
        }
        this.size++
    }

    //remove from the end and front
    removeFirst(){
        if(this.head === null){
            console.log("Wrong input"); //        
        }
        if(this.head == this.tail){ 
            this.head = null 
            this.tail = null
        }else{
            this.head  = this.head.next
            this.head.pri = null
        }
        this.size--
    }


    removeLast(){                                       
        if(this.head === null){         //             100              101             102
            console.log("Wrong input"); //         [null/v/101]     [100/v/102]     [101/v/null]  
        }

        if(this.head === this.tail){
            this.head = null 
            this.tail = null
        }else{
            this.tail = this.tail.pri
            this.tail.next = null
        }
        this.size--
    }

    insert(index,value){
        if(index < 0 || index > this.size){
            console.log("wrong input")
        }
        if( index === 0 ){
            this.first(value)
        }else if(index === this.size){
            this.last(value)
        }else{
            const newNode = new Node(value)      //     100[null/v/101]    101[100/v/105 ]                  102[105/v/null]    
            let curr = this.head                 //                                          105[101/v/102]
            for(let i = 0 ; i < index-1  ; i++){
                curr = curr.next
            }
            newNode.next = curr.next
            newNode.pri = curr
            if(curr.next){
                curr.next.pri = newNode
            }
            curr.next = newNode
        }
        this.size++
    }

    print(){
        if(this.head == null){
            console.log("wrng input")
        }

        let trv = this.head
        let str = []
        while(trv){   //[]-[]-[]
            str.push(trv)
            trv = trv.next
        }

        console.log(str)
    }
}

const l = new LinkedList()
console.log(l)

l.last(5)
l.last(52)
l.last(522)
l.last(5222)

l.print()

