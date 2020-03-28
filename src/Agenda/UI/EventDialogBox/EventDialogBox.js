import React from "react";
import "./EventDialogBox.css";
import Transition from "react-transition-group/CSSTransition";

export default function EventDialogBox(props) {
  //taking in consideration a global consence that 1px = 1min
  //I initialize variables the total height of the event day elapse duration
  const totalTableHeight =
    (props.classLastAvailableHour - props.classInitialAvailableHour) * 60;
  //I keep subtracting 90 px below when working w/ width
  //as I consider the width of the <SideTab/> to 45px each
  const totalContainerWidth = props.dimsFromLayoutWidth;
  //percentage calculator for logical purposes
  const percentCalc = (percentage, totalValue) =>
    (percentage * totalValue) / 100;

  //init the var responsible for the styling
  let eventDialogBoxPosition = {};
  //positioning logic for the dialog box below
  eventDialogBoxPosition.width =
    percentCalc(61, totalContainerWidth) - 90 + "px";
  eventDialogBoxPosition.height = percentCalc(50, totalTableHeight) + "px";
  //if day is before Wednesday
  if (new Date(props.today).getDay() > 3) {
    delete eventDialogBoxPosition.left;
    eventDialogBoxPosition.right = 0 + "px";
  }
  //If day is equal or higher than Wednesday
  if (new Date(props.today).getDay() <= 3) {
    delete eventDialogBoxPosition.right;
    eventDialogBoxPosition.left = 0 + "px";
  }
  //If the day card is displayed below half of the calendar
  if (props.calculateCardTopPositioning > percentCalc(50, totalTableHeight)) {
    delete eventDialogBoxPosition.top;
    eventDialogBoxPosition.bottom =
      totalTableHeight -
      (props.calculateCardTopPositioning -
        props.calculateCardHeigthPositioning) +
      5 +
      "px";
  }
  //If the day card is displayed above half of the calendar
  if (props.calculateCardTopPositioning < percentCalc(50, totalTableHeight)) {
    delete eventDialogBoxPosition.bottom;
    eventDialogBoxPosition.top =
      props.calculateCardTopPositioning +
      parseInt(props.calculateCardHeigthPositioning, 10) +
      5 +
      "px";
    console.log(
      "not a number",
      parseInt(props.calculateCardHeigthPositioning, 10)
    );
  }
  console.log(eventDialogBoxPosition);
  return (
    <Transition timeout={500} in={props.today === props.currentDate}>
      {state => {
        console.log(state);
        eventDialogBoxPosition.zIndex =
          state === "entering"
            ? 101
            : state === "entered"
            ? 101
            : state === "exiting"
            ? 96
            : state === "exited"
            ? 0
            : 0;

        let animation = {
          transition: "z-index .5s ease-out, opacity .5s ease-out",
          opacity:
            state === "entering"
              ? 1
              : state === "entered"
              ? 1
              : state === "exited"
              ? 0
              : 0,
          zIndex:
            state === "entering"
              ? 101
              : state === "entered"
              ? 101
              : state === "exiting"
              ? 96
              : state === "exited"
              ? -1000
              : 100
        };
        console.log("inside transition", eventDialogBoxPosition);
        return (
          <div
            style={Object.assign(animation, eventDialogBoxPosition)}
            className="DialogBoxContaner"
          >
            {props.children}
          </div>
        );
      }}
    </Transition>
  );
}
