export default function HeapSortAnimation (currentArray) {
    const animations = [];
    // console.log(currentArray)

    heapSort(currentArray, animations);
    // console.log(animations)
    return (
        animations
    )
}

function leafFamily (index) {
    let parents = [index];
    let indexChange = index;
    while (indexChange > 1) {
        indexChange = Math.floor(indexChange / 2)
        parents.push(indexChange)
    }
    return (
        parents
    )
}

function heapify (array, animation) {
    for (let index = 0; index < array.length; index++) {
        let position = index + 1;  /* The plus 1 is to get accurate parent values */
        let parents = leafFamily(position)

        if (parents.length > 1) {
            let left = 0;
            let right = 1;
            
            while (right < parents.length) {
                let childIndex = parents[left] - 1;  /* The minus 1 is to undo the plus 1 */
                let parentIndex = parents[right] - 1;  /* The minus 1 is to undo the plus 1 */

                let childValue = array[childIndex];
                let parentValue = array[parentIndex];

                /* Store animations here (Minor swaps included by use of turnary operator */
                animation.push({
                    childIndex : childIndex, 
                    childValue : childValue,
                    parentIndex : parentIndex,
                    parentValue : parentValue,
                    isSwap: childValue <= parentValue ? false : true,
                    isMajorSwap: false,
                    isRepeat: false,
                })
                animation.push({
                    childIndex : childIndex, 
                    childValue : childValue,
                    parentIndex : parentIndex,
                    parentValue : parentValue,
                    isSwap: childValue <= parentValue ? false : true,
                    isMajorSwap: false,
                    isRepeat: true,
                })

                if (childValue <= parentValue) {
                    break;
                } else {

                    array[childIndex] = parentValue;
                    array[parentIndex] = childValue;
                    left++;
                    right++;
                }
            }
        }
    }
    
    return (
        array
        )
    }
    
    function heapSort (array, animation) {
        let adjustedLength = array.length;
        let adjustedArray = [...array];
        
        while (adjustedLength > 0) {
            let heapedArray = heapify(adjustedArray.slice(0, adjustedLength), animation);
            for (let index = 0; index < adjustedLength; index++) {
                adjustedArray[index] = heapedArray[index];
            }
            
            let firstIndex = 0;
            let lastLookedAtIndex = adjustedLength - 1;
            let firstNum = heapedArray[firstIndex];
            let lastLookedAtNum = heapedArray[lastLookedAtIndex];
            
            /* Swap Animation */
            animation.push({
                childIndex : firstIndex, 
                childValue : firstNum,
                parentIndex : lastLookedAtIndex,
                parentValue : lastLookedAtNum,
                isSwap: false,
                isMajorSwap: true,
                isRepeat: false,
            })
            
            animation.push({
                childIndex : firstIndex, 
                childValue : firstNum,
                parentIndex : lastLookedAtIndex,
                parentValue : lastLookedAtNum,
                isSwap: false,
                isMajorSwap: true,
                isRepeat: true,
            })
            
            adjustedArray[firstIndex] = lastLookedAtNum;
            adjustedArray[lastLookedAtIndex] = firstNum;  /* Could color coat this to show the finished ones. */
            
            adjustedLength--;
        }
        
        return (
        animation
    )

}