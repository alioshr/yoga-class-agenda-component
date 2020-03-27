import React from "react";
import "./EventDialogBox.css";

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
  if (new Date(props.currentDate).getDay() > 3) {
    delete eventDialogBoxPosition.left;
    eventDialogBoxPosition.right = 0 + "px";
  }

  if (new Date(props.currentDate).getDay() <= 3) {
    delete eventDialogBoxPosition.right;
    eventDialogBoxPosition.left = 0 + "px";
  }
  if (props.calculateCardTopPositioning > percentCalc(50, totalTableHeight)) {
    eventDialogBoxPosition.bottom =
      totalTableHeight -
      (props.calculateCardTopPositioning -
        props.calculateCardHeigthPositioning) +
      5 +
      "px";
  }
  if (props.calculateCardTopPositioning < percentCalc(50, totalTableHeight)) {
    eventDialogBoxPosition.top =
      props.calculateCardTopPositioning +
      parseInt(props.calculateCardHeigthPositioning, 10) +
      5 +
      "px";
  }

  return (
    <div style={eventDialogBoxPosition} className="DialogBoxContaner">
      {props.children}
    </div>
  );
}
