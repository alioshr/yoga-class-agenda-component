import React from "react";
import classes from "./Layout.module.css";
import ViewMode from "../ViewMode/ViewMode";

export default class Layout extends React.Component {
    state = { width: 0, height: 0 };
    updateDimensions = () => {
        this.setState(
            { width: window.innerWidth, height: window.innerHeight },
            () => {
                this.props.callbackContainerDimensions(this.container);
            }
        );
    };

    componentDidMount = () => {
        //should delete this later and use the individual width of each card on WeekMode as I did with the DayMode
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        let calendarViewType;
        switch (this.props.calendarViewType) {
            case ("FullCalendar") :
                calendarViewType = (
                    <div className={classes.OutStructure}>
                        {/*here is display the top title w/ the curr month*/}
                        <ViewMode
                            weekMode={this.props.weekMode}
                            monthMode={this.props.monthMode}
                            dayMode={this.props.dayMode}/>
                        <div className={classes.SecondRow}>
                            <div className={classes.MonthDisplay}>
                                {this.props.appViewMode === "DayMode" ?
                                    `${this.props.newDatesToVerboseHandler(this.props.currentMonth, "renderMonth")}
                                     ${new Date(this.props.currentDay).getDate()}, ${this.props.currentYear}`:
                                    ` ${this.props.newDatesToVerboseHandler(this.props.currentMonth, "renderMonth")}, ${this.props.currentYear}`
                                }
                            </div>
                            <div className={classes.ControlsDisplay}>
                                <div
                                    className={classes.LeftArrow}
                                    onClick={() => this.props.appNavigationHandler("decrement")}
                                />
                                <button onClick={this.props.takeMeToToday}>Today</button>
                                <div
                                    className={classes.RightArrow}
                                    onClick={() => this.props.appNavigationHandler("increment")}
                                />
                            </div>
                        </div>
                        {this.props.appViewMode === "DayMode" ?
                            <div style={{fontSize: "1.8rem", marginBottom: "10px"}} className={classes.MonthDisplay}>
                                {this.props.newDatesToVerboseHandler(new Date(this.props.currentDay).getDay(), "renderWeekDay")}
                            </div> :
                            null}
                        <div
                            className={classes.AgendaInnerStructure}
                            ref={el => this.render((this.container = el))}
                        >
                            {this.props.children}
                        </div>
                    </div>
                );
                break;
            case("SimpleCalendar") :
                calendarViewType = (
                    <div className={classes.OutStructure}>
                        <div className={classes.SecondRow}>

                                <div
                                    className={classes.LeftArrow}
                                    onClick={() => this.props.appNavigationHandler("decrement")}
                                />
                                <div className={classes.MonthDisplay} style={{textAlign: "center"}}>
                                    {this.props.newDatesToVerboseHandler(this.props.currentMonth, "renderMonth")}, {this.props.currentYear}
                                </div>
                                <div
                                    className={classes.RightArrow}
                                    onClick={() => this.props.appNavigationHandler("increment")}
                                />

                        </div>
                        <div
                            className={classes.AgendaInnerStructure}
                            ref={el => this.render((this.container = el))}
                        >
                            {this.props.children}
                        </div>
                    </div>
                );
        }


        return calendarViewType
    }
}
