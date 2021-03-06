import React, {Fragment} from "react";
import classes from "./Layout.module.css";
import ViewMode from "../ViewMode/ViewMode";
import RightArrow from "../NavigationButtons/RightArrow/RightArrow";
import LeftArrow from "../NavigationButtons/LeftArrow/LeftArrow";
import AgendaTitles from "../AgendaTitles/AgendaTitles";
import TakeMeHome from "../NavigationButtons/TakeMeHome/TakeMeHome";
import FullScreenButton from "../FullScreenButton/FullScreenButton";

export default class Layout extends React.Component {
    updateDimensions = () => {
        this.props.callbackContainerDimensions(this.container);
    };
    componentDidMount = () => {
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
                        <div className={classes.HeaderWrapper}>
                            <div className={classes.FirstRow}>
                                <ViewMode
                                    weekMode={this.props.weekMode}
                                    monthMode={this.props.monthMode}
                                    dayMode={this.props.dayMode}/>
                                    <FullScreenButton callbackFullScreen={this.props.callbackFullScreen}/>
                            </div>
                            {this.props.appViewMode !== "DayMode" ?
                                <div className={classes.SecondRow}>
                                    <AgendaTitles newDatesToVerboseHandler={this.props.newDatesToVerboseHandler}
                                                  monthGetter={this.props.monthGetter}
                                                  currentYear={this.props.currentYear}
                                                  currentDay={this.props.currentDay}
                                                  appViewMode={this.props.appViewMode}
                                                  calendarViewType={this.props.calendarViewType}/>
                                    <div className={classes.ControlsDisplay}>
                                        <LeftArrow appNavigationHandler={this.props.appNavigationHandler}/>
                                        <TakeMeHome takeMeToToday={this.props.takeMeToToday}/>
                                        <RightArrow appNavigationHandler={this.props.appNavigationHandler}/>
                                    </div>
                                </div> : null}
                        </div>
                );
                break;
            case("SimpleCalendar") :
                calendarViewType = (
                   <Fragment>
                        <div className={classes.SecondRow}>
                            <LeftArrow appNavigationHandler={this.props.appNavigationHandler}/>
                            <AgendaTitles newDatesToVerboseHandler={this.props.newDatesToVerboseHandler}
                                          monthGetter={this.props.monthGetter}
                                          currentYear={this.props.currentYear}
                                          currentDay={this.props.currentDay}
                                          appViewMode={this.props.appViewMode}
                                          calendarViewType={this.props.calendarViewType}/>
                            <RightArrow appNavigationHandler={this.props.appNavigationHandler}/>
                        </div>
                   </Fragment>
                );
                break;
            default :
                calendarViewType = null;
        }
        return (
            <Fragment>
                <div className={classes.OutStructure}>
                {calendarViewType}
                </div>
                <div className={classes.AgendaInnerStructure}
                     ref={el => this.render((this.container = el))}>
                    {this.props.children}
                </div>
            </Fragment>
        )
    }
}
