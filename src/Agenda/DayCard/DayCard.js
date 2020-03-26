import React from "react";
import classes from "./DayCard.module.css";

export default class Day extends React.Component {
  render() {
    return (
      <div className={classes.DayCard}>
        <div className={classes.DayHeader}>
          <div className={classes.DayOfTheWeek}>
            {this.props
              .newDatesToVerboseHandler(
                new Date(this.props.today),
                "renderWeekDay"
              )
              .slice(0, 3)}
          </div>
          <div className={classes.Day} style={this.props.styleToday}>
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
