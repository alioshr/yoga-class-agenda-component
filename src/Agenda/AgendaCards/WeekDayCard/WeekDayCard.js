import React from "react";
import classes from "./WeekDayCard.module.css";
import DateCards from "../DateCards.js/DateCards";
import DayOfTheWeekCard from "../DayOfTheWeekCard/DayOfTheWeekCard";
import DayHeader from "../DayHeader/DayHeader";

export default class Day extends React.Component {
  render() {

    let temporaryRemoveBackgroundHoverColor = {};
    if (this.props.backdropIsActive === "cover all") {
      temporaryRemoveBackgroundHoverColor.backgroundColor = "white";
    }
    return (
      <div
        className={classes.DayCard}
        style={temporaryRemoveBackgroundHoverColor}
      >
          <DayHeader>
          <DayOfTheWeekCard
              newDatesToVerboseHandler={this.props.newDatesToVerboseHandler}
              today={this.props.today}/>
         <DateCards today={this.props.today} nonMonthDates={{}}/>
          </DayHeader>
        <div className={classes.ChildInnerTable}>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
