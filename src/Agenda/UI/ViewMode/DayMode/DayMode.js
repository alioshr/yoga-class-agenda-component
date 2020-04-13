import React, {useState} from 'react'
import SideTab from "../../../SideTab/SideTab";
import TimeTables from "../../../TimeTables/TimeTables";
import EventCard from "../../../EventCard/EventCard";
import DayCard from "./DayCard/DayCard";

export default function DayMode(props) {
    const [dayCardRef, setDayCardRef] = useState();

    const callbackDivRef = childRef => {
            setDayCardRef(childRef)
    };
    const today = props.currentDay;
    return (
        <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
            <SideTab style={{height: "auto"}}>
                <TimeTables
                    appViewMode={props.appViewMode}
                    dayCardContainerWidth={dayCardRef}
                    style={{ color: "black", border: "none" }}
                    tableOfAvailableHours={props.arrayOfDailyHoursTable}
                    agendaInitialAvailableHour={props.agendaInitialAvailableHour}
                    agendaLastAvailableHour={props.agendaLastAvailableHour}
                />
            </SideTab>
            <DayCard
                appViewMode={props.appViewMode}
                callbackDivRef={callbackDivRef}
                monthGetter={props.monthGetter}
                backdropIsActive={props.backdropIsActive}
                today={today}
                newDatesToVerboseHandler={props.newDatesToVerboseHandler}
            >
                <TimeTables
                    tableOfAvailableHours={props.arrayOfDailyHoursTable}
                />
                {props.dataToBeRendered.filter(cl => cl.classDate === today).map(cl =>
                    <EventCard
                        zIndexIFClicked={props.dialogBoxData.displayDialogBox}
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
            </DayCard>
            <SideTab />
        </div>
    )

}