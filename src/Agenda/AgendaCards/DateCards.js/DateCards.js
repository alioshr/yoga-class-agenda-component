import React from 'react'
import classes from "./DateCards.module.css";

export default function DateCards(props) {
    let todayStyle;
    if (
        new Date(props.today).getDate() === new Date().getDate() &&
        new Date(props.today).getMonth() === new Date().getMonth()
    ) {
        todayStyle = { backgroundColor: "#f56157", color: "white" };
    }

    let nonMonthDates = {};
    if(new Date(props.today).getMonth() !== props.monthGetter) {
        nonMonthDates = {color: 'grey'}
    }

    return(
        <div className={classes.Day} style={Object.assign(nonMonthDates,todayStyle)}>
            {new Date(props.today).getDate()}
        </div>
    )
}