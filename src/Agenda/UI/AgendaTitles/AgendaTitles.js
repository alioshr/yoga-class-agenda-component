import React from 'react';
import classes from "./AgendaTitles.module.css";

export default function AgendaTitles(props) {
    let agendaTitles;
    switch (props.appViewMode) {
        case("DayMode") :
            agendaTitles = `${props.newDatesToVerboseHandler(props.monthGetter, "renderMonth")} 
    ${new Date(props.currentDay).getDate()}, ${props.currentYear}`;
            break;
        case("WeekMode") :
        case("CalendarMode") :
            agendaTitles = `${props.newDatesToVerboseHandler(props.monthGetter, "renderMonth")}, ${props.currentYear}`;
            break;
        case("DayOfTheWeek") :
            agendaTitles = (props.currentDay !== "" ? props.newDatesToVerboseHandler(new Date(props.currentDay).getDay(), "renderWeekDay") : null)
            break;
        default:
            agendaTitles = null;
    }
    let style;
    if(props.appViewMode === "DayOfTheWeek" && props.currentDay !== '') {
        style = {fontSize: "1.8rem", marginBottom: "10px"};
    }
    if(props.appViewMode === "CalendarMode" && props.calendarViewType === 'SimpleCalendar') {
        style = {textAlign: "center"}
    }
    return (
        <div className={classes.AgendaTitlesDisplay} style={style}>
            {agendaTitles}
        </div>
    )
}