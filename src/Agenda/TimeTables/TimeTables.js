import React from "react";
import CurrentTime from "./CurrentTIme/CurrentTime";
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
  let dataPasser;
  if(props.dayCardContainerWidth !== undefined) {
    dataPasser = props.dayCardContainerWidth;
  }
  return (
    <div onClick={props.backdropDisplayHandler} className={classes.EmptyTableWrapper}>
      {props.style !== undefined ?
          <CurrentTime
              dayCardContainerWidth={dataPasser}
              appViewMode={props.appViewMode}
              classInitialAvailableHour={props.classInitialAvailableHour}/> :
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
