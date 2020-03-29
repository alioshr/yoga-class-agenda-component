import React from "react";
import "./EventDialogBox.css";

export default function EventDialogBox(props) {
  //taking in consideration a global consensus that 1px = 1min
  //I initialize variables the total height of the event day elapse duration
  const totalTableHeight = (props.classLastAvailableHour - props.classInitialAvailableHour) * 60;
  //I keep subtracting 90 px below when working w/ width
  //as I consider the width of the <SideTab/> to 45px each
  const totalContainerWidth = props.dimsFromLayoutWidth;
  //percentage calculator for logical purposes
  const percentCalc = (percentage, totalValue) => (percentage * totalValue) / 100;
  //init the var responsible for the styling
  let eventDialogBoxPosition = {};
  //positioning logic for the dialog box below
  eventDialogBoxPosition.top = 0;
  eventDialogBoxPosition.width = percentCalc(61, totalContainerWidth) - 90 + "px";
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
  if (props.calculateCardTopPositioning > 0 && props.calculateCardTopPositioning > percentCalc(50, totalTableHeight)) {
    delete eventDialogBoxPosition.top;
    eventDialogBoxPosition.bottom =
        totalTableHeight -
        (props.calculateCardTopPositioning -
            props.calculateCardHeigthPositioning) +
        5 +
        "px";
  }
  //If the day card is displayed above half of the calendar
  if (props.calculateCardTopPositioning > 0 &&props.calculateCardTopPositioning < percentCalc(50, totalTableHeight)) {
    delete eventDialogBoxPosition.bottom;
    eventDialogBoxPosition.top =
        props.calculateCardTopPositioning +
        parseInt(props.calculateCardHeigthPositioning, 10) +
        5 +
        "px";
  }
  return (
      <div
          style={Object.assign(props.animation, eventDialogBoxPosition)}
          className="DialogBoxContainer"
      >
        {props.children}
      </div>
  );
}
