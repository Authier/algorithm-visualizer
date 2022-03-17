import React from "react";

export default function MergeSortAnimations(currentArray) {
    let copyArray = [...currentArray]
    let animations = []
    mergeSortHelper(currentArray, copyArray, 0, currentArray.length - 1, animations)
    
    return (
        animations
    )
}

function mergeSortHelper(array, copyArray, leftIndex, rightIndex, animations) {
    if (leftIndex === rightIndex) return;
    const middleIndex = Math.floor((leftIndex + rightIndex) / 2)
    mergeSortHelper(copyArray, array, leftIndex, middleIndex, animations);
    mergeSortHelper(copyArray, array, middleIndex + 1, rightIndex, animations);

    doMerge(array, copyArray, leftIndex, middleIndex, rightIndex, animations)
}

function doMerge (array, copyArray, leftIndex, middleIndex, rightIndex, animations) {
    let k = leftIndex;
    let i = leftIndex;
    let j = middleIndex + 1;

    while (i <= middleIndex && j <= rightIndex) {
        
        animations.push([i, j])
        animations.push([i, j])

        if (copyArray[i] <= copyArray[j]) {
            animations.push([k, copyArray[i]])
            array[k++] = copyArray[i++];
        } else {
            animations.push([k, copyArray[j]])
            array[k++] = copyArray[j++];
        }
    }

    while (i <= middleIndex) {
        animations.push([i, i])
        animations.push([i, i])
        animations.push([k, copyArray[i]])
        array[k++] = copyArray[i++];
    }
    
    while (j <= rightIndex) {
        animations.push([j, j])
        animations.push([j, j])
        animations.push([k, copyArray[j]])
        array[k++] = copyArray[j++]
    }

}