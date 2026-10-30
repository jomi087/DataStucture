/**
 * a simplified hash table that stores values directly at hashed indexes,
 * handling collision - nop
 */

class HashTable_v1 {
    constructor(size = 10) {
        this.table = new Array(size).fill(null)
        this.size = 0
    }

    #hash(key) {
        let code = 0;
        for (let char of key) {
            code += char.charCodeAt()
        }
        return code % this.table.length
    }

    set(key, value) {
        let hashKey = this.#hash(key)
        if (this.table[hashIndex] === null) {
            this.size++
        }
        this.table[hashKey] = value
    }

    get(key) {
        let hashKey = this.#hash(key)
        return this.table[hashKey]
    }

    has(key) {
        let hashKey = this.#hash(key)
        return this.table[hashKey] !== null ? true : false
    }

    remove(key) {
        let hashKey = this.#hash(key)
        this.table[hashKey] = null
        this.size--
    }

    getSize() {
        return this.size
    }

    isEmpty() {
        return this.size == 0
    }

    print() {
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i] !== null) {
                console.log(i, this.table[i])
            }
        }
    }
}  
