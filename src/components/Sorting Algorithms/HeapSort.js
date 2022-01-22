export function getHeapSortAnimations(mainArray) {
    const animations = [];

    const arrayLength = mainArray.length;
    const lastParentIndex = Math.floor(arrayLength / 2) - 1;

    // maxheaps all parent nodes from bottom of tree up
    for (let i = lastParentIndex; i >= 0; i--) {
        heapify(mainArray, arrayLength, i, animations);
    }

    // places the largest element, the root of the maxheap, in the back of the array,
    // and then heapifies the tree except for the elements it has already placed in the back
    // resulting in the array being sorted in ascending order
    for (let i = arrayLength - 1; i > 0; i--) {
        animations.push([0, i, -1]);

        const temp = mainArray[i];
        mainArray[i] = mainArray[0];
        mainArray[0] = temp;

        heapify(mainArray, i, 0, animations);
    }

    return animations;
}

// creates a maxheap, where root node is greater than or equal to its children
function heapify(mainArray, arrayLength, i, animations) {

    let largest = i;         // first assumes root is largest
    const left = 2 * i + 1;  // finds left child index of root
    const right = 2 *i + 2;  // finds right child index of root

    // checks if left child exists and is larger than root
    if (left < arrayLength && mainArray[i] < mainArray[left]) {
        animations.push([largest, left]);
        animations.push([largest, left]);
        largest = left;
    }

    // checks if right child exists and is larger than both root and left child
    if (right < arrayLength && mainArray[largest] < mainArray[right]) {
        animations.push([largest, right]);
        animations.push([largest, right]);
        largest = right;
    }

    // if root is not largest, swaps values of root and largest child
    if (largest !== i) {  
        animations.push([i, largest, -1]);

        const temp = mainArray[i];
        mainArray[i] = mainArray[largest];
        mainArray[largest] = temp;

        // since root and largest child have switched, this recursively heapifies 
        // tree so switched smaller value is sorted to correct location beneath it
        heapify(mainArray, arrayLength, largest, animations);
    }
}