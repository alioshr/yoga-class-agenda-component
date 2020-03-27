import React from "react";
import classes from "./TimeTables.module.css";

export default function EmptyTables(props) {
  //ensure that there only content in the div for the
  // column that displays the hours
  let renderSingleHour;
  if (props.style) {
    renderSingleHour = true;
  }
  return (
    <div onClick={props.backdropDisplayHandler}>
      {props.tableOfAvailableHours.map(singleHour => {
        //ensure that there only content in the div for the
        // column that displays the hours
        let displaySingleHour;
        if (renderSingleHour) {
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
