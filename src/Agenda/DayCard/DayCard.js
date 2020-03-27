import React from "react";
import classes from "./DayCard.module.css";

export default class Day extends React.Component {
  render() {
    let todayStyle;
    if (
      new Date(this.props.today).getDate() === new Date().getDate() &&
      new Date(this.props.today).getMonth() === new Date().getMonth()
    ) {
      todayStyle = { backgroundColor: "#f56157", color: "white" };
    }
    let temporaryRemoveBackgroundHoverColor = {};
    if (this.props.backdropIsActive === "cover all") {
      temporaryRemoveBackgroundHoverColor.backgroundColor = "white";
    }
    return (
      <div
        className={classes.DayCard}
        style={temporaryRemoveBackgroundHoverColor}
      >
        <div className={classes.DayHeader}>
          <div className={classes.DayOfTheWeek}>
            {this.props
              .newDatesToVerboseHandler(
                new Date(this.props.today),
                "renderWeekDay"
              )
              .slice(0, 3)}
          </div>
          <div className={classes.Day} style={todayStyle}>
            {new Date(this.props.today).getDate()}
          </div>
        </div>
        <div className={classes.ChildInnerTable}>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
