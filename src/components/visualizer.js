import React from "react";
import Bar from './bar.js';

import MergeSortAnimations from "../algorithms/mergesort.js";
import QuickSortAnimation from "../algorithms/quicksort.js";

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

    const [currentAlgorithm, setCurrentAlgorithm] = React.useState("Quick Sort")

    const [randomArray, setRandomArray] = React.useState(RandomValues(numBars, min, max))
    const [displayBars, setDisplayBars] = React.useState(VisualizerHelper())

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
                />))
            }
        return (
            visualize
        )
    }

    function Animate () {

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
                        console.log(maxHeight)
                        arrayBars[arrayBars.length-1].style.height = `${maxHeight}px`; 
                    }, i * animationSpeed)
                } 
            }
        }
    }

    function ResetArray () {
        setRandomArray(RandomValues(numBars, min, max))
    }

    return (
        <div>
            <div className="visualizer-container">
                <div className="bar-container">
                    {displayBars}
                </div>
            </div>

            <div className="inputs">
                <button id="button-extra">Algorithms</button>        
                <button id="button-visualize" onClick={Animate}>Visualize</button>        
                <button id="button-reset" onClick={ResetArray}>Reset Array</button>  
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