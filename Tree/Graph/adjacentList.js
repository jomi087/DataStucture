class Graph {
  constructor() {
    this.adjList = {}
  }

  addVertex(v) {
    if (!this.adjList[v]) {
      this.adjList[v] = new Set()
    }
  }

  addEdges(v1, v2) {
    if (!this.adjList[v1]) {
      this.addVertex(v1)
    }

    if (!this.adjList[v2]) {
      this.addVertex(v2)
    }

    this.adjList[v1].add(v2)
    this.adjList[v2].add(v1)
  }

  removeEdge(v1, v2) {
    // sligt tweak for directed graph
    if (!this.adjList[v1] || !this.adjList[v2]) return false

    this.adjList[v1].delete(v2)
    this.adjList[v2].delete(v1)

    return true
  }

  removeVertex(v) {
    //some tweak in directed graph
    if (!this.adjList[v]) return false

    for (let neighbour of this.adjList[v]) {
      this.adjList[neighbour].delete(v)
    }

    delete this.adjList[v]
    return true
  }

  dfs(start) {
    if (!this.adjList[start]) return null
    let visited = new Set()
    const helper = (v) => {
      console.log(v)
      visited.add(v)

      for (let neighbour of this.adjList[v]) {
        if (!visited.has(neighbour)) {
          helper(neighbour)
        }
      }
    }
    helper(start)
  }

  bfs(start) {
    if (!this.adjList[start]) return null

    let visited = new Set()
    let que = [start]

    visited.add(start)

    while (que.length) {
      let deque = que.shift()
      console.log(deque)

      for (let neighbour of this.adjList[deque]) {
        if (!visited.has(neighbour)) {
          que.push(neighbour)
          visited.add(neighbour)
        }
      }
    }
  }

  hasPath(from, to) {
    if (!this.adjList[from] || !this.adjList[to]) return null
    let visited = new Set() //abc

    const helper = (v) => {
      visited.add(v) //
      if (v === to) return true // d == d

      for (let neighbour of this.adjList[v]) {
        if (!visited.has(neighbour)) {
          if (helper(neighbour)) return true
        }
      }

      return false
    }
    return helper(from)
  }

  findPath(from, to) {
    // this only return only path (their might be more path which reach from current pos to destination pos)
    if (!this.adjList[from] || !this.adjList[to]) return null
    let visited = new Set() //abefcd
    let path = [] //acd

    const helper = (v) => {
      visited.add(v)
      path.push(v)
      if (v === to) return true // ac == d

      for (let neighbour of this.adjList[v]) {
        //b,c
        if (!visited.has(neighbour)) {
          if (helper(neighbour)) return true
        }
      }
      path.pop()
      return false
    }
    return helper(from) ? path : null
  }

  allPaths(from, to) {
    //return all paths from current pos to destination pos
    if (!this.adjList[from] || !this.adjList[to]) return null

    let result = []
    let path = []
    let visited = new Set()

    const helper = (v) => {
      visited.add(v)
      path.push(v)

      if (v === to) {
        result.push([...path]) // store a copy
      } else {
        for (let neighbour of this.adjList[v]) {
          if (!visited.has(neighbour)) {
            helper(neighbour)
          }
        }
      }
      path.pop() // backtrack
      visited.delete(v) // ❗ allow reuse in other paths
    }

    helper(from)
    return result
  }

  shortestPath(from, to) {
    if (!this.adjList[from] || !this.adjList[to]) return null

    let que = [[from, [from]]] // [currentNode, pathSoFar]
    let visited = new Set() //abcd
    visited.add(from)

    while (que.length) {
      let deque = que.shift()
      //deque[0] is currentNode and deque[1] will be the path
      if (deque[0] === to) return deque[1] // d === d

      for (let neighbour of this.adjList[deque[0]]) {
        if (!visited.has(neighbour)) {
          visited.add(neighbour)
          que.push([neighbour, [...path, neighbour]])
        }
      }
    }
    return null
  }

  // cycleDetection(start){  //directed graph
  //     if(!this.adjList[start]) return null

  //     let visited = new Set()  //abcd
  //     let recStack = new Set(); //abcd

  //     const helper = (v) => { //abcd
  //         visited.add(v)
  //         recStack.add(v);

  //         for(let neighbour of this.adjList[v]){
  //             if(!visited.has(neighbour)){
  //                 if(helper(neighbour))return true  //helper(c)
  //             } else if (recStack.has(neighbour)) {
  //                 return true; // cycle found
  //             }
  //         }
  //         recStack.delete(v);
  //         return false
  //     }
  //     return helper(start)
  // }

  cycleDetection(start) {
    //undirected graph  //for connected graph // for disconnected graph i have to make some tweks ask chatgpt
    if (!this.adjList[start]) return null

    let visited = new Set() //abc

    const helper = (v, parent) => {
      //aN ,//ba //cb
      visited.add(v)

      for (let neighbour of this.adjList[v]) {
        //bc //c //a
        if (!visited.has(neighbour)) {
          if (helper(neighbour, v)) return true //ba//cb
        } else if (neighbour !== parent) {
          //a!=a //b!=b // a!=b
          return true // cycle found
        }
      }
      return false
    }

    return helper(start, null)
  }
}
