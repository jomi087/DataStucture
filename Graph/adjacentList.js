class Graph{
    constructor(){
        this.alist = new Map()
    }
    
    addvertex(vertex){ //adding node
        if(!this.alist.has(vertex)){
            this.alist.set((vertex),new Set ())
        }
    }
    
    addEdge(vertex1,vertex2){
        this.addvertex(vertex1)
        this.addvertex(vertex2)
       
        this.alist.get(vertex1).add(vertex2)
        // For undirected graphs, also add the reverse edge
        this.alist.get(vertex2).add(vertex1)
    }
    
    removeEdge(vertex1,vertex2){
        if(this.alist.has(vertex1)){
            this.alist.get(vertex1).delete(vertex2)
        }
        
        if(this.alist.has(vertex2)){
            this.alist.get(vertex2).delete(vertex1)
        }
    }
    
    removeVertex(vertex){  
        if(this.alist.has(vertex)){
            //remove the vertx
            this.alist.delete(vertex)
            
            //remove edges from other vertex 
            for(let [key,value] of this.alist){
               if(value.has(vertex)){
                   value.delete(vertex)
               }
            }
        }
    }

    display() {
        for (const [key, value] of this.alist) {
            console.log(`${key} -> ${[...value].join(', ')}`);
        }
    }
    

    dfs(start, visited = new Set()) {
        if (!this.alist.has(start)) return;
    
        console.log(start); // Process the node
        visited.add(start);
    
        for (const neighbor of this.alist.get(start)) {
            if (!visited.has(neighbor)) {
                this.dfs(neighbor, visited);
            }
        }
    }
    
    bfs(start) {
    if (!this.alist.has(start)) return;

    const visited = new Set();
    const queue = [start];

    while (queue.length > 0) {
        const vertex = queue.shift(); // Dequeue
        if (!visited.has(vertex)) {
            console.log(vertex); // Process the node
            visited.add(vertex);

            for (const neighbor of this.alist.get(vertex)) {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }
    }
}

}
