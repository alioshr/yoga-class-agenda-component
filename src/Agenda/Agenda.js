import React from "react";
import Layout from "./UI/Layout/Layout";
import WeekMode from "./UI/ViewMode/WeekMode/WeekMode";
import CalendarMode from "./UI/ViewMode/CalendarMode/CalendarMode";

export default class Agenda extends React.Component {
  state = {
    appViewMode: "",
    currentWeek: [],
    currentMonth: [],
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

    //logic for month view
    let currentMonth = [today.setHours(0,0,0,0)];
    for(let i = today.getDate(); i > 1; i--){
      currentMonth.unshift(Math.min.apply(null,currentMonth) - oneDay)
    }
    for (let i = today.getDate(); i < new Date(new Date().getFullYear(),new Date().getMonth() + 1, 0).getDate(); i++ ){
      currentMonth.push(Math.max.apply(null,currentMonth) + oneDay)
    }
    for(let i = new Date(Math.min(...currentMonth)).getDay(); i > 0; i-- ) {
      currentMonth.unshift(Math.min.apply(null, currentMonth) - oneDay)
    }
    for(let i = new Date(Math.max(...currentMonth)).getDay(); i < 6; i++ ) {
      currentMonth.push(Math.max.apply(null, currentMonth) + oneDay)
    }
    this.setState({currentMonth});

    //I call this set state to spread the table of empty tabs for each existing hour
    this.setState({
      arrayOfHourTable: this.arrayOfTableRows(
          this.props.agendaInitialAvailableHour,
          this.props.agendaLastAvailableHour
      )
    });
  }



  //the function below spreads the table of existing hours for <EmptyTables/>
  arrayOfTableRows = (startingHour, endingHour) => {
    let arrayOfDailyHoursTable = [startingHour];
    for (let i = startingHour; i < endingHour; i++) {
      arrayOfDailyHoursTable.push(
          Math.max.apply(null, arrayOfDailyHoursTable) + 1
      );
    }
    this.setState({ arrayOfDailyHoursTable });
  };

  //this functions navigates in between weeks
  appNavigationHandler = modal => {
    const oneDay = 86400000;
    if (modal === "increment") {
      if(this.state.appViewMode === "WeekMode" || this.props.defaultMode === "WeekMode") {
        let currentWeek = [Math.max(...this.state.currentWeek) + oneDay];
        for (let i = new Date(...currentWeek).getDay(); i < 6; i++) {
          currentWeek.push(Math.max.apply(null, currentWeek) + oneDay);
        }
        this.setState({currentWeek});
      }

      if(this.state.appViewMode === "CalendarMode" || this.props.defaultMode === "CalendarMode") {
        let currentMonth = [];
        this.state.currentMonth.filter((lastDayOfTheMonth, index) => {
          //if the last day of the calendar is within the current month displayed and it's on the last day of the week
          if (index > 28 && new Date(lastDayOfTheMonth).getDay() === 6 && new Date(lastDayOfTheMonth).getDate() > 26) {
            //init an array with the last day of the calendar + one day so I start w/ the first day of the next calendar
            currentMonth = [lastDayOfTheMonth + oneDay];
            //push the whole calendar
            for (let i = 0; i < 35; i++) {
              currentMonth.push(Math.max.apply(null, currentMonth) + oneDay)
            }
          }
          //if the last day of the calendar is already within the next month
          if (index === 34 && new Date(lastDayOfTheMonth).getDate() < 27) {
            //init an array with the last the of the month
            currentMonth = [lastDayOfTheMonth];
            //spread the last week of the current month
            for (let i = new Date(lastDayOfTheMonth).getDay(); i > 0; i--) {
              currentMonth.unshift(Math.min.apply(null, currentMonth) - oneDay)
            }
            //push the other 4 weeks to build the next month's calendar
            for (let i = 0; i < 28; i++) {
              currentMonth.push(Math.max.apply(null, currentMonth) + oneDay)
            }
          }
        });
        this.setState({currentMonth})
      }
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
        this.setState({currentWeek});
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
  //logic to run the dialog box. This box will handle create class, edit class & view full class card
  displayDialogBoxHandler = (
      day,
      topPositionFromClassCard,
      heigthPositionFromClassCard
  ) => {
    let displayDialogBox;
    let backdropIsActiv;

    if (this.state.dialogBoxData.displayDialogBox !== day && this.state.backdropIsActive !== "cover all") {
      displayDialogBox = day;
      backdropIsActiv = "cover all";
    }
    if (this.state.dialogBoxData.displayDialogBox === day && this.state.backdropIsActive === "cover all") {
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

  viewModeHandler = (appViewMode) => {
    this.setState({appViewMode})
  }

  render() {
    let viewMode = "";
    switch (this.state.appViewMode) {
      case('WeekMode') :
        viewMode = (
            <WeekMode
                arrayOfDailyHoursTable={this.state.arrayOfDailyHoursTable}
                currentWeek={this.state.currentWeek}
                backdropIsActive={this.state.backdropIsActive}
                newDatesToVerboseHandler={this.newDatesToVerboseHandler}
                displayDialogBoxHandler={this.displayDialogBoxHandler}
                backdropDisplayHandler={(data) => this.backdropDisplayHandler(data)}
                dialogBoxData={this.state.dialogBoxData}
                agendaInitialAvailableHour={this.props.agendaInitialAvailableHour}
                layoutWidthDimensions={this.state.layoutWidthDimensions}
                agendaLastAvailableHour={this.props.agendaLastAvailableHour}
                dataToBeRendered={this.props.dataToBeRendered}
            />
        );
        break;
      case('CalendarMode') :
        viewMode = (
            <CalendarMode
                currentMonth={this.state.currentMonth}
                currentWeek={this.state.currentWeek}
                newDatesToVerboseHandler={this.newDatesToVerboseHandler}/>
        );
        break;
      default :
        switch (this.props.defaultMode) {
          case("CalendarMode") :
            viewMode = (
                <CalendarMode
                    currentMonth={this.state.currentMonth}
                    currentWeek={this.state.currentWeek}
                    newDatesToVerboseHandler={this.newDatesToVerboseHandler}/>
            );
            break;
          case("WeekMode") :
            viewMode = (
                <WeekMode
                    arrayOfDailyHoursTable={this.state.arrayOfDailyHoursTable}
                    currentWeek={this.state.currentWeek}
                    backdropIsActive={this.state.backdropIsActive}
                    newDatesToVerboseHandler={this.newDatesToVerboseHandler}
                    displayDialogBoxHandler={this.displayDialogBoxHandler}
                    backdropDisplayHandler={(data) => this.backdropDisplayHandler(data)}
                    dialogBoxData={this.state.dialogBoxData}
                    agendaInitialAvailableHour={this.props.agendaInitialAvailableHour}
                    layoutWidthDimensions={this.state.layoutWidthDimensions}
                    agendaLastAvailableHour={this.props.agendaLastAvailableHour}
                    dataToBeRendered={this.props.dataToBeRendered}
                />
            );
            break;
        }
    }
    return (
        <Layout
            defaultMode={this.props.defaultMode}
            appViewMode={this.state.appViewMode}
            weekMode={() => this.viewModeHandler("WeekMode")}
            monthMode={() => this.viewModeHandler("CalendarMode")}
            callbackContainerDimensions={this.callbackContainerDimensions}
            appNavigationHandler={this.appNavigationHandler}
            newDatesToVerboseHandler={this.newDatesToVerboseHandler}
            currentWeek={this.state.currentWeek}
            currentMonth={this.state.currentMonth}
        >
          {viewMode}
        </Layout>
    );
  }
}
