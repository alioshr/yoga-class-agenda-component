import React from "react";
import classes from "./Layout.module.css";

export default function Layout(props) {
  return (
    <div className={classes.OutStructure}>
      {/*here is display the top title w/ the curr month*/}
      <div className={classes.MonthDisplay}>
        <div
          className={classes.LeftArrow}
          onClick={() => props.weekNavigationHandler("decrement")}
        />
        <div
          className={classes.RightArrow}
          onClick={() => props.weekNavigationHandler("increment")}
        />
        {props.newDatesToVerboseHandler(
          new Date(Math.min(...props.currentWeek)),
          "renderMonth"
        )}
      </div>
      <div className={classes.AgendaInnerStructure}>{props.children}</div>
    </div>
  );
}
