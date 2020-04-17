import React, {useLayoutEffect, useRef, useState} from 'react'
import SideTab from "../../../Components/SideTab/SideTab";
import TimeTables from "../../../Components/TimeTables/TimeTables";
import WeekDayCard from "./WeekDayCard/WeekDayCard";
import EventCard from "../../../Components/EventCard/EventCard";
import EventDialogBox from "../../EventDialogBox/EventDialogBox";
import FullEventCard from "../../../Components/EventCard/FullEventCard/FullEventCard";
import Transition from "react-transition-group/cjs/Transition";
import DayHeader from "../../../Components/AgendaCards/DayHeader/DayHeader";
import DayOfTheWeekCard from "../../../Components/AgendaCards/DayOfTheWeekCard/DayOfTheWeekCard";
import DateCards from "../../../Components/AgendaCards/DateCards.js/DateCards";


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
    }, [ref.current]);
    return (
        <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
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
                    <WeekDayCard monthGetter={props.monthGetter}
                                 key={day}
                                 today={day}
                                 newDatesToVerboseHandler={props.newDatesToVerboseHandler}>
                        <div style={{position: "relative"}} ref={ref}>
                        <TimeTables tableOfAvailableHours={props.arrayOfDailyHoursTable}/>
                        {props.dataToBeRendered.map(cl => {
                            if (cl.classDate === day) {
                                return (
                                    <EventCard currDay={day}
                                               classDate={cl.classDate}
                                               classTitle={cl.classTitle}
                                               classLocation={cl.location}
                                               classDuration={cl.duration}
                                               classTime={cl.classTime}
                                               classInitialAvailableHour={props.agendaInitialAvailableHour}
                                               key={cl.id}
                                               displayFullEventCard={props.displayDialogBoxHandler}
                                    />
                                );
                            }
                            return (
                                /*must check this in the future - should not render all items but just one card at a time*/
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
                                                            today={day}
                                                            displayDialogBox={props.dialogBoxData.displayDialogBox}
                                                            dimsFromLayoutWidth={props.layoutWidthDimensions.width}
                                                            calculateCardTopPositioning={props.dialogBoxData.topPositionFromClassCard}
                                                            calculateCardHeigthPositioning={props.dialogBoxData.heigthPositionFromClassCard}
                                                            classInitialAvailableHour={props.agendaInitialAvailableHour}
                                                            classLastAvailableHour={props.agendaLastAvailableHour}
                                            >
                                                {/*gotta change this later, as there will be <CreateClass/> and others in here*/}
                                                <FullEventCard fullClassData={props.dataToBeRendered}
                                                               currentDay={day}/>
                                            </EventDialogBox>
                                        );
                                    }}
                                </Transition>
                            );
                        })}
                        </div>
                    </WeekDayCard>
            )}
            <SideTab />
        </div>
    )
}