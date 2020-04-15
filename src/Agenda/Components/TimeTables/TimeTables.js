import React, {useState, useEffect, useLayoutEffect, useRef} from "react";
import CurrentTime from "../../UI/CurrentTIme/CurrentTime";
import classes from "./TimeTables.module.css";

export default function EmptyTables(props) {
  const [dimensions, setDimensions] = useState(0);
  const ref = useRef();
  const updateDimensions = () => {
    setDimensions(ref.current.getBoundingClientRect())
  }
  useLayoutEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions)
    }},[])
  const calculateCurrentTime = (new Date().getHours() - props.agendaInitialAvailableHour) * 60 + new Date().getMinutes();
  const showCurrentTime = (props.agendaLastAvailableHour - props.agendaInitialAvailableHour) * 60 + 60 > calculateCurrentTime;
  let todayIsPresentInScreenToRenderCurrentHour;
  if(props.appViewMode === "WeekMode") {
    todayIsPresentInScreenToRenderCurrentHour = props.currAgendaData.includes(new Date().setHours(0,0,0,0).valueOf());
  }
  if(props.appViewMode === "DayMode") {
    todayIsPresentInScreenToRenderCurrentHour = new Date().setHours(0,0,0,0).valueOf() === props.currAgendaData;
  }
  return (
      <div onClick={props.backdropDisplayHandler} className={classes.EmptyTableWrapper}>
        {props.style !== undefined && showCurrentTime && todayIsPresentInScreenToRenderCurrentHour?
            <CurrentTime
                currentTime={calculateCurrentTime}
                dayCardContainerWidth={props.dayCardContainerWidth}
                appViewMode={props.appViewMode}
                classInitialAvailableHour={props.classInitialAvailableHour}
                classLastlAvailableHour={props.classLastAvailableHour}/> :
            null}
        {props.tableOfAvailableHours.map(singleHour => {
          //ensure that there only content in the div for the
          // column that displays the hours
          let displaySingleHour;
          if (props.style !== undefined) {
            displaySingleHour = `${singleHour}:00`;
          }
          return (
              <div/*must enter the ref here*/
                  ref={ref}
                  key={singleHour}
                  className={classes.EmptyTable}
                  style={props.style}
              >
                {displaySingleHour}
              </div>
          );
        })}
      </div>
  );
}
