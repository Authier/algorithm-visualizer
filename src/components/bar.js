import React from "react";

export default function Bar (props) {
    
    let styles = {
        "backgroundImage":`${props.color}`,
        "height":`${props.val}px`,
        "width":`${props.width}px`
    }

    return (
        <div className="bar" style={styles} />
    )
}