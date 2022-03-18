export default function QuickSortAnimation (currentArray) {
    const animations = [];
    currentArray.push(999999999)
    const copyArray = [...currentArray];
    quickSort(currentArray, copyArray, 0, currentArray.length -1, animations, currentArray.length - 1);
    // currentArray.pop()
    return (
        animations
    )
}

function quickSort (array, copyArray, low, high, animations, max_length) {
    let leftIndex = low + 1;
    let rightIndex = high;

    const initial = array[low];

    if (high - low < 1) {
        return;
    }

    while (leftIndex < rightIndex) {

        animations.push(
            {
                swapBoolean : false,
                majorSwap : false,
                repeat : false,
                comparisonIndex : low,
                comparisonValue : initial,
                leftIndex : leftIndex,
                leftValue : array[leftIndex],
                rightIndex : rightIndex, 
                rightValue : array[rightIndex],
            }
        )

        animations.push(
            {
                swapBoolean : false,
                majorSwap : false,
                repeat : true,
                comparisonIndex : low,
                comparisonValue : initial,
                leftIndex : leftIndex,
                leftValue : array[leftIndex],
                rightIndex : rightIndex, 
                rightValue : array[rightIndex],
            }
        )

        if (array[leftIndex] > initial) {
            if (array[rightIndex] < initial) {

                animations.push(
                    {
                        swapBoolean : true,
                        majorSwap : false,
                        repeat : false,
                        comparisonIndex : low,
                        comparisonValue : initial,
                        leftIndex : leftIndex,
                        leftValue : array[leftIndex],
                        rightIndex : rightIndex, 
                        rightValue : array[rightIndex],
                    }
                )

                animations.push(
                    {
                        swapBoolean : true,
                        majorSwap : false,
                        repeat : true,
                        comparisonIndex : low,
                        comparisonValue : initial,
                        leftIndex : leftIndex,
                        leftValue : array[leftIndex],
                        rightIndex : rightIndex, 
                        rightValue : array[rightIndex],
                    }
                )

                array[rightIndex] = copyArray[leftIndex];
                array[leftIndex] = copyArray[rightIndex];

            } else {
                rightIndex--;
            }
        } else {
            leftIndex++;
        }
    }

    animations.push(
        {
            swapBoolean : false,
            majorSwap : true,
            repeat : false,
            comparisonIndex : low,
            comparisonValue : initial,
            leftIndex : leftIndex,
            leftValue : array[leftIndex],
            rightIndex : rightIndex - 1, 
            rightValue : array[rightIndex - 1],
        }
    )

    animations.push(
        {
            swapBoolean : false,
            majorSwap : true,
            repeat : true,
            comparisonIndex : low,
            comparisonValue : initial,
            leftIndex : leftIndex,
            leftValue : array[leftIndex],
            rightIndex : rightIndex - 1, 
            rightValue : array[rightIndex - 1],
        }
    )

    array[low] = array[rightIndex - 1];
    array[rightIndex - 1] = initial;

    let copy = [...array];

    quickSort(array, copy, low, rightIndex - 1, animations, max_length);
    quickSort(array, copy, rightIndex, high, animations, max_length);

}