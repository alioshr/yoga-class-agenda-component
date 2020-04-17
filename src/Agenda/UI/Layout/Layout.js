import React from "react";
import classes from "./Layout.module.css";
import ViewMode from "../ViewMode/ViewMode";
import RightArrow from "../NavigationButtons/RightArrow/RightArrow";
import LeftArrow from "../NavigationButtons/LeftArrow/LeftArrow";
import AgendaTitles from "../AgendaTitles/AgendaTitles";
import TakeMeHome from "../NavigationButtons/TakeMeHome/TakeMeHome";

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
                        <div className={classes.FirstRow}>
                            <ViewMode
                                weekMode={this.props.weekMode}
                                monthMode={this.props.monthMode}
                                dayMode={this.props.dayMode}/>
                        </div>
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
                        </div>
                        {this.props.appViewMode === "DayMode" ?
                            <AgendaTitles newDatesToVerboseHandler={this.props.newDatesToVerboseHandler}
                                          monthGetter={this.props.monthGetter}
                                          currentMonth={this.props.currentMonth}
                                          currentYear={this.props.currentYear}
                                          currentDay={this.props.currentDay}
                                          appViewMode={this.props.appViewMode}
                                          calendarViewType={this.props.calendarViewType}
                                          displayDayOfTheWeek={true}/> : null}
                        <div className={classes.AgendaInnerStructure}
                             ref={el => this.render((this.container = el))}>
                            {this.props.children}
                        </div>
                    </div>
                );
                break;
            case("SimpleCalendar") :
                calendarViewType = (
                    <div className={classes.OutStructure}>
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
                        <div className={classes.AgendaInnerStructure}
                             ref={el => this.render((this.container = el))}>
                            {this.props.children}
                        </div>
                    </div>
                );
                break;
            default :
                calendarViewType = null;
        }
        return calendarViewType
    }
}
