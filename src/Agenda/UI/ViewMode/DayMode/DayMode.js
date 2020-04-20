import React, {useLayoutEffect, useRef, useState} from 'react'
import TimeTables from "../../../Components/TimeTables/TimeTables";
import EventCard from "../../../Components/EventCard/EventCard";
import CalendarMode from "../CalendarMode/CalendarMode";
import AgendaTitles from "../../AgendaTitles/AgendaTitles";
import LeftArrow from "../../NavigationButtons/LeftArrow/LeftArrow";
import TakeMeHome from "../../NavigationButtons/TakeMeHome/TakeMeHome";
import RightArrow from "../../NavigationButtons/RightArrow/RightArrow";

export default function DayMode(props) {
    const ref = useRef();
    const [dimensions, setDimensions] = useState(0);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
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
    const mouseMoveHandler = event => {
        setMouseX(event.screenX);
        setMouseY(event.screenY);
    }
    /* console.log("X: ", Math.round((mouseX - dimensions.x)/5)*5);
     console.log("Y: ", mouseY - dimensions.y - 79); // why there is an extra 79px here?*/
    const today = props.currentDay;
    return (
            <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
                <div style={{display: "flex", flexDirection: "column", minWidth: "300px", width: '100%', marginTop: "10px"}}>
                    <AgendaTitles newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                                  monthGetter={props.monthGetter}
                                  currentMonth={props.currentMonth}
                                  currentYear={props.currentYear}
                                  currentDay={props.currentDay}
                                  appViewMode={props.appViewMode}
                                  calendarViewType={props.calendarViewType}/>
                    <div style={{display: "flex", flexDirection: "row", minWidth: "300px"}}>
                            <TimeTables currAgendaData={props.currentDay}
                                        appViewMode={props.appViewMode}
                                        dayCardContainerWidth={dimensions}
                                        style={{ color: "black", border: "none", boxShadow: "none",  borderRadius: "0" }}
                                        tableOfAvailableHours={props.arrayOfDailyHoursTable}
                                        agendaInitialAvailableHour={props.agendaInitialAvailableHour}
                                        agendaLastAvailableHour={props.agendaLastAvailableHour}
                            />
                        <div style={{width: "100%", position: "relative"}}
                             onMouseMove={(event) => mouseMoveHandler(event)}
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
                <div style={{maxWidth: "500px"}}>
                    <div style={{width: "100%", height: "auto", position: "sticky", top: "10px"}}>
                        <div style={{display: "flex", padding: "10px", justifyContent: "flex-end"}}>
                            <LeftArrow appNavigationHandler={props.appNavigationHandler}/>
                            <TakeMeHome takeMeToToday={props.takeMeToToday}/>
                            <RightArrow appNavigationHandler={props.appNavigationHandler}/>
                        </div>
                        <CalendarMode
                            calendarOuterStyle={{marginTop: 0, height: "auto", width: "auto"}}
                            calendarInnerStyle={{width: "auto"}}
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