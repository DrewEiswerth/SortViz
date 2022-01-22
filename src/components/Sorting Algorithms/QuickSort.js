export function getQuickSortAnimations(mainArray) {
    const animations = [];
    quickSortHelper(mainArray, 0, mainArray.length - 1, animations);
    return animations;
}

function quickSortHelper(mainArray, startIndex, endIndex, animations) {
    if (endIndex <= startIndex) return;

    const high = doPartition(mainArray, startIndex, endIndex, animations);
    quickSortHelper(mainArray, startIndex, high, animations);               // recursively splits array 
    quickSortHelper(mainArray, high + 1, endIndex, animations);             // and partitions each half 
}

// uses middle index as pivot of subarray to partition subarray into a half that it smaller than pivot and a half that is larger
function doPartition(mainArray, low, high, animations) {

    const midIndex = low + Math.floor((high - low) / 2);
    const pivot = mainArray[midIndex];
    let done = false;
    
    while (!done) {

        // finds value that is smaller than pivot
        while (mainArray[low] < pivot) {
            animations.push([low, midIndex]);  // first push to change color of elements being comapred
            animations.push([low, midIndex]);  // second push to revert their color
            low++;
        }
        // finds value that is larger than pivot
        while (pivot < mainArray[high]) {
            animations.push([high, midIndex]);
            animations.push([high, midIndex]);
            high--;
        }

        // if high and low have crossed, partition has been achieved, else swap low and high
        if (low >= high) done = true;
        else {
            animations.push([low, high, -1]);  // pushes array indicies to be swapped, -1 will be used to identifiy swap animation

            const temp = mainArray[low];
            mainArray[low++] = mainArray[high];
            mainArray[high--] = temp;
        }
    }
    return high;  // high is now the last index of the smaller partition
}