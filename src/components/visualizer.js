import React from "react";
import Bar from './bar.js';
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai'

import MergeSortAnimations from "../algorithms/mergesort.js";
import QuickSortAnimation from "../algorithms/quicksort.js";
import HeapSortAnimation from "../algorithms/heapsort.js";
import BubbleSortAnimation from "../algorithms/bubblesort.js";

import {nanoid} from "nanoid";

function RandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function RandomValues (n, min, max) {
    
    let array = []

    for (let i = 0; i < n; i++) {
        array.push(RandomNumber(min, max))
    }

    return (
        array
    )
}

export default function Visualizer () {

    const [numBars, setNumBars] = React.useState(100);
    const [min, setMin] = React.useState(10);
    const [max, setMax] = React.useState(500);
    const [width, setWidth] = React.useState(10)
    const [animationSpeed, setAnimationSpeed] = React.useState(10)

    const [currentAlgorithm, setCurrentAlgorithm] = React.useState("Bubble Sort")

    const [randomArray, setRandomArray] = React.useState(RandomValues(numBars, min, max))
    const [displayBars, setDisplayBars] = React.useState(VisualizerHelper())

    const sortingList = ["Bubble Sort", "Heap Sort", "Merge Sort", "Quick Sort"];
    const [isDropActive, setIsDropActive] = React.useState(false)

    const [lookAtVal, setLookAtVal] = React.useState("Hovered")
    const [savedLookAtVal, setSavedLookAtVal] = React.useState("Saved")

    /* Changes display bars each time the random array is changed. This makes it easier to render. */
    React.useEffect(() => {
        setDisplayBars(VisualizerHelper)
    }, [randomArray])

    function VisualizerHelper () {
        let visualize = [];
        
        for (let i = 0; i < randomArray.length; i++) {
            let randomId = nanoid();
            visualize.push((<Bar
                key={randomId}
                id={randomId}
                color={"linear-gradient(rgb(216, 102, 102), rgb(205, 94, 94))"}
                width={width}
                val={randomArray[i]}
                index={i}
                ShowValue={ShowValue}
                SaveValue={SaveValue}
                Highlight={Highlight}
                Revert={Revert}
                />))
            }
        return (
            visualize
        )
    }

    function Animate () {

        if (currentAlgorithm === "Bubble Sort") {
            let animations = BubbleSortAnimation(randomArray);
            const arrayBars = document.getElementsByClassName('bar');
            
            for (let i = 0; i < animations.length; i++) {
                const currentAnimation = animations[i];
                
                let barLeftStyle = arrayBars[currentAnimation.leftWindowIndex].style; 
                let barRightStyle = arrayBars[currentAnimation.rightWindowIndex].style; 

                const color = currentAnimation.isRepeat ? 
                "linear-gradient(rgb(216, 102, 102), rgb(205, 94, 94))" :
                "linear-gradient(rgb(94, 1, 1), rgb(81, 1, 1))";
                const colorSwap = currentAnimation.isRepeat ?
                "linear-gradient(rgb(216, 102, 102), rgb(205, 94, 94))" :
                "linear-gradient(rgb(0, 0, 0), rgb(50, 41, 41))";
                const mainSwapColor = currentAnimation.isRepeat ?
                "linear-gradient(rgb(216, 102, 102), rgb(205, 94, 94))" :
                "linear-gradient(rgb(160, 191, 67), rgb(169, 169, 28))";

                const finishColor = "linear-gradient(rgb(55, 204, 215), rgb(36, 153, 203, 0.6))";

                if (currentAnimation.isSwap) {
                    setTimeout(() => {
                        barLeftStyle.backgroundImage = color;
                        barLeftStyle.height = `${currentAnimation.rightWindowValue}px`;
                        barRightStyle.backgroundImage = color;
                        barRightStyle.height = `${currentAnimation.leftWindowValue}px`;
                    }, i * animationSpeed)
                } else {
                    setTimeout(() => {
                        barLeftStyle.backgroundImage = color;
                        barRightStyle.backgroundImage = color;
                    }, i * animationSpeed)
                }
                if (currentAnimation.isEnd) {
                    setTimeout(() => {
                        barRightStyle.backgroundImage = finishColor;
                    }, i * animationSpeed)
                }
                if (i === animations.length - 1) {
                    setTimeout(() => {
                        end();
                    }, i * animationSpeed)
                } 

            }
        }

        if (currentAlgorithm === "Heap Sort") {
            let animations = HeapSortAnimation(randomArray);
            const arrayBars = document.getElementsByClassName('bar');
            

            for (let i = 0; i < animations.length; i++) {
                const currentAnimation = animations[i];

                const color = currentAnimation.isRepeat ? 
                "linear-gradient(rgb(216, 102, 102), rgb(205, 94, 94))" :
                "linear-gradient(rgb(94, 1, 1), rgb(81, 1, 1))";
                const colorSwap = currentAnimation.isRepeat ?
                "linear-gradient(rgb(216, 102, 102), rgb(205, 94, 94))" :
                "linear-gradient(rgb(0, 0, 0), rgb(50, 41, 41))";
                const mainSwapColor = currentAnimation.isRepeat ?
                "linear-gradient(rgb(216, 102, 102), rgb(205, 94, 94))" :
                "linear-gradient(rgb(160, 191, 67), rgb(169, 169, 28))";

                const finishColor = "linear-gradient(rgb(55, 204, 215), rgb(36, 153, 203, 0.6))";

                let barOneStyle = arrayBars[currentAnimation.childIndex].style;  /* Also known as the "child" bar */
                let barTwoStyle = arrayBars[currentAnimation.parentIndex].style;  /* Also known as the "parent" bar */
                
                if (currentAnimation.isSwap) {
                    setTimeout(() => {
                        barOneStyle.backgroundImage = colorSwap;
                        barOneStyle.height = `${currentAnimation.parentValue}px`;
                        barTwoStyle.backgroundImage = colorSwap;
                        barTwoStyle.height = `${currentAnimation.childValue}px`;
                    }, i * animationSpeed)
                } else if (currentAnimation.isMajorSwap) {
                    setTimeout(() => {
                        barOneStyle.backgroundImage = mainSwapColor;
                        barOneStyle.height = `${currentAnimation.parentValue}px`;
                        barTwoStyle.backgroundImage = finishColor;
                        barTwoStyle.height = `${currentAnimation.childValue}px`;
                    }, i * animationSpeed)
                } else {
                    setTimeout(() => {
                        barOneStyle.backgroundImage = color;
                        barTwoStyle.backgroundImage = color;
                    }, i * animationSpeed)
                }

                if (i === animations.length - 1) {
                    setTimeout(() => {
                        end();
                    }, i * animationSpeed)
                } 

            }

        }

        if (currentAlgorithm === "Merge Sort") {
            let animation = MergeSortAnimations(randomArray)
            const arrayBars = document.getElementsByClassName('bar');

            for (let i = 0; i < animation.length; i++) {
                const isColorChange = i % 3 !== 2;

                if (isColorChange) {
                    const [barOneIndex, barTwoIndex] = animation[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;
                    const color = i % 3 === 0 ? 
                    "linear-gradient(rgb(94, 1, 1), rgb(81, 1, 1))" :
                    "linear-gradient(rgb(216, 102, 102), rgb(205, 94, 94))"
                    setTimeout( () => {
                        barOneStyle.backgroundImage = color;
                        barTwoStyle.backgroundImage = color;
                    }, i * animationSpeed)

                } else {
                    setTimeout(() => {
                        const [barOneIndex, newHeight] = animation[i];
                        const barOneStyle = arrayBars[barOneIndex].style;
                        barOneStyle.height = `${newHeight}px`;
                    }, i * animationSpeed)
                }

                if (i === animation.length - 1) {
                    setTimeout(() => {
                        end();
                    }, i * animationSpeed)
                } 
            }

        }

        if (currentAlgorithm === "Quick Sort") {
            const maxHeight = Math.max(...randomArray);
            const animations = QuickSortAnimation(randomArray);
            const arrayBars = document.getElementsByClassName('bar');

            for (let i = 0; i < animations.length; i++) {
                // console.log(animations[i])
                const currentAnimation = animations[i]; 

                const color = currentAnimation.repeat ? 
                "linear-gradient(rgb(216, 102, 102), rgb(205, 94, 94))" :
                "linear-gradient(rgb(94, 1, 1), rgb(81, 1, 1))";
                const colorSwap = currentAnimation.repeat ?
                "linear-gradient(rgb(216, 102, 102), rgb(205, 94, 94))" :
                "linear-gradient(rgb(0, 0, 0), rgb(50, 41, 41))";
                const mainSwapColor = currentAnimation.repeat ?
                "linear-gradient(rgb(216, 102, 102), rgb(205, 94, 94))" :
                "linear-gradient(rgb(160, 191, 67), rgb(169, 169, 28))";
                
                const barLookAtColor = "linear-gradient(rgb(98, 10, 99), rgb(93, 10, 109))"

                const barCamparisonStyle = arrayBars[currentAnimation.comparisonIndex].style;

                if (currentAnimation.rightIndex >= numBars) {
                    const barLeftStyle = arrayBars[currentAnimation.leftIndex].style;
                    if (currentAnimation.majorSwap) {
                        setTimeout(() => {
                            barCamparisonStyle.height = `${currentAnimation.rightValue}px`;
                            barCamparisonStyle.backgroundImage = mainSwapColor;
                        }, i * animationSpeed);
                    } else if (currentAnimation.swapBoolean) {
                        setTimeout(() => {
                            barLeftStyle.height = `${currentAnimation.rightValue}px`;
                            barLeftStyle.backgroundImage = colorSwap;
                        }, i * animationSpeed);
                    } else {
                        setTimeout(() => {
                            barCamparisonStyle.backgroundImage = barLookAtColor;
                            barLeftStyle.backgroundImage = color;
                        }, i * animationSpeed);
                    }
                } else if (currentAnimation.leftIndex < numBars) {
                    const barLeftStyle = arrayBars[currentAnimation.leftIndex].style;
                    const barRightStyle = arrayBars[currentAnimation.rightIndex].style;
                    if (currentAnimation.majorSwap) {
                        setTimeout(() => {
                            if (currentAnimation.length - 1 !== i) {
                                barCamparisonStyle.height = `${currentAnimation.rightValue}px`;
                                barRightStyle.height = `${currentAnimation.comparisonValue}px`;
                                barCamparisonStyle.backgroundImage = mainSwapColor;
                                barRightStyle.backgroundImage = mainSwapColor;
                            } else {
                                barCamparisonStyle.height = `${currentAnimation.leftValue}px`;
                                barLeftStyle.height = `${currentAnimation.comparisonValue}px`;
                                barCamparisonStyle.backgroundImage = mainSwapColor;
                                barLeftStyle.backgroundImage = mainSwapColor;
                            }
                        }, i * animationSpeed);
                    } else if (currentAnimation.swapBoolean) {
                        setTimeout(() => {
                            barLeftStyle.height = `${currentAnimation.rightValue}px`;
                            barRightStyle.height = `${currentAnimation.leftValue}px`;
                            barLeftStyle.backgroundImage = colorSwap;
                            barRightStyle.backgroundImage = colorSwap;
                        }, i * animationSpeed);
                    } else {
                        setTimeout(() => {
                            barCamparisonStyle.backgroundImage = barLookAtColor;
                            barLeftStyle.backgroundImage = color;
                            barRightStyle.backgroundImage = color;
                        }, i * animationSpeed);
                    }
                }
                if (i === animations.length - 1) {
                    setTimeout(() => {
                        const arrayBars = document.getElementsByClassName('bar');
                        arrayBars[arrayBars.length-1].style.height = `${maxHeight}px`;
                        end();
                    }, i * animationSpeed)
                } 
            }
        }
        function end () {
            const endArrayBars = document.getElementsByClassName('bar'); 
            const originalColor = "linear-gradient(rgb(216, 102, 102), rgb(205, 94, 94))";
            const goldGlow = "linear-gradient(rgb(225,169,95), rgb(255,204,51))";
            const animationLength = 2000;
            const animationTurnOffLength = 3000;
            const waitTime = animationSpeed * 0;
    
            for (let i = 0; i < endArrayBars.length; i++) {
                const currentBar = endArrayBars[i];
                setTimeout(() => {
                    currentBar.style.backgroundImage = goldGlow;
                }, waitTime + i * animationLength / endArrayBars.length)
                setTimeout(() => {
                    currentBar.style.backgroundImage = originalColor;
                }, waitTime + animationTurnOffLength)
            }
        }

    }

    function ResetArray () {
        setRandomArray(RandomValues(numBars, min, max))
    }

    function ShowValue (index) {
        const arrayBars = document.getElementsByClassName('bar');
        setLookAtVal(arrayBars[index].style.height)
    }
    
    function SaveValue (index) {
        const arrayBars = document.getElementsByClassName('bar');
        setSavedLookAtVal(arrayBars[index].style.height)
    }

    function Highlight (index) {
        const arrayBars = document.getElementsByClassName('bar');
        arrayBars[index].style.borderColor = "white";
    }

    function Revert (index) {
        const arrayBars = document.getElementsByClassName('bar');
        arrayBars[index].style.borderColor = "black";
    }

    return (
        <div>
            <div className="visualizer-container">
                <div className="bar-container">
                    {displayBars}
                </div>
            </div>
            <div className="inputs">
                <div className="display-values-container">
                    <h1>
                        {savedLookAtVal}
                    </h1>
                </div>
                <div>
                    {isDropActive && 
                        <div className="dropdown-items">
                            {sortingList.map(index => {
                            return (
                            <div 
                                className="dropdown-item"
                                onClick={() => {
                                    setCurrentAlgorithm(index)
                                    setIsDropActive(!isDropActive)
                                }}
                                key={index}>
                                {index}
                            </div>
                            )
                            })}
                        </div>
                    }                
                    <button id="button-extra" onClick={() => setIsDropActive(!isDropActive)}>
                        <div className="button-left">
                            {currentAlgorithm}
                        </div> 
                        <div className="button-right">
                            {isDropActive ? <AiFillCaretUp /> : <AiFillCaretDown />}
                        </div>
                    </button>
                </div>
                <button id="button-visualize" onClick={Animate}>Visualize</button>        
                <button id="button-reset" onClick={ResetArray}>Reset Array</button>
                <div className="display-values-container">
                    <h1>
                        {lookAtVal}
                    </h1>
                </div>
            </div>

            <div className="numberInputs">
                <label htmlFor="n-bars">Number of Bars: </label>
                <input 
                id="n-bars"
                type="number" 
                placeholder="Insert Number of Bars"
                defaultValue={100}
                onChange={() => setNumBars(Number(document.getElementById("n-bars").value))}
                ></input>      
                <label htmlFor="min">Min Value: </label>
                <input 
                id="min"
                type="number" 
                placeholder="Min Value"
                defaultValue={10}
                onChange={() => setMin(Number(document.getElementById("min").value))}
                ></input>      
                <label htmlFor="max">Max Value: </label>
                <input 
                id="max"
                type="number" 
                placeholder="Max Value"
                defaultValue={500}
                onChange={() => setMax(Number(document.getElementById("max").value))}
                ></input>      
                <label htmlFor="max">Bar Width (Pixels): </label>
                <input 
                id="width"
                type="number" 
                placeholder="Bar Width"
                defaultValue={10}
                onChange={() => setWidth(Number(document.getElementById("width").value))}
                ></input>      
                <label htmlFor="max">Animation Speed (MS): </label>
                <input 
                id="speed"
                type="number" 
                placeholder="Speed in Millisecond"
                defaultValue={10}
                onChange={() => setAnimationSpeed(Number(document.getElementById("speed").value))}
                ></input>      
            </div>

        </div>
    )
}