/**
 * HashTable which store both key and value 
 * handling collision - yes (via close chaining via linear probing)
 * has resize
 */

class HashTable_v4 {
  static DELETED = Symbol("DELETED");

  constructor(size = 10) {
    this.table = new Array(size).fill(null)
    this.size = 0
    this.deletedCount = 0;

  }

  _resize(newCapacity) {
    const oldTable = this.table;

    this.table = new Array(newCapacity).fill(null);

    this.size = 0;
    this.deletedCount = 0;

    // this is re-hashing
    for (let i = 0; i < oldTable.length; i++) {
      if (
        oldTable[i] !== null &&
        oldTable[i] !== HashTable_v4.DELETED
      ) {
        this.set(oldTable[i][0], oldTable[i][1]);
      }
    }
  }

  #hashFunction(key) {
    let sum = 0
    for (let char of key) {
      sum += char.charCodeAt()
    }
    return sum % this.table.length
  }

  #linerProb(currentIndex) {
    return (currentIndex + 1) % this.table.length
  }



  set(key, value) {
    if (typeof key !== "string") {
      throw new TypeError("Keys must be strings");
    }

    // Rebuild if the table has too many occupied/tombstone slots.
    if ((this.size + this.deletedCount + 1) / this.table.length > 0.7) {
      this._resize(this.table.length * 2);
    }

    const hashIndex = this.#hashFunction(key)
    let currentIndex = hashIndex
    let firstDeletedIndex = null

    while (true) {

      const currentEntry = this.table[currentIndex];


      if (currentEntry === HashTable_v4.DELETED && firstDeletedIndex == null) {
        firstDeletedIndex = currentIndex
      }

      if (currentEntry === null) {
        firstDeletedIndex = firstDeletedIndex == null ? currentIndex : firstDeletedIndex
        break;
      }

      if (currentEntry[0] === key) {
        currentEntry[1] = value
        return
      }

      currentIndex = this.#linerProb(currentIndex)

      if (currentIndex == hashIndex) break;
    };

    if (firstDeletedIndex == null) throw new Error("Hash table is full");

    if (this.table[firstDeletedIndex] === HashTable_v4.DELETED) {
      this.deletedCount--;
    }

    this.table[firstDeletedIndex] = [key, value];
    this.size++
  }

  get(key) {
    if (typeof key !== "string") {
      throw new TypeError("Keys must be strings");
    }

    const hashIndex = this.#hashFunction(key)
    let currentIndex = hashIndex

    while (true) {
      const currentEntry = this.table[currentIndex];

      if (currentEntry == null) {
        return -1
      }

      if (currentEntry[0] === key) {
        return currentEntry[1]
      }

      currentIndex = this.#linerProb(currentIndex)
      if (currentIndex == hashIndex) return -1;

    }

  }

  has(key) {

  }

  remove(key) {
    if (typeof key !== "string") {
      throw new TypeError("Keys must be strings");
    }

    const hashIndex = this.#hashFunction(key)
    let currentIndex = hashIndex

    while (true) {
      const currentEntry = this.table[currentIndex];

      if (currentEntry == null) {
        return -1
      }

      if (currentEntry[0] === key) {
        let del = currentEntry
        this.table[currentIndex] = HashTable_v4.DELETED;
        this.size--;
        this.deletedCount++;
        return del
      }

      currentIndex = this.#linerProb(currentIndex)
      if (currentIndex == hashIndex) return -1;
    }
  }

  print() {

  }
}