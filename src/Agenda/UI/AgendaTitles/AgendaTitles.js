import React, {Fragment} from 'react';
import classes from "./AgendaTitles.module.css";

export default function AgendaTitles(props) {
    let agendaTitles;
    switch (props.appViewMode) {
        case("DayMode") :
            agendaTitles = props.currentDay !== "" ?
               <Fragment>
                   <div style={{fontSize: '2.5rem', marginBottom: "5px"}}>
                       {props.newDatesToVerboseHandler(props.monthGetter, "renderMonth")},
                       {new Date(props.currentDay).getDate()} {props.currentYear}
                   </div>
                   <Fragment>
                       {props.newDatesToVerboseHandler(new Date(props.currentDay).getDay(), "renderWeekDay")}
                   </Fragment>
               </Fragment> : null
            break;
        case("WeekMode") :
        case("CalendarMode") :
            agendaTitles = `${props.newDatesToVerboseHandler(props.monthGetter, "renderMonth")}, ${props.currentYear}`;
            break;
        default:
            agendaTitles = null;
    }
    let style;
    if(props.currentDay !== '' && props.appViewMode === "DayMode") {
        style = {fontSize: "1.8rem", marginBottom: "10px", zIndex: '999'};
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