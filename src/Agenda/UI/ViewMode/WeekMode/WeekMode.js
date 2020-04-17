import React, {useLayoutEffect, useRef, useState} from 'react'
import SideTab from "../../../Components/SideTab/SideTab";
import TimeTables from "../../../Components/TimeTables/TimeTables";
import EventCard from "../../../Components/EventCard/EventCard";
import EventDialogBox from "../../EventDialogBox/EventDialogBox";
import FullEventCard from "../../../Components/EventCard/FullEventCard/FullEventCard";
import Transition from "react-transition-group/cjs/Transition";
import DayOfTheWeekCard from "../../../Components/AgendaCards/DayOfTheWeekCard/DayOfTheWeekCard";
import DateCards from "../../../Components/AgendaCards/DateCards.js/DateCards";
import classes from './WeekMode.module.css'


export default function WeekMode(props) {
    const ref = useRef({});
    const [dimensions, setDimensions] = useState(0);
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
    return (
        <div className={classes.WeekModeWrapper}>
            <SideTab>
                <TimeTables currAgendaData={props.currentWeek}
                            appViewMode={props.appViewMode}
                            dayCardContainerWidth={dimensions.width}
                            style={{ color: "black", border: "none", boxShadow: "none",  borderRadius: "0" }}
                            tableOfAvailableHours={props.arrayOfDailyHoursTable}
                            agendaInitialAvailableHour={props.agendaInitialAvailableHour}
                            agendaLastAvailableHour={props.agendaLastAvailableHour}
                />
            </SideTab>
            {props.currentWeek.map(day =>
                <div className={classes.DayCard}>
                        <div className={classes.CardHeader}>
                        <DayOfTheWeekCard
                            style={{fontSize: "1.2rem"}}
                            newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                            today={day}/>
                        <DateCards today={day}
                                   monthGetter={props.monthGetter}
                                   newDatesToVerboseHandler={props.newDatesToVerboseHandler}/>
                        </div>
                    <div className={classes.InnerTableData}
                         ref={ref}>
                    <TimeTables tableOfAvailableHours={props.arrayOfDailyHoursTable}/>
                        {props.dataToBeRendered.filter(cl => cl.classDate === day).map(cl =>
                            <React.Fragment>
                                <EventCard currDay={day}
                                           classDate={cl.classDate}
                                           classTitle={cl.classTitle}
                                           classLocation={cl.location}
                                           classDuration={cl.duration}
                                           classTime={cl.classTime}
                                           classInitialAvailableHour={props.agendaInitialAvailableHour}
                                           key={cl.id}
                                           displayFullEventCard={props.displayDialogBoxHandler}/>
                                <Transition key={cl.id} timeout={500} in={day === props.dialogBoxData.displayDialogBox}>
                                    {state => {
                                        let animation = {
                                            transition: "z-index .5s ease-out, opacity .5s ease-out",
                                            opacity:
                                                state === "entering"
                                                    ? 1
                                                    : state === "entered"
                                                    ? 1
                                                    : state === "exited"
                                                        ? 0
                                                        : 0,
                                            zIndex:
                                                state === "entering"
                                                    ? 101
                                                    : state === "entered"
                                                    ? 101
                                                    : state === "exiting"
                                                        ? 96
                                                        :  -100
                                        };
                                        return (
                                            <EventDialogBox animation={animation}
                                                            dayCardContainerRef={dimensions}
                                                            today={day}
                                                            displayDialogBox={props.dialogBoxData.displayDialogBox}
                                                            dimsFromLayoutWidth={props.layoutWidthDimensions.width}
                                                            calculateCardTopPositioning={props.dialogBoxData.topPositionFromClassCard}
                                                            calculateCardHeigthPositioning={props.dialogBoxData.heigthPositionFromClassCard}
                                                            classInitialAvailableHour={props.agendaInitialAvailableHour}
                                                            classLastAvailableHour={props.agendaLastAvailableHour}>
                                                <FullEventCard fullClassData={props.dataToBeRendered}
                                                               currentDay={day}/>
                                            </EventDialogBox>
                                        );
                                    }}
                                </Transition>
                            </React.Fragment>)}
                    </div>
                </div>)}
            <SideTab />
        </div>
    )}