import React from 'react'
import classes from './MonthTeller.module.css'

export default function MonthTeller(props) {
    let calendarViewTypeStyle;
    if(props.calendarViewType === "FullCalendar") {
        calendarViewTypeStyle = {left: "5px"}
    } else {
        calendarViewTypeStyle = {right: "5px"}
    }
    return (
        <div className={classes.MonthTeller} style={Object.assign(calendarViewTypeStyle, props.style)}>
            {props.newDatesToVerboseHandler(props.monthGetter, "renderMonth").slice(0,3)}
            <div className={classes.LowerBorder} style={props.innerStyle}/>
        </div>
    )
}