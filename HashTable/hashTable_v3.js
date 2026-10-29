/**
 * HashTable which store both key and value 
 * handling collision - yes (via open chaining / open hashing)
 * external data  = nested array
 */
class HashTable_v3 {
  constructor(size = 10) {
    //# don't do fill([]) cz [] uses reference so fill([]) puts the same array reference in every position
    // this.table = new Array(size).fill([]) 
    this.table = new Array(size).fill(null).map(() => []);
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

    for (let pair of this.table[hashIndex]) {
      if (pair[0] === key) {
        pair[1] = value
        return
      }
    }

    this.table[hashIndex].push([key, value])
    this.size++
  }

  get(key) {
    const hashIndex = this.#hashFunction(key)

    for (let pair of this.table[hashIndex]) {
      if (pair[0] === key) {
        return pair[1]
      }
    }

    return -1
  }

  has(key) {
    const hashIndex = this.#hashFunction(key)

    for (let pair of this.table[hashIndex]) {
      if (pair[0] === key) {
        return true
      }
    }

    return false
  }

  remove(key) {
    const hashIndex = this.#hashFunction(key)


    let bucket = this.table[hashIndex]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        let del = bucket[i]
        bucket.splice(i, 1)
        this.size--
        return del
      }
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
    for (let bucket of this.table) {
      if (bucket.length != 0) {
        for (let pair of bucket) {
          console.log(pair)
        }
      }
    }
  }
}


/**
 * HashTable which store both key and value 
 * handling collision - yes (via open chaining / open hashing)
 * external data  = linkedList
 */
class HashTable_v3 {
  constructor() {

  }

  #hashFunction(key) {
  }


  set(key, value) {
   
  }

  get(key) {
   
  }

  has(key) {
   
  }

  remove(key) {
   
  }

  getSize() {
  }

  isEmpty() {
  }

  print() { 
    
  }
}