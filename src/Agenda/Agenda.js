import React from "react";
import DayCard from "./DayCard/DayCard";
import TimeTables from "./TimeTables/TimeTables";
import EventCard from "./EventCard/EventCard";
import SideTab from "./SideTab/SideTab";
import Layout from "./UI/Layout/Layout";
import BackdropFilter from "./UI/BackdropFilter/BackdropFilter";
import Button from "./UI/Button/Button";
import EventDialogBox from "./UI/EventDialogBox/EventDialogBox";

export default class Agenda extends React.Component {
  state = {
    currentWeek: [],
    arrayOfDailyHoursTable: [],
    backdropIsActive: false,

    dialogBoxData: {
      displayDialogBox: false,
      topPositionFromClassCard: "",
      heigthPositionFromClassCard: ""
    },
    layoutWidthDimensions: {
      width: ""
    }
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
  //by clicking inside a event day card activates the backdrop for that day so I can edit the events or ad new ones
  backdropDisplayHandler(day) {
    if (day) {
      this.setState(({ backdropIsActive, dialogBoxData, ...restTop }) => ({
        backdropIsActive: day,
        dialogBoxData: {
          displayDialogBox: false
        },
        ...restTop
      }));
    }
  }

  displayDialogBoxHandler = (
    day,
    topPositionFromClassCard,
    heigthPositionFromClassCard
  ) => {
    let displayDialogBox;
    let backdropIsActiv;

    if (
      this.state.dialogBoxData.displayDialogBox !== day &&
      this.state.backdropIsActive !== "cover all"
    ) {
      displayDialogBox = day;
      backdropIsActiv = "cover all";
    }

    if (
      this.state.dialogBoxData.displayDialogBox === day &&
      this.state.backdropIsActive === "cover all"
    ) {
      displayDialogBox = false;
      backdropIsActiv = "false";
    }

    this.setState(({ dialogBoxData, backdropIsActive, ...restTop }) => ({
      dialogBoxData: {
        displayDialogBox: displayDialogBox,
        topPositionFromClassCard: topPositionFromClassCard,
        heigthPositionFromClassCard: heigthPositionFromClassCard
      },
      backdropIsActive: backdropIsActiv,
      ...restTop
    }));
  };

  callbackContainerDimensions = container => {
    this.setState(({ layoutWidthDimensions, ...restTop }) => ({
      layoutWidthDimensions: {
        width: container.offsetWidth
      },
      ...restTop
    }));
  };

  render() {
    return (
      <Layout
        callbackContainerDimensions={this.callbackContainerDimensions}
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
          return (
            <DayCard
              backdropIsActive={this.state.backdropIsActive}
              key={day}
              today={day}
              newDatesToVerboseHandler={this.newDatesToVerboseHandler}
            >
              {this.state.backdropIsActive === "cover all" ? (
                <BackdropFilter
                  backdropDisplayHandler={() =>
                    this.backdropDisplayHandler("false")
                  }
                />
              ) : null}
              <TimeTables
                backdropDisplayHandler={() => this.backdropDisplayHandler(day)}
                tableOfAvailableHours={this.state.arrayOfDailyHoursTable}
              />
              {this.state.backdropIsActive === day ? (
                <BackdropFilter
                  backdropDisplayHandler={() =>
                    this.backdropDisplayHandler("false")
                  }
                >
                  <Button
                    ButtonText="Create a New Class"
                    buttonClicked={() => this.displayDialogBoxHandler(day)}
                  />
                </BackdropFilter>
              ) : null}
              {this.props.dataToBeRendered.map(cl => {
                if (cl.classDate === day) {
                  return (
                    <EventCard
                      zIndexIFClicked={
                        this.state.dialogBoxData.displayDialogBox
                      }
                      currDay={day}
                      classDate={cl.classDate}
                      classTitle={cl.classTitle}
                      classLocation={cl.location}
                      classDuration={cl.duration}
                      classTime={cl.classTime}
                      classInitialAvailableHour={
                        this.props.agendaInitialAvailableHour
                      }
                      key={cl.id}
                      displayFullEventCard={this.displayDialogBoxHandler}
                    />
                  );
                }
                if (this.state.dialogBoxData.displayDialogBox === day) {
                  return (
                    <EventDialogBox
                      currentDate={this.state.dialogBoxData.displayDialogBox}
                      dimsFromLayoutWidth={
                        this.state.layoutWidthDimensions.width
                      }
                      key={cl.id}
                      calculateCardTopPositioning={
                        this.state.dialogBoxData.topPositionFromClassCard
                      }
                      calculateCardHeigthPositioning={
                        this.state.dialogBoxData.heigthPositionFromClassCard
                      }
                      classInitialAvailableHour={
                        this.props.agendaInitialAvailableHour
                      }
                      classLastAvailableHour={
                        this.props.agendaLastAvailableHour
                      }
                    />
                  );
                }
              })}
            </DayCard>
          );
        })}
        <SideTab />
      </Layout>
    );
  }
}
