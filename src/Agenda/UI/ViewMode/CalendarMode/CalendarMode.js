import React from 'react'
import MonthDayCard from "../../../AgendaCards/MonthDayCard/MonthDayCard";
import DateCards from "../../../AgendaCards/DateCards.js/DateCards";

export default function CalendarMode(props) {
    return (
        <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
            {props.currentWeek.map(day =>
                <MonthDayCard
                    key={day}
                    newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                    today={day}
                >
                    {props.currentMonth
                            .filter(date => new Date(date).getDay() === new Date(day).getDay())
                            .map(date => {
                                let nonMonthDates = {};
                                if(new Date(date).getMonth() !== props.monthGetter) {
                                    nonMonthDates = {color: 'grey'}
                                }
                                return  <DateCards today={date} key={date} nonMonthDates={nonMonthDates}/>
                            })}
                </MonthDayCard>
            )}
        </div>
    )
}