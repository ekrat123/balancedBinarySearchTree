class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array, 0, array.length - 1);
  }

  buildTree(array, start, end) {
    // Base Case
    if (start > end) {
      return null;
    }

    // Get the middle element and make it the root
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    // Recursively construct the left and right subtrees
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  uniqArray(array) {
    const uniqArray = [];
    for (let i = 0; i < array.length; i++) {
      if (!uniqArray.includes(array[i])) {
        uniqArray.push(array[i]);
      }
    }
    return uniqArray;
  }

  merge(arr1, arr2) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < arr1.length && rightIndex < arr2.length) {
      if (arr1[leftIndex] < arr2[rightIndex]) {
        result.push(arr1[leftIndex]);
        leftIndex++;
      } else {
        result.push(arr2[rightIndex]);
        rightIndex++;
      }
    }
    return result.concat(arr1.slice(leftIndex), arr2.slice(rightIndex));
  }

  mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, middle);
    const rightArr = arr.slice(middle);
    const sortedLeftArr = mergeSort(leftArr);
    const sortedRightArr = mergeSort(rightArr);
    return this.merge(sortedLeftArr, sortedRightArr);
  }

  sortArray(array) {
    const uniqArray = this.uniqArray(array);
    return this.mergeSort(uniqArray);
  }
  printTree(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.printTree(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.printTree(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const newTree = new Tree(arr);

// newTree.printTree();

console.log(newTree.root);
