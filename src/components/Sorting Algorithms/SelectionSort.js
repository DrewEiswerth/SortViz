export function getSelectionSortAnimations(mainArray) {

    const animations = [];

    // for every value in the array
    for (let i = 0; i < mainArray.length - 1; i++) {
        
        let smallestIndex = i;

        // check all other values at indices greater than that value
        for (let j = i + 1; j < mainArray.length; j++) {

            animations.push([smallestIndex, j]);      // first push to change color of elements being compared
            animations.push([smallestIndex, j]);      // second push to revert their colors

            if (mainArray[j] < mainArray[smallestIndex]) smallestIndex = j;   // if a value is smaller than the current
        }                                                                     // smallest value, save its index

        animations.push([i, smallestIndex, -1])  // third push to swap element heights, -1 used to indicate swap animation
        
        const temp = mainArray[i];                   
        mainArray[i] = mainArray[smallestIndex];  // swap current element with the smallest element
        mainArray[smallestIndex] = temp;
    }
    return animations;
}