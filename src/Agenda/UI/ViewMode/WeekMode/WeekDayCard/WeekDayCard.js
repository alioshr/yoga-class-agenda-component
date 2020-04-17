import React from "react";
import classes from "./WeekDayCard.module.css";
import DateCards from "../../../../Components/AgendaCards/DateCards.js/DateCards";
import DayOfTheWeekCard from "../../../../Components/AgendaCards/DayOfTheWeekCard/DayOfTheWeekCard";
import DayHeader from "../../../../Components/AgendaCards/DayHeader/DayHeader";

export default class Day extends React.Component {

    render() {
        return (
            <div className={classes.DayCard}>
                <DayHeader>
                    <DayOfTheWeekCard
                        style={{fontSize: "1.2rem"}}
                        newDatesToVerboseHandler={this.props.newDatesToVerboseHandler}
                        today={this.props.today}/>
                    <DateCards today={this.props.today}
                               monthGetter={this.props.monthGetter}
                               newDatesToVerboseHandler={this.props.newDatesToVerboseHandler}/>
                </DayHeader>
                <div className={classes.ChildInnerTable}>
                    <React.Fragment>{this.props.children}</React.Fragment>
                </div>
            </div>
        );
    }
}
