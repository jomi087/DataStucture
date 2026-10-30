class Stack{
    constructor(){
        this.item = []
    }

    Push(value){
        this.item.push(value)
    }

    Pop(){
        if(this.item.length == 0){
            return "wrng input"
        }
        return this.item.pop()
    }

    peeK(){
        return this.item[length-1]
    }

}