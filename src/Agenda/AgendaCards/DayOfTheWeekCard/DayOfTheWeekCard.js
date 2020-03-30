import React from 'react'
import classes from './DayOfTheWeekCard.module.css'

export default function DayOfTheWeekCard(props) {
return (
    <div className={classes.DayOfTheWeek}>
        {props
            .newDatesToVerboseHandler(
                new Date(props.today),
                "renderWeekDay"
            )
            .slice(0, 3)}
    </div>
)
}