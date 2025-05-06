//create a node and add elemetns the  it will wrk

function isComplete(root){
    if(!root) return true
    
    let que = [root]
    let complete  = true


    while(que.length > 0){
        let x = que.shift()

        if(x.left){
            if (!complete) return false
            que.push(x.left)
        }else{
            complete = false
        }

        if(x.right){
            if (!complete) return false
            que.push(x.right)
        }else{
            complete = false
        }
    }
    return true
}

// console.log(isComplete(bst.root))
