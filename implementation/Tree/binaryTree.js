class Node {
  constructor(val) {
    this.left = null
    this.val = val
    this.right = null
  }
}

function buildBT(arr) {
  if (arr.length === 0 || arr[0] === null) {
    return null;
  }

  const root = new Node(arr[0])
  const que = [root]
  let i = 1

  while (i < arr.length) {
    const dqu = que.shift()

    if (i < arr.length && arr[i] != null) {
      dqu.left = new Node(arr[i])
      que.push(dqu.left)
    }
    i++

    if (i < arr.length && arr[i] != null) {
      dqu.right = new Node(arr[i])
      que.push(dqu.right)
    }
    i++

  }
  return root

}

let bt = buildBT([8, 7, 6, 5, 4])