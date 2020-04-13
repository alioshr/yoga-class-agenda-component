import React from "react";
import CurrentTime from "../UI/CurrentTIme/CurrentTime";
import classes from "./TimeTables.module.css";

export default function EmptyTables(props) {
  //ensure that there only content in the div for the column that displays the hours
  if (props.style) {
    let style = {
      boxShadow: "none",
      borderRadius: "0"
    };
    Object.assign(props.style, style);
  }
  const calculateCurrentTime = (new Date().getHours() - props.agendaInitialAvailableHour) * 60 + new Date().getMinutes();
  const showCurrentTime = (props.agendaLastAvailableHour - props.agendaInitialAvailableHour) * 60 + 60 > calculateCurrentTime;
  console.log('current time',calculateCurrentTime);
  console.log("day available hours",(props.agendaLastAvailableHour - props.agendaInitialAvailableHour) * 60);
  console.log(showCurrentTime);
  return (
    <div onClick={props.backdropDisplayHandler} className={classes.EmptyTableWrapper}>
      {props.style !== undefined && showCurrentTime ?
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
          <div
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
