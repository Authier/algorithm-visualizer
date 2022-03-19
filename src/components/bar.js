
import React from "react";

export default function Bar (props) {
    
    const [styles, setStyles] = React.useState(
        {
            "backgroundImage":`${props.color}`,
            "height":`${props.val}px`,
            "width":`${props.width}px`
        }
    )
    return (
        <div 
        className="bar" 
        style={styles} 
        onMouseOver={() => (
            props.ShowValue(props.index)
            )}
        onClick={() => (
            props.SaveValue(props.index),
            props.Highlight(props.index)
            )}
        onMouseEnter={() => (
            props.Highlight(props.index)
            )}
        onMouseLeave={() => (
            props.Revert(props.index)
            )}
        />
    )
}