import React from 'react'
import classes from "./LeftArrow.module.css";

export default function LeftArrow(props) {
    return (
        <div className={classes.LeftArrow}
             onClick={() => props.appNavigationHandler("decrement")}/>
    )
}

