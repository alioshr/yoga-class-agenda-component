import React from 'react'
import classes from "./RightArrow.module.css";

export default function RightArrow(props){
    return (
        <div className={classes.RightArrow}
             onClick={() => props.appNavigationHandler("increment")}/>

    )
}

