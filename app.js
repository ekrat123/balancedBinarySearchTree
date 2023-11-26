class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array = null) {
    this.root = array === null ? null : this.buildTree(this.sortArray(array));
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  uniqArray(array) {
    const uniqArray = [];
    for (let i = 0; i < array.length; i++) {
      if (uniqArray.indexOf(array[i]) === -1) {
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
    const sortedLeftArr = this.mergeSort(leftArr);
    const sortedRightArr = this.mergeSort(rightArr);
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

  insert(value) {
    this.root = this._insert(this.root, value);
  }

  _insert(root, value) {
    if (root === null) {
      return new Node(value);
    }

    if (value < root.data) {
      root.left = this._insert(root.left, value);
    } else {
      root.right = this._insert(root.right, value);
    }

    return root;
  }

  delete(value) {
    this.root = this._delete(this.root, value);
  }

  _delete(root, value) {
    if (root === null) {
      return root; // Value not found
    }

    // If the value to be deleted is smaller than the root's value,
    // then it lies in the left subtree.
    if (value < root.data) {
      root.left = this._delete(root.left, value);
    }
    // If the value to be deleted is greater than the root's value,
    // then it lies in the right subtree.
    else if (value > root.data) {
      root.right = this._delete(root.right, value);
    }
    // If the value is the same as the root's value,
    // then this is the node to be deleted.
    else {
      // Node with only one child or no child
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      // Node with two children
      // Get the inorder successor (smallest node in the right subtree)
      root.data = this.findMinValue(root.right);

      // Delete the inorder successor
      root.right = this._delete(root.right, root.data);
    }

    return root;
  }

  findMinValue(node) {
    let minValue = node.data;
    while (node.left !== null) {
      minValue = node.left.data;
      node = node.left;
    }
    return minValue;
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const newTree = new Tree(arr);
newTree.printTree();
newTree.delete(8);

//newTree.insert();
newTree.printTree();
// console.log(newTree);
