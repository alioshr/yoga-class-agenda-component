import React from "react";
import classes from "./DayCard.module.css";
import DateCards from "./DateCards.js/DateCards";

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
        <div className={classes.DayHeader}>
          <div className={classes.DayOfTheWeek}>
            {this.props
              .newDatesToVerboseHandler(
                new Date(this.props.today),
                "renderWeekDay"
              )
              .slice(0, 3)}
          </div>
         <DateCards today={this.props.today}/>
        </div>
        <div className={classes.ChildInnerTable}>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
