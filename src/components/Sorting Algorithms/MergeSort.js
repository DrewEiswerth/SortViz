export function getMergeSortAnimations(mainArray) {
    const animations = [];
    const arrayCopy = mainArray.slice();
    mergeSortHelper(mainArray, 0, mainArray.length - 1, arrayCopy, animations);
    return animations;
}
  
function mergeSortHelper(mainArray, startIndex, endIndex, arrayCopy, animations) {
    if (startIndex === endIndex) return;

    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelper(arrayCopy, startIndex, middleIndex, mainArray, animations);     // recursively split array until
    mergeSortHelper(arrayCopy, middleIndex + 1, endIndex, mainArray, animations);   // only one element remains in array
    doMerge(mainArray, startIndex, middleIndex, endIndex, arrayCopy, animations);
}
  
function doMerge(mainArray, startIndex, middleIndex, endIndex, arrayCopy, animations) {

    let mainArrayIndex = startIndex;
    let i = startIndex;
    let j = middleIndex + 1;

    // compare leftmost remaining values of each side, and push smallest value until one half is exhausted
    while (i <= middleIndex && j <= endIndex) {
        animations.push([i, j]);                              // first push to change color of elements being compared
        animations.push([i, j]);                              // second push to revert their color

        if (arrayCopy[i] <= arrayCopy[j]) {
            animations.push([mainArrayIndex, arrayCopy[i], -1]);  // third push to signify a merge and to change height of element
            mainArray[mainArrayIndex++] = arrayCopy[i++];         // updates mainArray with the current merge
        } 
        else {
            animations.push([mainArrayIndex, arrayCopy[j], -1]);  // -1 used to indicate a swap animation
            mainArray[mainArrayIndex++] = arrayCopy[j++];
        }
    }
    // if all values from one side have been used, all remaining values from other side must be greater and can be merged
    while (i <= middleIndex) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([mainArrayIndex, arrayCopy[i], -1]);
        mainArray[mainArrayIndex++] = arrayCopy[i++];
    }
    while (j <= endIndex) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([mainArrayIndex, arrayCopy[j], -1]);
        mainArray[mainArrayIndex++] = arrayCopy[j++];
    }
}