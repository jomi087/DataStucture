/**
 * HashTable which stores both keys and values.
 * Collision handling: Open addressing via Quadratic probing.
 * Supports resizing and rehashing.
 */

class HashTable_v4 {
  static DELETED = Symbol("DELETED");

  constructor(size = 10) {}

  _resize(newCapacity) {}

  #hashFunction(key) {}

  #quadraticProb(currentIndex) {}

  set(key, value) {}

  get(key) {}

  has(key) {}

  remove(key) {}

  print() {}
}