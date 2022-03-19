export default function BubbleSortAnimation (currentArray) {
    const animations = [];

    BubbleSortHelper(currentArray, animations)

    return (
        animations
    )
}

function BubbleSortHelper (array, animations) {
    
    let lookAtLength = array.length;

    while (lookAtLength > 0) {
        let leftWindowIndex = 0;
        let rightWindowIndex = 1;

        while (rightWindowIndex < lookAtLength) {
            /* Left and Right windows are sliding automatically at end of this while loop */
            let leftWindowValue = array[leftWindowIndex]; 
            let rightWindowValue = array[rightWindowIndex]; 
        
            /* Animation with turnary operator for swaps and for major swap */

            animations.push({
                leftWindowIndex: leftWindowIndex,
                leftWindowValue: leftWindowValue,
                rightWindowIndex: rightWindowIndex,
                rightWindowValue: rightWindowValue,
                isSwap: leftWindowValue > rightWindowValue ? true : false,
                isEnd: rightWindowIndex - 1 < lookAtLength ? true : false,
                isRepeat: false,
            })
            animations.push({
                leftWindowIndex: leftWindowIndex,
                leftWindowValue: leftWindowValue,
                rightWindowIndex: rightWindowIndex,
                rightWindowValue: rightWindowValue,
                isSwap: leftWindowValue > rightWindowValue ? true : false,
                isEnd: rightWindowIndex - 1 < lookAtLength ? true : false,
                isRepeat: true,
            })

            if (leftWindowValue > rightWindowValue) {
                array[leftWindowIndex] = rightWindowValue;
                array[rightWindowIndex] = leftWindowValue;
            }

            leftWindowIndex++;
            rightWindowIndex++;
        }

        lookAtLength--;
    }

    return (
        array
    )

}