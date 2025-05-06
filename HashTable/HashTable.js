class HashTable{
    constructor(size){
        this.table = new Array(size)
    }
    
    hash(key){
        let asci = 0
        for(let i= 0; i < key.length;i++){
            asci += key.charCodeAt(i)
        }
        
        // console.log(asci)
        return asci % this.table.length
    }
    
    set(key,val){
        let index = this.hash(key)
        this.table[index] = val
    }
    
    get(key){
        let index = this.hash(key)
        return this.table[index]
    }
    
    remove(key){
        let index = this.hash(key)
        this.table[index] = undefined
    }
    
    view(){
        for(let i = 0;i < this.table.length;i++){
            if(this.table[i]){
                  console.log(i,this.table[i]) 
            }
        }
    
    }
    
}

  
const hash = new HashTable(7)
console.log(hash)
hash.set("A",11)
hash.set("B",22)
hash.set("C",33)
hash.set("E",55)
hash.set("F",66)
console.log(hash.get("B"))
hash.view()
