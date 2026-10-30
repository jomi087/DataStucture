/**
 * HashTable which store both key and value 
 * handling collision - nop
 */

class HashTable_v2 {
  constructor(size = 10) {
    this.table = new Array(size).fill(null)
    this.size = 0
  }


  #hashFunction(key) {
    let sum = 0
    for (let char of key) {
      sum += char.charCodeAt()
    }
    return sum % this.table.length
  }

  set(key, value) {
    const hashIndex = this.#hashFunction(key)
    if (this.table[hashIndex] === null) {
      this.size++
    }
    this.table[hashIndex] = [key, value]


  }

  get(key) {
    const hashIndex = this.#hashFunction(key)
    if (this.table[hashIndex] && this.table[hashIndex][0] == key) {
      return this.table[hashIndex][1]
    }
    return -1
  }

  has(key) {
    const hashIndex = this.#hashFunction(key)
    if (this.table[hashIndex] && this.table[hashIndex][0] == key) {
      return true
    }
    return false
  }

  remove(key) {
    const hashIndex = this.#hashFunction(key)
    if (this.table[hashIndex] && this.table[hashIndex][0] == key) {
      const del = this.table[hashIndex][1]
      this.table[hashIndex] = null;
      this.size--
      return del
    }
    return -1
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