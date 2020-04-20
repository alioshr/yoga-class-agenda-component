import React, {useState} from 'react'
import classes from "./DateCards.module.css";
import MonthTeller from "../../UI/MonthTeller/MonthTeller";
import Transition from "react-transition-group/cjs/Transition";

export default function DateCards(props) {
    const [otherMonth, setOtherMonth] = useState(false);
    const [cursorNotAllowed, setCursorNotAllowed] = useState({})

    const dayOfTheCalendarEqualsToday = props.today === new Date().setHours(0,0,0,0);
    const dayOfTheCalendarEqualsCurrDayOfDayMode = props.today === props.currentDay;
    const currentMonthDateDifferentFromCurrentMonth = new Date(props.today).getMonth() !== props.monthGetter;

    let borderConfig = "1px solid black";
    let fullCalendarStyle = {};
    let fullCalendarInnerStyle = {};

    const mouseOverDisabled = (currentDay) => {
        if(currentDay < new Date().setHours(0,0,0,0)) {
            setCursorNotAllowed({cursor: "not-allowed"});
        }
    }
    if (dayOfTheCalendarEqualsToday) {
        Object.assign(fullCalendarInnerStyle, { backgroundColor: "#f56157", color: "white"})
    }
    if(currentMonthDateDifferentFromCurrentMonth){
        Object.assign(fullCalendarInnerStyle,{color: 'grey'});
    }
    if(props.appViewMode === "CalendarMode") {
        if(props.today < new Date().setHours(0,0,0,0)){
            Object.assign(fullCalendarStyle,{backgroundColor: "#f2f2f2"});
        }
        if(props.calendarViewType === "FullCalendar") {
            fullCalendarStyle = {borderRight: borderConfig, borderBottom: borderConfig, minHeight: "100px"};
            Object.assign(fullCalendarInnerStyle, {position: "absolute", right: "5px", top: "5px", fontSize: "17px", padding: "5px"});
            if(props.cardDayIndex === 0) {
                Object.assign(fullCalendarStyle, {borderLeft: borderConfig});
            }
            if(props.cardDatesInnerIndex === 0) {
                Object.assign(fullCalendarStyle, {borderTop: borderConfig})
            }
            if(currentMonthDateDifferentFromCurrentMonth || props.today < new Date().setHours(0,0,0,0)){
                Object.assign(fullCalendarStyle,{backgroundColor: "#f2f2f2"});
            }
        }
        if(props.calendarViewType === "SimpleCalendar") {
            if(dayOfTheCalendarEqualsCurrDayOfDayMode && !dayOfTheCalendarEqualsToday ) {
                Object.assign(fullCalendarInnerStyle,{ backgroundColor: "gray", color: "white" })
            }
            if(!dayOfTheCalendarEqualsCurrDayOfDayMode && dayOfTheCalendarEqualsToday) {
                Object.assign(fullCalendarInnerStyle, { backgroundColor: "inherit", color: "#f56157", fontWeight: "bold" })
            }
        }
    }
    return(
        <div className={classes.DateWrapper}
             style={Object.assign(fullCalendarStyle, cursorNotAllowed)}
             onMouseEnter={() => setOtherMonth(true)}
             onMouseLeave={() => setOtherMonth(false)}
             onClick={() => props.today >= new Date().setHours(0,0,0,0) ? props.goToClickedDate(props.today) : null}
             onMouseOver={() => mouseOverDisabled(props.today)}>
            <Transition in={otherMonth && currentMonthDateDifferentFromCurrentMonth && props.calendarViewType === "FullCalendar"} timeout={1000}>
                {state => {
                    let animation = {
                        transition: "opacity .5s ease-out",
                        opacity:
                            state === "entering"
                                ? 1
                                : state === "entered"
                                ? 1
                                : state === "exited"
                                    ? 0
                                    : 0
                    };
                    let innerAnimation = {
                        transition: "width .5s ease-out",
                        width:
                            state === "entering"
                                ? "100%"
                                : state === "entered"
                                ? "100%"
                                : state === "exited"
                                    ? 0
                                    : 0
                    };
                    return (
                        <MonthTeller monthGetter={new Date(props.today).getMonth()}
                                     newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                                     style={animation}
                                     innerStyle={innerAnimation}
                                     calendarViewType={props.calendarViewType}/>
                    )
                }}
            </Transition>
            <div className={classes.Day}
                 style={Object.assign(fullCalendarInnerStyle, props.smallCalendarOnDayMode)}>
                {new Date(props.today).getDate()}
            </div>
        </div>
    )
}