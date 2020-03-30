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

    return(
        <div className={classes.Day} style={Object.assign(props.nonMonthDates,todayStyle)}>
            {new Date(props.today).getDate()}
        </div>
    )
}