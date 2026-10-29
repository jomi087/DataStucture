class Node {
    constructor(val) {
        this.left = null
        this.val = val
        this.right = val
    }


}

let root = new Node(10);
root.left = new Node(30);
root.right = new Node(15);
root.left.left = new Node(20);
root.right.right = new Node(5);

function storeVal(node) {
    let arr = []
    const dfs = (node) => {
        if (!node) return
        arr.push(node.val)
        dfs(node.left)
        dfs(node.right)
    }

    dfs(node)
    return arr
}

function convertBST(root) {
    if (!root) return -1
    
    let arr = storeVal(root)
    arr.sort((a, b) => b - a)
    
    function dfs(node){
        if (!node) return
        
        dfs(node.left)
        node.value = arr.pop()
        dfs(node.right)

    }
    dfs(root)

}

console.log(root)
convert BST(root)
console.log(root)

