/*my logic  
but there is a better way  (singleLinkedList way prepend way with head)
As we jst need to make a code for lifo
 (so we wil be prepending and removing the 1st element like this (str from 1) 
5<4<3<2<1 
5 is the last in so 5 will removed 1st  
y Chose this way(singleLinkedList way prepend way with head) cz for this implimentation we will requre less code than my code   )
*/

// class Node{   //lifo             
//     constructor(value) {
//        this.pri =  null 
//        this.item = value
//        this.next =  null 
//     }
// }

// class LinkedList{

//     constructor(){
//         this.head = null
//         this.tail = null
//         this.size  = 0 
//     }   //lifo

//     push(value){
//         const newNode = new Node(value)
//         if(this.head == null){
//             this.head = newNode
//             this.tail = newNode
//         }else{
//             newNode.pri  = this.tail
//             this.tail.next = newNode
//             this.tail = newNode
//         }
//         this.size++

//     }

//     pop(){
//         if(this.head == null){
//             return "Wrong Input, Ll is empty"
//         }

//         if(this.head === this.tail){
//             this.head = null
//             this.tail = null
//         }else{
//             this.tail =this.tail.pri
//             this.tail.next = null
//         }
//         this.size--

//     }

//     peek(){
//         return this.tail ? this.tail.value : "Stack is empty"
//     }

//     isEmpty() {
//         return this.size === 0;
//     }

//     // Get the size of the stack
//     getSize() {
//         return this.size;
//     }

//     print(){
//         if(this.head == null){
//             console.log("wrng input")
//         }

//         let trv = this.head
//         let str = []
//         while(trv){   //[]-[]-[]
//             str.push(trv.item)
//             trv = trv.next
//         }

//         console.log(str)
//     }
// }
// const L = new LinkedList()

/**************************************** SingleLinkedList way prepend way with head ******************************************************/
class Node{
    constructor(value){ //{value/next}
        this.item = value
        this.next = null 
    }
}

class Stack{
    constructor(){ 
        this.top = null 
        this.size = 0
    }

    push(value){ //prepend
        const newNode = new Node(value)
        if(!this.top){  //[]
            this.top = newNode
        }else{  // []->top[]
            newNode.next = this.top 
            this.top = newNode  //top[]->[]
        }
        this.size++;
    }

    pop(){
        if(!this.top){  
           console.log("stack is empty")
           return
        }
        this.top = this.top.next 
        this.size--;
    }

    peek() {
        return this.top ? this.top.value : null;
    }
    
    
}

