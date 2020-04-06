import React from 'react'
import MonthDayCard from "./MonthDayCard/MonthDayCard";
import DateCards from "../../../AgendaCards/DateCards.js/DateCards";

export default function CalendarMode(props) {
    return (
        <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
            {[1585450800000, 1585537200000, 1585623600000, 1585710000000, 1585796400000, 1585882800000, 1585969200000].map(day =>
                <MonthDayCard
                    key={day}
                    newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                    today={day}
                >
                    {props.currentMonth
                        .flat()
                        .filter(date => new Date(date).getDay() === new Date(day).getDay())
                        .map(date =>
                            <DateCards today={date}
                                       key={date}
                                       monthGetter={props.monthGetter}/>
                        )}
                </MonthDayCard>
            )}
        </div>
    )
}