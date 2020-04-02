import React from "react";
import Layout from "./UI/Layout/Layout";
import WeekMode from "./UI/ViewMode/WeekMode/WeekMode";
import CalendarMode from "./UI/ViewMode/CalendarMode/CalendarMode";

export default class Agenda extends React.Component {
  state = {
    appViewMode: "",
    currentWeek: [],
    currWeekIndex: 0,
    prevMonthLastWeekIndex: [],
    currentMonth: [],
    monthGetter: new Date().getMonth(),
    yearGetter: new Date().getFullYear(),
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

  componentDidMount(){
    this.calendarLogicHandler();
    this.arrayOfTableRows(this.props.agendaInitialAvailableHour, this.props.agendaLastAvailableHour);
    const appViewMode = this.props.defaultMode;
    this.setState({appViewMode});
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.currentMonth !== this.state.currentMonth) {
      this.weekAgendaLogicHandler();
    }
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

  weekAgendaLogicHandler = () => {
      //finds the week in the current month which contains today's day
      if(this.state.currentMonth[this.state.currWeekIndex].includes(new Date().setHours(0,0,0,0))) {
        let currentWeek = this.state.currentMonth
            .filter(week => week.includes(new Date().setHours(0,0,0,0)))
            .flat();
        //spread this week on the state
        this.setState({currentWeek});
      } else {
        let currentWeek = this.state.currentMonth[this.state.currWeekIndex];
        this.setState({currentWeek});
      }
  };

  weekAgendaNavigationHandler = modal => {
    //init the current week index
    if (modal === "increment") {
      //if the number of weeks incremented does not exceed the amount of weeks in the month
      if(this.state.currWeekIndex < this.state.currentMonth.length -1) {
        this.setState(
            ({currWeekIndex, ...restTop}) => ({
              currWeekIndex: currWeekIndex + 1,
              ...restTop
            }),
            () => {
              this.weekAgendaLogicHandler()
            }
        );
      }
      if(this.state.currWeekIndex === this.state.currentMonth.length -1) {
          this.setState(({currWeekIndex, ...restTop}) => ({
            currWeekIndex: 0,
            ...restTop
          }), () => {
            this.calendarNavigationHandler("increment");
          });
      }
    }
    if (modal === "decrement") {
      if(this.state.currWeekIndex > 0 || (this.state.currWeekIndex > 0 && !this.state.currentWeek.includes(new Date().setHours(0,0,0,0)))) {
        this.setState(
            ({currWeekIndex, ...restTop}) => ({
              currWeekIndex: currWeekIndex - 1,
              ...restTop
            }),
            () => {
              this.weekAgendaLogicHandler();
            }
        );
      };
      if(this.state.currWeekIndex === 0 && !this.state.currentWeek.includes(new Date().setHours(0,0,0,0))) {
        this.calendarNavigationHandler("decrement");
      }
    }
  };

  calendarLogicHandler = () => {
    const oneDay = 86400000;
    const lastDayOfTheMonth = new Date(this.state.yearGetter, this.state.monthGetter + 1, 0).getDate();
    let currentMonth = [new Date(this.state.yearGetter, this.state.monthGetter, 1).valueOf()]; //starts on month day 1
    for(let i = 1; i < lastDayOfTheMonth; i++) { //push the entire month
      currentMonth.push(Math.max.apply(null, currentMonth) + oneDay)
    }
    //localize the first date of the month dates array and check what day of the week it is
    //spread the days of the week, which are the remaining days of prev month to fill calendar first week
    for(let i = new Date(Math.min(...currentMonth)).getDay(); i > 0; i-- ) {
      currentMonth.unshift(Math.min.apply(null, currentMonth) - oneDay)
    }
    //spread the days of the week, which are the remaining days of prev month to fill calendar last week
    for(let i = new Date(Math.max(...currentMonth)).getDay(); i < 6; i++ ) {
      currentMonth.push(Math.max.apply(null, currentMonth) + oneDay)
    }
    let monthInWeeks = [];
    for (let i = 0; i < currentMonth.length; i += 7 ) {
      let chunk = currentMonth.slice(i, i+7 );
      monthInWeeks.push(chunk)
    }
    currentMonth = monthInWeeks;
    this.setState({currentMonth});
  };

  calendarNavigationHandler = modal => {
    if(modal === "increment") {

      //saving the max index of curr month before incrementing
      this.setState(({prevMonthLastWeekIndex, ...restTop}) => ({
        prevMonthLastWeekIndex: [...prevMonthLastWeekIndex, this.state.currentMonth.length -1],
        ...restTop
      }), () => this.setState({currWeekIndex: 0}));

      if(this.state.monthGetter < 11) { //just add months, before changing the year
        this.setState(({monthGetter, ...restTop}) => ({
          monthGetter: monthGetter + 1,
          ...restTop
        }), () => this.calendarLogicHandler());
      }

      if(this.state.monthGetter >= 11) {//if the month is december it resets the month and increments the year
        this.setState(({yearGetter, monthGetter, ...restTop}) => ({
          yearGetter: yearGetter + 1,
          monthGetter: 0,
          ...restTop
        }), () => this.calendarLogicHandler())
      }
    }
    if (modal === "decrement") {

      if(this.state.appViewMode === "WeekMode") {
        //saving the max index of curr month before incrementing
        this.setState({currWeekIndex: this.state.prevMonthLastWeekIndex[this.state.prevMonthLastWeekIndex.length -1]}, () => {
          this.setState(({prevMonthLastWeekIndex, ...restTop}) => ({
            prevMonthLastWeekIndex: [...prevMonthLastWeekIndex.slice(0, -1)],
            ...restTop
          }));
        });
      }

      if(this.state.appViewMode === "CalendarMode") {
        //saving the max index of curr month before incrementing
        this.setState({currWeekIndex: 0}, () => {
          this.setState(({prevMonthLastWeekIndex, ...restTop}) => ({
            prevMonthLastWeekIndex: [...prevMonthLastWeekIndex.slice(0, -1)],
            ...restTop
          }));
        });
      }


      //just subtract months, before changing the year, if the current day is not present in the current calendar month.
      if(this.state.monthGetter > 0 && !this.state.currentMonth.flat().includes(new Date().setHours(0,0,0,0).valueOf())) {
        this.setState(({monthGetter, ...restTop}) => ({
          monthGetter: monthGetter - 1,
          ...restTop
        }), () => this.calendarLogicHandler());
      }

      if(this.state.monthGetter <= 0) {//if the month is december it resets the month and increments the year
        this.setState(({yearGetter, monthGetter, ...restTop}) => ({
          yearGetter: yearGetter - 1,
          monthGetter: 11,
          ...restTop
        }), () => this.calendarLogicHandler())
      }
    }
  };

  //this functions navigates in between weeks
  appNavigationHandler = modal => {
    if(this.state.appViewMode === "WeekMode") {
      this.weekAgendaNavigationHandler(modal)
    }
    if(this.state.appViewMode === "CalendarMode") {
      this.calendarNavigationHandler(modal)
    }
  };

  //this function does the verbose work for my days to appear nicely
  newDatesToVerboseHandler = (date, verboseType) => {
    let renderWeekDay = date.toString().length > 2 ?
        date.getDay() : date;
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

    let renderMonth =  date.toString().length > 2 ?
        date.getMonth() : date;

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

      case 11:
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
  backdropDisplayHandler = (day) => {
    this.setState(({ backdropIsActive, dialogBoxData, ...restTop }) => ({
      backdropIsActive: day,
      dialogBoxData: {
        displayDialogBox: false
      },
      ...restTop
    }));
  };
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
  };

  render() {
    let viewMode = "";
    const weekMode = (
        <WeekMode
            arrayOfDailyHoursTable={this.state.arrayOfDailyHoursTable}
            backdropIsActive={this.state.backdropIsActive}
            newDatesToVerboseHandler={this.newDatesToVerboseHandler}
            displayDialogBoxHandler={this.displayDialogBoxHandler}
            backdropDisplayHandler={(data) => this.backdropDisplayHandler(data)}
            dialogBoxData={this.state.dialogBoxData}
            agendaInitialAvailableHour={this.props.agendaInitialAvailableHour}
            layoutWidthDimensions={this.state.layoutWidthDimensions}
            agendaLastAvailableHour={this.props.agendaLastAvailableHour}
            dataToBeRendered={this.props.dataToBeRendered}
            currentWeek={this.state.currentWeek}
            monthGetter={this.state.monthGetter}
        />
    );
    let calendarMode = (
        <CalendarMode
            monthGetter={this.state.monthGetter}
            currentMonth={this.state.currentMonth}
            currentWeek={this.state.currentWeek}
            newDatesToVerboseHandler={this.newDatesToVerboseHandler}/>
    )
    switch (this.state.appViewMode) {
      case('WeekMode') :
        viewMode = weekMode;
        break;
      case('CalendarMode') :
        viewMode = calendarMode;
        break;
      default :
        switch (this.props.defaultMode) {
          case("CalendarMode") :
            viewMode = calendarMode;
            break;
          case("WeekMode") :
            viewMode = weekMode;
            break;
          default : alert("there is something wrong here!")
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
            currentMonth={this.state.monthGetter}
            currentYear={this.state.yearGetter}
        >
          {viewMode}
        </Layout>
    );
  }
}
