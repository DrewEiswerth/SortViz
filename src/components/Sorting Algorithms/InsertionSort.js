export function getInsertionSortAnimations(mainArray) {

    const animations = [];

    for (let i = 1; i < mainArray.length; i++) {

        let j = i;

        if (j === i) {  // ensures that first comparison animation added even if left value is already smaller
            animations.push([j, j - 1]);
            animations.push([j, j - 1]);
        }

        // insert j into sorted part of array, swapping with value to its left until in proper location
        while (j > 0 && mainArray[j] < mainArray[j - 1]) {

            if (j !== i) {
                animations.push([j, j - 1]);  // first push to change color of elements being compared
                animations.push([j, j - 1]);  // second push to revert their color
            }

            animations.push([j, j - 1, -1]);  // pushes array indicies to be swapped, -1 will be used to identifiy a swap animation

            const temp = mainArray[j];
            mainArray[j] = mainArray[j - 1];
            mainArray[j - 1] = temp;
            j--;
        }
    }
    return animations;
}