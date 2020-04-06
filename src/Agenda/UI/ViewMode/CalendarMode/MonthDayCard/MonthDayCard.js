import React from 'react'
import classes from './MonthDayCard.module.css'
import DayHeader from "../../../../AgendaCards/DayHeader/DayHeader";
import DayOfTheWeekCard from "../../../../AgendaCards/DayOfTheWeekCard/DayOfTheWeekCard";

export default function MonthCard (props) {
return (
    <div className={classes.MonthCard}>
            <DayHeader style={{zIndex: 0, fontSize: "2rem"}}>
                <DayOfTheWeekCard
                    newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                    today={props.today}/>
            </DayHeader>
            <div className={classes.MonthChildren}>
                {props.children}
            </div>

    </div>
)
}