import React, { useState, useEffect, useRef } from 'react'
import { getMergeSortAnimations } from '../Sorting Algorithms/MergeSort'
import { getSelectionSortAnimations } from '../Sorting Algorithms/SelectionSort'
import { getInsertionSortAnimations } from '../Sorting Algorithms/InsertionSort'
import { getQuickSortAnimations } from '../Sorting Algorithms/QuickSort'
import { getHeapSortAnimations } from '../Sorting Algorithms/HeapSort'
import { ButtonBar } from '../ButtonBar/ButtonBar'
import './SortingVisualizer.css'

export function SortingVisualizer() {

    useEffect(() => {resetArray()}, []);

    const [mainArray, setValArray] = useState([]);
    const chartMargin = 625;  // desired pixels to bottom of chart from top of window

    const resetButtonRef = useRef(null);
    const selectionButtonRef = useRef(null);
    const insertionButtonRef = useRef(null);
    const quickButtonRef = useRef(null);
    const heapButtonRef = useRef(null);
    const mergeButtonRef = useRef(null);

    let selectionClicked = false;
    let insertionClicked = false;
    let quickClicked = false;
    let heapClicked = false;
    let mergeClicked = false;

    function resetArray() {
        selectionClicked = false;
        selectionButtonRef.current.disabled = false;
        selectionButtonRef.current.style.color = "white";
        selectionButtonRef.current.onmouseover = ()=> selectionButtonRef.current.style.color = "rgb(44, 100, 255)";
        selectionButtonRef.current.onmouseout = ()=> selectionButtonRef.current.style.color = "white";

        insertionClicked = false;
        insertionButtonRef.current.disabled = false;
        insertionButtonRef.current.style.color = "white";
        insertionButtonRef.current.onmouseover = ()=> insertionButtonRef.current.style.color = "rgb(172, 70, 255)";
        insertionButtonRef.current.onmouseout = ()=> insertionButtonRef.current.style.color = "white";

        quickClicked = false;
        quickButtonRef.current.disabled = false;
        quickButtonRef.current.style.color = "white";
        quickButtonRef.current.onmouseover = ()=> quickButtonRef.current.style.color = "rgb(233, 42, 42)";
        quickButtonRef.current.onmouseout = ()=> quickButtonRef.current.style.color = "white";

        heapClicked = false;
        heapButtonRef.current.disabled = false;
        heapButtonRef.current.style.color = "white";
        heapButtonRef.current.onmouseover = ()=> heapButtonRef.current.style.color = "rgb(252, 123, 49)";
        heapButtonRef.current.onmouseout = ()=> heapButtonRef.current.style.color = "white";

        mergeClicked = false;
        mergeButtonRef.current.disabled = false;
        mergeButtonRef.current.style.color = "white";
        mergeButtonRef.current.onmouseover = ()=> mergeButtonRef.current.style.color = "rgb(255, 251, 36)";
        mergeButtonRef.current.onmouseout = ()=> mergeButtonRef.current.style.color = "white";

        const newArray = [];
        for (let i = 0; i < 130; i++) newArray.push(getRandomInt(5, 500));
        setValArray(newArray);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function performAnimations(algorithm, color, speed) {

        resetButtonRef.current.disabled = true;
        selectionButtonRef.current.disabled = true;
        insertionButtonRef.current.disabled = true;
        quickButtonRef.current.disabled = true;
        heapButtonRef.current.disabled = true;
        mergeButtonRef.current.disabled = true;

        let animations = [];
        const allBars = document.getElementsByClassName('bar');
        let compareCount = 0;
        let curAnimationIndex = -1;

        switch (algorithm) {
            case "Selection":
                animations = getSelectionSortAnimations(mainArray);
                selectionButtonRef.current.style.color = "rgb(44, 100, 255)";
                selectionClicked = true;
                break;
            case "Insertion":
                animations = getInsertionSortAnimations(mainArray);
                insertionButtonRef.current.style.color = "rgb(172, 70, 255)";
                insertionClicked = true;
                break;
            case "Quick":
                animations = getQuickSortAnimations(mainArray);
                quickButtonRef.current.style.color = "rgb(233, 42, 42)";
                quickClicked = true;
                break;
            case "Heap":
                animations = getHeapSortAnimations(mainArray);
                heapButtonRef.current.style.color = "rgb(252, 123, 49)";
                heapClicked = true;
                break;
            case "Merge":
                animations = getMergeSortAnimations(mainArray);
                mergeButtonRef.current.style.color = "rgb(255, 251, 36)";
                mergeClicked = true;
                break;
            default:
                animations = [];
        }

        if (!selectionClicked) selectionButtonRef.current.style.color = "rgb(165, 165, 165)";
        if (!insertionClicked) insertionButtonRef.current.style.color = "rgb(165, 165, 165)";
        if (!quickClicked) quickButtonRef.current.style.color = "rgb(165, 165, 165)";
        if (!heapClicked) heapButtonRef.current.style.color = "rgb(165, 165, 165)";
        if (!mergeClicked) mergeButtonRef.current.style.color = "rgb(165, 165, 165)";
        
        for (let i = 0; i < animations.length; i++) {

            const animation = animations[i]
            curAnimationIndex++;

            if (animation.length === 2) {  // all animations with 2 values are comparisons
                compareCount++;

                const currentColor = compareCount % 2 === 1 ? color : "rgb(70, 219, 102)";  // every odd comparison changes bar to chosen color
                const [firstBarIndex, secondBarIndex] = animation;

                setTimeout(() => {
                    allBars[firstBarIndex].style.backgroundColor = currentColor;
                    allBars[secondBarIndex].style.backgroundColor = currentColor;
                    if (i === animations.length - 1) resetButtonRef.current.disabled = false;
                  }, curAnimationIndex * speed);
            }
            else {                        // all animations with 3 values are swaps
                compareCount = 0;

                if (mergeClicked) {
                    const [barIndex, newHeight] = animation;

                    setTimeout(() => {
                        allBars[barIndex].style.height = `${newHeight}px`;
                        allBars[barIndex].style.marginTop = `${chartMargin - newHeight}px`;
                        if (i === animations.length - 1) resetButtonRef.current.disabled = false;
                      }, curAnimationIndex * speed);
                }
                else {

                    const [firstBarIndex, secondBarIndex] = animation.slice(0, 2);

                    setTimeout(() => {
                        const temp = allBars[firstBarIndex].offsetHeight;
                        const newHeight = allBars[secondBarIndex].offsetHeight;

                        allBars[firstBarIndex].style.height = `${newHeight}px`;
                        allBars[secondBarIndex].style.height = `${temp}px`;

                        allBars[firstBarIndex].style.marginTop = `${chartMargin - newHeight}px`;
                        allBars[secondBarIndex].style.marginTop = `${chartMargin - temp}px`;

                        if (i === animations.length - 1) resetButtonRef.current.disabled = false;

                      }, curAnimationIndex * speed);
                }
            }
        }
    }

    return (
        <div className="bar-container">
            <ButtonBar
                callReset={()=>resetArray()}
                callSelection={()=>performAnimations("Selection", "rgb(44, 100, 255)", 1.2)}
                callInsertion={()=>performAnimations("Insertion", "rgb(172, 70, 255)", 1.5)}
                callQuick={()=>performAnimations("Quick", "rgb(233, 42, 42)", 13)}
                callMerge={()=>performAnimations("Merge", "rgb(255, 251, 36)", 7.3)}
                callHeap={()=>performAnimations("Heap", "rgb(252, 123, 49)", 7.5)} 
                
                forwardResetRef={resetButtonRef}
                forwardSelectionRef={selectionButtonRef}
                forwardInsertionRef={insertionButtonRef}
                forwardQuickRef={quickButtonRef}
                forwardHeapRef={heapButtonRef}
                forwardMergeRef={mergeButtonRef} />
                
            {mainArray.map((val, index) => {
                return <div 
                         className="bar" 
                         key={index}
                         style={{height: `${val}px`, marginTop: `${chartMargin - val}px`}}>
                       </div>
            })}
        </div>
    )
}