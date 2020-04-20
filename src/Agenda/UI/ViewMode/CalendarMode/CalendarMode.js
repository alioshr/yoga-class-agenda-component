import React, {Fragment} from 'react'
import DateCards from "../../../Components/DateCards.js/DateCards";
import DayOfTheWeekCard from "../../../Components/DayOfTheWeekCard/DayOfTheWeekCard"
import classes from './CalendarMode.module.css'

export default function CalendarMode(props) {
    //day card style will be 1rem when in dayCard
    let dayOfTheWeekCardStyle = {fontSize: "1rem"}
    const smallCalendarOnDayMode = {fontSize: "1rem"};
    //if statement just for fullCalendar
    if(props.calendarViewType === "FullCalendar" && props.appViewMode === "CalendarMode") {
        dayOfTheWeekCardStyle = {color: "black", margin: "1px", fontSize: "1.5rem", height: "auto", textAlign: 'right'};
    }
    return (
        <div className={classes.CalendarWrapper} style={props.calendarOuterStyle}>
            {[1585450800000, 1585537200000, 1585623600000, 1585710000000, 1585796400000, 1585882800000, 1585969200000].map((day, dayIndex) =>
                <div className={classes.CalendarInnerWrapper}
                    style={props.calendarInnerStyle}
                     key={day}>
                    <DayOfTheWeekCard
                        style={dayOfTheWeekCardStyle}
                        newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                        today={day}/>
                    <Fragment>
                        {props.currentMonth
                            .flat()
                            .filter(date => new Date(date).getDay() === new Date(day).getDay())
                            .map((date, innerDateIndex) =>
                                <DateCards today={date}
                                           goToClickedDate={props.goToClickedDate}
                                           monthGetter={props.monthGetter}
                                           newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                                           currentDay={props.currentDay}
                                           key={date}
                                           calendarViewType={props.calendarViewType}
                                           cardDayIndex={dayIndex}
                                           cardDatesInnerIndex={innerDateIndex}
                                           appViewMode={props.appViewMode}
                                           smallCalendarOnDayMode={smallCalendarOnDayMode}/>
                            )}
                    </Fragment>
                </div>
            )}
        </div>
    )
}