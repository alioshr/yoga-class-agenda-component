import React, {useLayoutEffect, useRef, useState} from 'react'
import TimeTables from "../../../Components/TimeTables/TimeTables";
import EventCard from "../../../Components/EventCard/EventCard";
import CalendarMode from "../CalendarMode/CalendarMode";
import AgendaTitles from "../../AgendaTitles/AgendaTitles";
import LeftArrow from "../../NavigationButtons/LeftArrow/LeftArrow";
import TakeMeHome from "../../NavigationButtons/TakeMeHome/TakeMeHome";
import RightArrow from "../../NavigationButtons/RightArrow/RightArrow";
import classes from './DayMode.module.css'

export default function DayMode(props) {
    const ref = useRef();
    const [dimensions, setDimensions] = useState(0);
    /*const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);*/
    const updateDimensions = () => {
        setDimensions(ref.current.getBoundingClientRect());
    };
    useLayoutEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions)
        }
    }, []);
    /*const mouseMoveHandler = event => {
        setMouseX(event.screenX);
        setMouseY(event.screenY);
    }*/
    /* console.log("X: ", Math.round((mouseX - dimensions.x)/5)*5);
     console.log("Y: ", mouseY - dimensions.y - 79); // why there is an extra 79px here?*/
    const today = props.currentDay;
    return (
            <div className={classes.DayModeWrapper}>
                <div className={classes.LeftTabWrapper}>
                    <AgendaTitles newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                                  monthGetter={props.monthGetter}
                                  currentMonth={props.currentMonth}
                                  currentYear={props.currentYear}
                                  currentDay={props.currentDay}
                                  appViewMode={props.appViewMode}
                                  calendarViewType={props.calendarViewType}/>
                    <div className={classes.LeftTabInnerContent}>
                            <TimeTables currAgendaData={props.currentDay}
                                        appViewMode={props.appViewMode}
                                        dayCardContainerWidth={dimensions}
                                        style={{ color: "black", border: "none", boxShadow: "none",  borderRadius: "0" }}
                                        tableOfAvailableHours={props.arrayOfDailyHoursTable}
                                        agendaInitialAvailableHour={props.agendaInitialAvailableHour}
                                        agendaLastAvailableHour={props.agendaLastAvailableHour}
                            />
                        <div className={classes.LeftTabEventsArea}
                             /*onMouseMove={(event) => mouseMoveHandler(event)}*/
                             ref={ref}>
                            <TimeTables tableOfAvailableHours={props.arrayOfDailyHoursTable}/>
                            {props.dataToBeRendered.filter(cl => cl.classDate === today).map(cl =>
                                <EventCard
                                    currDay={today}
                                    classDate={cl.classDate}
                                    classTitle={cl.classTitle}
                                    classLocation={cl.location}
                                    classDuration={cl.duration}
                                    classTime={cl.classTime}
                                    classInitialAvailableHour={props.agendaInitialAvailableHour}
                                    key={cl.id}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className={classes.RightTabWrapper}>
                    <div className={classes.RightTabInnerWrapper}>
                        <div className={classes.RightTabControlPanel}>
                            <LeftArrow appNavigationHandler={props.appNavigationHandler}/>
                            <TakeMeHome takeMeToToday={props.takeMeToToday}/>
                            <RightArrow appNavigationHandler={props.appNavigationHandler}/>
                        </div>
                        <CalendarMode
                            calendarOuterStyle={{marginTop: 0, height: "auto", width: "auto"}}
                            calendarInnerStyle={{maxWidth: "40px"}}
                            currentDay={props.currentDay}
                            appViewMode={"CalendarMode"}
                            calendarViewType={"SimpleCalendar"}
                            monthGetter={props.monthGetter}
                            currentMonth={props.currentMonth}
                            currentWeek={props.currentWeek}
                            newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                            goToClickedDate={props.goToClickedDate}/>
                    </div>
                </div>
            </div>
    )

}