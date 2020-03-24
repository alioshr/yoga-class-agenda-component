import React from "react";
import Day from "./Day/Day";
import TimeTables from "./TimeTables/TimeTables";
import EventCard from "./EventCard/EventCard";
import SideTab from "./SideTab/SideTab";
import Layout from "./UI/Layout";

export default class Agenda extends React.Component {
  state = {
    currentWeek: [],
    arrayOfDailyHoursTable: []
  };

  componentDidMount() {
    //here I set oneDay to get one day in ms & today to use as ref for dates
    const oneDay = 86400000;
    const today = new Date();
    //logic that fills the <Day> cards in the agenda
    let currentWeek = [today.setHours(0, 0, 0, 0)];
    for (let i = today.getDay(); i > 0; i--) {
      currentWeek.unshift(Math.min.apply(null, currentWeek) - oneDay);
    }
    for (let i = today.getDay(); i < 6; i++) {
      currentWeek.push(Math.max.apply(null, currentWeek) + oneDay);
    }
    this.setState({ currentWeek });

    //I call this set state to spread the table of empty tabs for each existing hour
    this.setState({
      arrayOfHourTable: this.arrayOfHourTable(
        this.props.agendaInitialAvailableHour,
        this.props.agendaLastAvailableHour
      )
    });
  }
  //the function below spreads the table of existing hours for <EmptyTables/>
  arrayOfHourTable = (startingHour, endingHour) => {
    let arrayOfDailyHoursTable = [startingHour];
    for (let i = startingHour; i < endingHour; i++) {
      arrayOfDailyHoursTable.push(
        Math.max.apply(null, arrayOfDailyHoursTable) + 1
      );
    }
    this.setState({ arrayOfDailyHoursTable });
  };

  //this functions navigates in between weeks
  weekNavigationHandler = modal => {
    const oneDay = 86400000;
    if (modal === "increment") {
      let currentWeek = [Math.max(...this.state.currentWeek) + oneDay];
      for (let i = new Date(...currentWeek).getDay(); i < 6; i++) {
        currentWeek.push(Math.max.apply(null, currentWeek) + oneDay);
      }
      this.setState({ currentWeek });
    }

    if (modal === "decrement") {
      let currentWeek = [Math.min(...this.state.currentWeek) - oneDay];
      for (let i = new Date(...currentWeek).getDay(); i > 0; i--) {
        currentWeek.unshift(Math.min.apply(null, currentWeek) - oneDay);
      }
      if (
        !this.state.currentWeek.includes(
          new Date().setHours(0, 0, 0, 0).valueOf()
        )
      ) {
        this.setState({ currentWeek });
      }
    }
  };

  //this function does the verbose work for my days to appear nicely
  newDatesToVerboseHandler = (date, verboseType) => {
    let renderWeekDay = date.getDay();
    switch (renderWeekDay) {
      case 0:
        renderWeekDay = "Sunday";
        break;

      case 1:
        renderWeekDay = "Monday";
        break;

      case 2:
        renderWeekDay = "Tuesday";
        break;

      case 3:
        renderWeekDay = "Wednesday";
        break;

      case 4:
        renderWeekDay = "Thursday";
        break;

      case 5:
        renderWeekDay = "Friday";
        break;

      case 6:
        renderWeekDay = "Saturday";
        break;
      default:
        renderWeekDay = null;
    }

    let renderMonth = date.getMonth();

    switch (renderMonth) {
      case 0:
        renderMonth = "January";
        break;

      case 1:
        renderMonth = "February";
        break;

      case 2:
        renderMonth = "March";
        break;

      case 3:
        renderMonth = "April";
        break;

      case 4:
        renderMonth = "May";
        break;

      case 5:
        renderMonth = "June";
        break;

      case 6:
        renderMonth = "July";
        break;

      case 7:
        renderMonth = "August";
        break;

      case 8:
        renderMonth = "September";
        break;

      case 9:
        renderMonth = "October";
        break;

      case 10:
        renderMonth = "November";
        break;

      case 12:
        renderMonth = "December";
        break;
      default:
        renderMonth = null;
    }

    if (verboseType === "renderWeekDay") {
      return renderWeekDay;
    }
    if (verboseType === "renderMonth") {
      return renderMonth;
    }
  };
  render() {
    return (
      <Layout
        weekNavigationHandler={this.weekNavigationHandler}
        newDatesToVerboseHandler={this.newDatesToVerboseHandler}
        currentWeek={this.state.currentWeek}
      >
        <SideTab>
          <TimeTables
            style={{ color: "black", border: "none" }}
            tableOfAvailableHours={this.state.arrayOfDailyHoursTable}
          />
        </SideTab>
        {this.state.currentWeek.map(day => {
          let todayStyle;
          if (
            new Date(day).getDate() === new Date().getDate() &&
            new Date(day).getMonth() === new Date().getMonth()
          ) {
            todayStyle = { backgroundColor: "#f56157", color: "white" };
          }
          return (
            <Day
              styleToday={todayStyle}
              key={day}
              today={day}
              newDatesToVerboseHandler={this.newDatesToVerboseHandler}
            >
              <TimeTables
                tableOfAvailableHours={this.state.arrayOfDailyHoursTable}
              />
              {this.props.dataToBeRendered.map(cl => {
                if (cl.classDate === day) {
                  return (
                    <EventCard
                      classDate={cl.classDate}
                      classTitle={cl.classTitle}
                      classLocation={cl.location}
                      classDuration={cl.duration}
                      classTime={cl.classTime}
                      classInitialAvailableHour={
                        this.props.agendaInitialAvailableHour
                      }
                      key={cl.id}
                    />
                  );
                }
              })}
            </Day>
          );
        })}
        <SideTab />
      </Layout>
    );
  }
}
