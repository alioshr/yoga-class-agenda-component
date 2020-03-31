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
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    componentDidMount = () => {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    };

    render() {
        let renderMonth = null;
        switch (this.props.appViewMode) {
            case("WeekMode") :
                renderMonth = (
                    this.props.newDatesToVerboseHandler(
                        new Date(Math.min(...this.props.currentWeek)),
                        "renderMonth")
                );
                break;
            case ("CalendarMode") :
                renderMonth = (
                    this.props.newDatesToVerboseHandler(
                        new Date(this.props.currentYear,this.props.currentMonth,1),
                        "renderMonth")
                );
                break;
            default:
                switch (this.props.defaultMode) {
                    case("WeekMode") :
                        renderMonth = (
                            this.props.newDatesToVerboseHandler(
                                new Date(Math.min(...this.props.currentWeek)),
                                "renderMonth")
                        );
                        break;
                    case ("CalendarMode") :
                        renderMonth = (
                            this.props.newDatesToVerboseHandler(
                                new Date(this.props.currentYear,this.props.currentMonth,1),
                                "renderMonth")
                        );
                        break;
                    default : alert('there is something wrong here!')
                }
        }

        return (
            <div className={classes.OutStructure}>
                {/*here is display the top title w/ the curr month*/}
                <ViewMode weekMode={this.props.weekMode} monthMode={this.props.monthMode}/>
                <div className={classes.MonthDisplay}>
                    <div
                        className={classes.LeftArrow}
                        onClick={() => this.props.appNavigationHandler("decrement")}
                    />
                    <div
                        className={classes.RightArrow}
                        onClick={() => this.props.appNavigationHandler("increment")}
                    />
                    {renderMonth}
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
}
