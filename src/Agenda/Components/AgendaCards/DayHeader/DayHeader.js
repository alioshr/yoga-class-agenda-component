import React from 'react'
import classes from "./DayHeader.module.css";

export default function DayHeader(props) {
    return  <div className={classes.DayHeader} style={props.style}>
        {props.children}
    </div>
}