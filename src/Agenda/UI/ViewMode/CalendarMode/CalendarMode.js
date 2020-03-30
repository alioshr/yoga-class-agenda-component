import React from 'react'
import MonthDayCard from "../../../AgendaCards/MonthDayCard/MonthDayCard";
import DateCards from "../../../AgendaCards/DateCards.js/DateCards";

export default function CalendarMode(props) {
    return (
        <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
            {props.currentWeek.map(day =>
                <MonthDayCard
                    newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                    today={day}
                >
                        {props.currentMonth.map((date, index) => {
                            let nonMonthDates = {};
                                if(new Date(date).getDay() === new Date(day).getDay()) {
                                    if (index > 24 && new Date(date).getDate() < 20 || index < 7 && new Date(date).getDate() > 15){
                                        nonMonthDates = {
                                            color: 'grey'
                                        }
                                    }
                                    return  <DateCards today={date} nonMonthDates={nonMonthDates}/>

                                }
                            }
                        )}
                </MonthDayCard>
            )}
        </div>
    )
}