import React from "react";
import classes from "./BackdropFilter.module.css";

export default function BackdropFilter(props) {
  return (
    <div
      className={classes.BackdropFilter}
      onClick={props.backdropDisplayHandler}
    >
      <div className={classes.BackdropInnerChildren}>{props.children}</div>
    </div>
  );
}
