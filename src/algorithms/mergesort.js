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
        
        animations.push({
            
            leftIndex: leftIndex,
            leftValue: copyArray[leftIndex],
            middleIndex: middleIndex,
            leftValue: copyArray[middleIndex],
            rightIndex: rightIndex,
            rightValue: copyArray[rightIndex],

            swapLeft: false,
            swapRight: false,

            revertColor: false,
        })
        
        animations.push({

            leftIndex: leftIndex,
            leftValue: copyArray[leftIndex],
            middleIndex: middleIndex,
            leftValue: copyArray[middleIndex],
            rightIndex: rightIndex,
            rightValue: copyArray[rightIndex],

            swapLeft: false,
            swapRight: false,

            revertColor: false,
        })

        if (copyArray[i] <= copyArray[j]) {

            animations.push({
            
                leftIndex: leftIndex,
                leftValue: copyArray[leftIndex],
                middleIndex: middleIndex,
                leftValue: copyArray[middleIndex],
                rightIndex: rightIndex,
                rightValue: copyArray[rightIndex],
                
                swapLeft: true,
                swapRight: false,
            
                revertColor: false,
            })
            
            animations.push({
    
                leftIndex: leftIndex,
                leftValue: copyArray[leftIndex],
                middleIndex: middleIndex,
                leftValue: copyArray[middleIndex],
                rightIndex: rightIndex,
                rightValue: copyArray[rightIndex],
    
                swapLeft: true,
                swapRight: false,
            
                revertColor: true,
            })

            array[k++] = copyArray[i++];
        } else {

            animations.push({
            
                leftIndex: leftIndex,
                leftValue: copyArray[leftIndex],
                middleIndex: middleIndex,
                leftValue: copyArray[middleIndex],
                rightIndex: rightIndex,
                rightValue: copyArray[rightIndex],
    
                swapLeft: false,
                swapRight: true,
            
                revertColor: false,
            })
            
            animations.push({
    
                leftIndex: leftIndex,
                leftValue: copyArray[leftIndex],
                middleIndex: middleIndex,
                leftValue: copyArray[middleIndex],
                rightIndex: rightIndex,
                rightValue: copyArray[rightIndex],
    
                swapLeft: false,
                swapRight: true,
            
                revertColor: true,
            })

            array[k++] = copyArray[j++];
        }
    }

    while (i <= middleIndex) {

        animations.push({
            
            leftIndex: leftIndex,
            leftValue: copyArray[leftIndex],
            middleIndex: middleIndex,
            leftValue: copyArray[middleIndex],
            rightIndex: rightIndex,
            rightValue: copyArray[rightIndex],

            swapLeft: true,
            swapRight: false,
            
            revertColor: false,
        })
        
        animations.push({
            
            leftIndex: leftIndex,
            leftValue: copyArray[leftIndex],
            middleIndex: middleIndex,
            leftValue: copyArray[middleIndex],
            rightIndex: rightIndex,
            rightValue: copyArray[rightIndex],
            
            swapLeft: true,
            swapRight: false,
            
            revertColor: true,
        })

        array[k++] = copyArray[i++];
    }

    while (j <= rightIndex) {

        animations.push({
            
            leftIndex: leftIndex,
            leftValue: copyArray[leftIndex],
            middleIndex: middleIndex,
            leftValue: copyArray[middleIndex],
            rightIndex: rightIndex,
            rightValue: copyArray[rightIndex],

            swapLeft: false,
            swapRight: true,
            
            revertColor: false,
        })
        
        animations.push({
            
            leftIndex: leftIndex,
            leftValue: copyArray[leftIndex],
            middleIndex: middleIndex,
            leftValue: copyArray[middleIndex],
            rightIndex: rightIndex,
            rightValue: copyArray[rightIndex],
            
            swapLeft: false,
            swapRight: true,
            
            revertColor: true,
        })

        array[k++] = copyArray[j++]
    }

}