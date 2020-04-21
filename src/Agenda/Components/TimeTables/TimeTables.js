import React, {useEffect, useState} from "react";
import CurrentTime from "../../UI/CurrentTIme/CurrentTime";
import classes from "./TimeTables.module.css";

export default function EmptyTables(props) {
  const [currTime, setCurrTime] = useState(new Date())
  const padToTwo = number => (number <= 9 ? `0${number}` : number);
  const calculateCurrentTime = (currTime.getHours() - props.agendaInitialAvailableHour) * 60 + currTime.getMinutes();
  const showCurrentTime = (props.agendaLastAvailableHour - props.agendaInitialAvailableHour) * 60 + 60 > calculateCurrentTime;
  const hourToMilliseconds = hour => 3600000 * hour;
  const minutesInMilliseconds = minutes => 60000 * minutes;
  const nextIntervalCalc = () => {
    if(currTime.getMinutes() < 15) {
      return 15 - currTime.getMinutes()
    }
    if(currTime.getMinutes() > 15 && currTime.getMinutes() < 46) {
      return 46 - currTime.getMinutes()
    }
    if(currTime.getMinutes() > 45) {
      return 60 - currTime.getMinutes() + 15
    }
  }
  useEffect(() => {
    const renderInterval = setInterval(() => {
      if(showCurrentTime) {
        setCurrTime(new Date())
      }
    }, minutesInMilliseconds(nextIntervalCalc()))
    return () => {
      clearInterval(renderInterval)
      nextIntervalCalc()
    }
  })
  //the function below hides the hour in the table of available hours when <CurrentTime/> is hovering close to it
  const currentTimeCloseToTabHours = singleHour => {
    const tableHourBiggerThanCurrTime = hourToMilliseconds(singleHour) - (hourToMilliseconds(currTime.getHours()) + minutesInMilliseconds(currTime.getMinutes()));
    const currTimeBiggerThanTableHour = (hourToMilliseconds(currTime.getHours()) + minutesInMilliseconds(currTime.getMinutes())) - hourToMilliseconds(singleHour);
    return ((currTimeBiggerThanTableHour < minutesInMilliseconds(15) && currTimeBiggerThanTableHour > 0) || (tableHourBiggerThanCurrTime < minutesInMilliseconds(15) && tableHourBiggerThanCurrTime > 0))
  };
  let todayIsPresentInScreenToRenderCurrentHour;
  if(props.appViewMode === "WeekMode") {
    todayIsPresentInScreenToRenderCurrentHour = props.currAgendaData.includes(new Date().setHours(0,0,0,0));
  }
  if(props.appViewMode === "DayMode") {
    todayIsPresentInScreenToRenderCurrentHour = new Date().setHours(0,0,0,0) === props.currAgendaData;
  }
  return (
      <div className={classes.EmptyTableWrapper} style={props.outerStyle}>
        {props.style !== undefined && showCurrentTime && todayIsPresentInScreenToRenderCurrentHour?
            <CurrentTime currentTime={calculateCurrentTime}
                         dayCardContainerWidth={props.dayCardContainerWidth}
                         appViewMode={props.appViewMode}
                         classInitialAvailableHour={props.classInitialAvailableHour}
                         classLastlAvailableHour={props.classLastAvailableHour}/> :
            null}
        {props.tableOfAvailableHours.map(singleHour => {
          //ensure that there only content in the div for the column that displays the hours
          let displaySingleHour;
          if (props.style !== undefined && !currentTimeCloseToTabHours(singleHour)) {
            displaySingleHour = `${padToTwo(singleHour)}:00`;
          }
          return (
              <div key={singleHour}
                   className={classes.EmptyTable}
                   style={props.style}>
                {displaySingleHour}
              </div>
          );
        })}
      </div>
  );
}
