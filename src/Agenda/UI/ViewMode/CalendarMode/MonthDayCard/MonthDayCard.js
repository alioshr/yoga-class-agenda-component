import React from 'react'
import classes from './MonthDayCard.module.css'
import DayHeader from "../../../../Components/AgendaCards/DayHeader/DayHeader";
import DayOfTheWeekCard from "../../../../Components/AgendaCards/DayOfTheWeekCard/DayOfTheWeekCard";

export default function MonthCard (props) {
    let dayHeaderWrapper = {};
    let dayCardStyle = {};
    if(props.calendarViewType === "FullCalendar") {
        dayHeaderWrapper = {zIndex: 0, fontSize: "1.5rem", justifyContent: "flex-end", alignItems: "flex-end", height: "auto"}
        dayCardStyle = {color: "black", margin: "1px", fontSize: "1.5rem"}
    }
return (
    <div className={classes.MonthCard}>
            <DayHeader style={dayHeaderWrapper}>
                <DayOfTheWeekCard
                    style={dayCardStyle}
                    newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                    today={props.today}/>
            </DayHeader>
            <div className={classes.MonthChildren}>
                {props.children}
            </div>

    </div>
)
}