import React from "react";
import classes from "./WeekDayCard.module.css";
import DateCards from "../../../../AgendaCards/DateCards.js/DateCards";
import DayOfTheWeekCard from "../../../../AgendaCards/DayOfTheWeekCard/DayOfTheWeekCard";
import DayHeader from "../../../../AgendaCards/DayHeader/DayHeader";

export default class Day extends React.Component {
    state = { width: 0, height: 0 };

    updateDimensions = () => {
        this.setState(
            { width: window.innerWidth, height: window.innerHeight },
            () => {
                this.props.callbackDayCardContainerDimensions(this.container);
            }
        );
    };
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    componentDidMount = () => {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    };

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
         <DateCards today={this.props.today}
                    monthGetter={this.props.monthGetter}
                    newDatesToVerboseHandler={this.props.newDatesToVerboseHandler}/>
          </DayHeader>
        <div
            className={classes.ChildInnerTable}
            ref={el => this.render((this.container = el))}
        >
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
