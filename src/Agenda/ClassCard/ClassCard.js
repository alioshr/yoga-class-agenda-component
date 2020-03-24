import React from "react";
import classes from "./ClassCard.module.css";

export default function ClassCard(props) {
  const padToTwo = number => (number <= 9 ? `0${number}` : number);
  const classElapseHandler = (
    classDate,
    classStartHour,
    classStartMinute,
    classDuration,
    classModal
  ) => {
    const clDuration = classDuration
      .split("")
      .slice(0, 2)
      .join("");
    const classHourToMilliseconds = hour => 3600000 * hour;
    const classMinutesInMilliseconds = minutes => 60000 * minutes;
    const classStart =
      classDate +
      classHourToMilliseconds(classStartHour) +
      classMinutesInMilliseconds(classStartMinute);
    const classEnd = `${padToTwo(
      new Date(classStart + classMinutesInMilliseconds(clDuration)).getHours()
    )}:${padToTwo(
      new Date(classStart + classMinutesInMilliseconds(clDuration)).getMinutes()
    )}`;

    if (classModal === "class start") {
      return classStart;
    }
    if (classModal === "class end") {
      return classEnd;
    }
  };

  //taking in consideration a global consence that 1px = 1min
  const calculateCardTopPositioning =
    (props.classTime.hour - props.classInitialAvailableHour) * 60 +
    props.classTime.minutes;
  const calculateCardWidthPositioning = props.classDuration
    .split("")
    .slice(0, 2)
    .join("");
  let cardPosition = {
    top: calculateCardTopPositioning + "px",
    height: calculateCardWidthPositioning + "px"
  };

  return (
    <div className={classes.ClassCard} style={cardPosition}>
      <div>
        <div>
          Start: {padToTwo(props.classTime.hour)}:
          {padToTwo(props.classTime.minutes)} - End:{" "}
          {classElapseHandler(
            props.classDate,
            props.classTime.hour,
            props.classTime.minutes,
            props.classDuration,
            "class end"
          )}
        </div>
        <hr />
        <div>
          {props.classTitle} @ {props.classLocation}
        </div>
      </div>
    </div>
  );
}
