class TreeNode {
  value: number;
  left: null | TreeNode;
  right: null | TreeNode;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// create tree from array
function createTree(
  arr: number[],
  root: TreeNode | null,
  i: number
): TreeNode | null {
  if (i < arr.length) {
    const temp = new TreeNode(arr[i]);
    root = temp;

    root.left = createTree(arr, root.left, 2 * i + 1);
    root.right = createTree(arr, root.right, 2 * i + 2);
  }

  return root;
}

// DFS to find the maximun path descending from a root
function findMaximunPathDFS(node: TreeNode | null): number {
  if (!node) return 0;

  const left = findMaximunPathDFS(node.left);
  const right = findMaximunPathDFS(node.right);

  if (left > right) {
    return left + node.value;
  } else {
    return right + node.value;
  }
}

// find the maximun path in a tree (sum of left max path, right max path and root value)
function findMaximunPath(root: TreeNode): number {
  const stack: TreeNode[] = [root];
  let max = -Infinity;

  while (stack.length) {
    const node = stack.pop() as TreeNode;
    const sum =
      findMaximunPathDFS(node.left) +
      findMaximunPathDFS(node.right) +
      node.value;

    if (sum > max) {
      max = sum;
    }

    if (node.left) {
      stack.push(node.left);
    }

    if (node.right) {
      stack.push(node.right);
    }
  }

  return max;
}

const tree = createTree([1, 2, 3, 4, 5, 100, 200], null, 0) as TreeNode;

console.log(findMaximunPath(tree));
