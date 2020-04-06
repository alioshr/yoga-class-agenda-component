import React from 'react'
import classes from './DayCard.module.css'
import DayHeader from "../../../../AgendaCards/DayHeader/DayHeader";
import DayOfTheWeekCard from "../../../../AgendaCards/DayOfTheWeekCard/DayOfTheWeekCard";
import DateCards from "../../../../AgendaCards/DateCards.js/DateCards";

export default function DayCard(props) {
    return (
        <div className={classes.DayCard}>
            <DayHeader>
                <DayOfTheWeekCard
                    newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                    today={props.today}/>
                    <DateCards today={props.today} monthGetter={props.monthGetter}/>
            </DayHeader>
            <div className={classes.ChildInnerTable}>
                <div>{props.children}</div>
            </div>
        </div>
    )

}