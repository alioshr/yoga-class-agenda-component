import React from 'react'
import SideTab from "../../../SideTab/SideTab";
import TimeTables from "../../../TimeTables/TimeTables";
import WeekDayCard from "./WeekDayCard/WeekDayCard";
import BackdropFilter from "../../BackdropFilter/BackdropFilter";
import Button from "../../Button/Button";
import EventCard from "../../../EventCard/EventCard";
import EventDialogBox from "../../EventDialogBox/EventDialogBox";
import FullEventCard from "../../../EventCard/FullEventCard/FullEventCard";
import Transition from "react-transition-group/cjs/Transition";


export default function WeekMode(props) {
    return (
        <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
            <SideTab>
                <TimeTables
                    currAgendaData={props.currentWeek}
                    appViewMode={props.appViewMode}
                    dayCardContainerWidth={props.dayCardContainerWidth}
                    style={{ color: "black", border: "none", boxShadow: "none",  borderRadius: "0" }}
                    tableOfAvailableHours={props.arrayOfDailyHoursTable}
                    agendaInitialAvailableHour={props.agendaInitialAvailableHour}
                    agendaLastAvailableHour={props.agendaLastAvailableHour}
                />
            </SideTab>
            {props.currentWeek.map(day => {
                return (
                    <WeekDayCard
                        callbackDayCardContainerDimensions={props.callbackDayCardContainerDimensions}
                        monthGetter={props.monthGetter}
                        backdropIsActive={props.backdropIsActive}
                        key={day}
                        today={day}
                        newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                    >
                        {props.backdropIsActive === "cover all" ? (
                            <BackdropFilter
                                backdropDisplayHandler={() => props.displayDialogBoxHandler(day, props.dialogBoxData.topPositionFromClassCard, props.dialogBoxData.heigthPositionFromClassCard)}
                            />
                        ) : null}
                        <TimeTables
                            backdropDisplayHandler={() => props.backdropDisplayHandler(day)}
                            tableOfAvailableHours={props.arrayOfDailyHoursTable}
                        />
                        {props.backdropIsActive === day ? (
                            <BackdropFilter
                                backdropDisplayHandler={() => props.backdropDisplayHandler("false")}
                            >
                                <Button
                                    ButtonText="Create a New Class"
                                    buttonClicked={() => props.displayDialogBoxHandler(day)} //will open a dialog box in the future
                                />
                            </BackdropFilter>
                        ) : null}
                        {props.dataToBeRendered.map(cl => {
                            if (cl.classDate === day) {
                                return (
                                    <EventCard
                                        zIndexIFClicked={props.dialogBoxData.displayDialogBox}
                                        currDay={day}
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
                                            <EventDialogBox
                                                animation={animation}
                                                today={day}
                                                displayDialogBox={props.dialogBoxData.displayDialogBox}
                                                dimsFromLayoutWidth={props.layoutWidthDimensions.width}
                                                calculateCardTopPositioning={props.dialogBoxData.topPositionFromClassCard}
                                                calculateCardHeigthPositioning={props.dialogBoxData.heigthPositionFromClassCard}
                                                classInitialAvailableHour={props.agendaInitialAvailableHour}
                                                classLastAvailableHour={props.agendaLastAvailableHour}
                                            >
                                                {/*gotta change this later, as there will be <CreateClass/> and others in here*/}
                                                <FullEventCard
                                                    fullClassData={props.dataToBeRendered}
                                                    currentDay={day}/>
                                            </EventDialogBox>
                                        );
                                    }}
                                </Transition>

                            );
                        })}
                    </WeekDayCard>
                );
            })}
            <SideTab />
        </div>
    )
}