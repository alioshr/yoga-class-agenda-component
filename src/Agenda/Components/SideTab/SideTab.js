import React from "react";
import classes from "./SideTab.module.css";

export default function HoursPointer(props) {
  return (
    <div className={classes.Card}>
      <div className={classes.SideTabHeader} style={props.style}/>
      <div className={classes.SideTabChildren}>{props.children}</div>
    </div>
  );
}
