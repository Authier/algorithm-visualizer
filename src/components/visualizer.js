import React from "react";
import Bar from './bar.js';

import MergeSortAnimations from "../algorithms/mergesort.js";

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

    const [currentAlgorithm, setCurrentAlgorithm] = React.useState("Merge Sort")

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

            for (let i = 0; i < animation.length; i++) {
                const lookAt = animation[i]
                const arrayBar = document.getElementsByClassName('bar-container');
                
                const barLeftStyle = arrayBar[lookAt.leftIndex].style;
                const barMiddleStyle = arrayBar[lookAt.middleIndex].style;
                const barRightStyle = arrayBar[lookAt.rightIndex].style;

                
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
                <button id="button-extra">Extra</button>        
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