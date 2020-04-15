import React, {useState} from 'react'
import classes from "./DateCards.module.css";
import MonthTeller from "../../UI/MonthTeller/MonthTeller";
import Transition from "react-transition-group/cjs/Transition";

export default function DateCards(props) {
    //set the animation of the transition which displays the month of dates not related to the curr month
    const [otherMonth, setOtherMonth] = useState(false);
    //sets the background color of the current day of the month
    const dayOfTheCalendarEqualsToday = new Date(props.today).getDate() === new Date().getDate() &&
        new Date(props.today).getMonth() === new Date().getMonth();
    const dayOfTheCalendarEqualsCurrDayOfDayMode = new Date(props.today).getDate() === new Date(props.currentDay).getDate() &&
        new Date(props.today).getMonth() === new Date(props.currentDay).getMonth();
    let todayStyle;
    if(props.calendarViewType === "SimpleCalendar" && dayOfTheCalendarEqualsCurrDayOfDayMode && !dayOfTheCalendarEqualsToday ) {
        todayStyle = { backgroundColor: "gray", color: "white" };
    }
    if(props.calendarViewType === "SimpleCalendar" && dayOfTheCalendarEqualsCurrDayOfDayMode && dayOfTheCalendarEqualsToday) {
        todayStyle = { backgroundColor: "inherit", color: "#f56157" };
    }
        if (props.calendarViewType !== "SimpleCalendar" && dayOfTheCalendarEqualsToday) {
            todayStyle = { backgroundColor: "#f56157", color: "white" };
        }


    const currentMonthDateDifferentFromCurrentMonth = new Date(props.today).getMonth() !== props.monthGetter;
    let borderConfig = "1px solid black";
    let fullCalendarStyle = {};
    let fullCalendarInnerStyle = {};
    let nonMonthDates = {};
    if(props.calendarViewType === "FullCalendar" && props.appViewMode === "CalendarMode") {
        fullCalendarInnerStyle = {position: "absolute", right: "5px", top: "5px", fontSize: "17px", padding: "5px"};
        fullCalendarStyle = {borderRight: borderConfig, borderBottom: borderConfig, height: "100px"};
        if(props.cardDayIndex === 0) {
            Object.assign(fullCalendarStyle, {borderLeft: borderConfig});
        }
        if(props.cardDatesInnerIndex === 0) {
            Object.assign(fullCalendarStyle, {borderTop: borderConfig})
        }
        if(currentMonthDateDifferentFromCurrentMonth){
            Object.assign(fullCalendarStyle,{backgroundColor: "#F2F2F2"});
        }
    }
    if(currentMonthDateDifferentFromCurrentMonth){
        nonMonthDates = {color: 'grey'};
    }
    return(
        <div className={classes.DateWrapper}
             style={fullCalendarStyle}
             onMouseEnter={() => setOtherMonth(true)}
             onMouseLeave={() => setOtherMonth(false)}>
            <Transition in={otherMonth && currentMonthDateDifferentFromCurrentMonth} timeout={1000}>
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
            <div className={classes.Day} style={Object.assign(nonMonthDates,todayStyle, fullCalendarInnerStyle)}>
                {new Date(props.today).getDate()}
            </div>
        </div>
    )
}