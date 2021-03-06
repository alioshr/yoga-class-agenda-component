import React, {Fragment} from "react";
import classes from "./EventCard.module.css";

export default function ClassCard(props) {
  //adds extra digit(zeros) for numbers upon rendering
  const padToTwo = number => (number <= 9 ? `0${number}` : number);
  //function that calculates the class start or class end
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
  //taking in consideration a global consensus that 1px = 1min below I calculate the position on the card
  //according to the scheduled time
  const calculateCardTopPositioning =
      (props.classTime.hour - props.classInitialAvailableHour) * 60 +
      props.classTime.minutes;
  const calculateCardHeight = props.classDuration
      .split("")
      .slice(0, 2)
      .join("");
  const cardPosition = {
    top: calculateCardTopPositioning + "px",
    height: calculateCardHeight + "px"
  };
  return (

      <Fragment>
        {props.classDate === props.currDay ?
            <div onClick={() => props.displayFullEventCard(props.currDay, calculateCardTopPositioning, calculateCardHeight)}
                 className={classes.EventCard}
                 style={cardPosition}>
              <Fragment>
                Start: {padToTwo(props.classTime.hour)}:
                {padToTwo(props.classTime.minutes)} - End:{" "}
                {classElapseHandler(
                    props.classDate,
                    props.classTime.hour,
                    props.classTime.minutes,
                    props.classDuration,
                    "class end"
                )}
              </Fragment>
              <hr/>
              <Fragment>{props.classTitle} @ {props.classLocation}</Fragment>
            </div> : null
        }
      </Fragment>

  );
}
