import React from "react";
import Layout from "../../UI/Layout/Layout";
import WeekMode from "../../UI/ViewMode/WeekMode/WeekMode";
import CalendarMode from "../../UI/ViewMode/CalendarMode/CalendarMode";
import DayMode from "../../UI/ViewMode/DayMode/DayMode";

export default class Agenda extends React.Component {
  state = {
    appViewMode: '',
    currentMonth: [],
    currentWeek: [],
    currWeekIndex: "initial",
    prevMonthLastWeekIndex: [],
    currentDay: '',
    currentDayIndex: "initial",
    prevWeekLastDayIndex: [],
    monthGetter: new Date().getMonth(),
    yearGetter: new Date().getFullYear(),
    arrayOfDailyHoursTable: [],
    dialogBoxData: {
      displayDialogBox: false,
      topPositionFromClassCard: "",
      heigthPositionFromClassCard: ""
    },
    layoutWidthDimensions: {
      width: "",
    }
  };

  componentDidMount(){
    this.calendarLogicHandler();
    this.arrayOfTableRows(this.props.agendaInitialAvailableHour, this.props.agendaLastAvailableHour);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.currentMonth !== this.state.currentMonth) {
      const currWeekIndex =  this.state.currentMonth.findIndex(week => week.includes(new Date().setHours(0,0,0,0)));
      if(currWeekIndex !== -1 && (prevState.currWeekIndex === 'initial' || this.state.appViewMode === "CalendarMode")) {
        this.setState({currWeekIndex}, () => this.weekAgendaLogicHandler())
      } else {
        this.weekAgendaLogicHandler()
      }
    }
    if(prevState.currentWeek !== this.state.currentWeek) {
      //code that finds the current present day withing the current week set by the CalendarMode, initial state render or WeekMode
      const currentDayIndex = this.state.currentWeek.findIndex(day => day === new Date().setHours(0,0,0,0));
      if(currentDayIndex !== -1 && (prevState.currentDayIndex === 'initial' || this.state.appViewMode === "CalendarMode" || this.state.appViewMode === "WeekMode")) {
        this.setState({currentDayIndex}, () => this.dayModeLogicHandler())
        //if the present day is not found within a current week, it will just execute the day mode logic handler normally.
      } else {
        this.dayModeLogicHandler()
      }
    }
    //only set app view mode after spreading all the state through all modes
    if(prevState.currentDay !== this.state.currentDay && prevState.currentDay === '') {
      const appViewMode = this.props.defaultMode;
      this.setState({appViewMode}, () => this.state.appViewMode);
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

  dayModeLogicHandler = () => {

    const currentWeek = this.state.currentWeek.filter(day => new Date(day).getMonth() === this.state.monthGetter);
    const currentDay = currentWeek[this.state.currentDayIndex];
    this.setState({currentDay});
  };

  dayAgendaNavigationHandler = modal => {
    const filteredCurrentWeek = this.state.currentWeek.filter(day => new Date(day).getMonth() === this.state.monthGetter);
    if(modal === 'increment') {
      if(this.state.currentDayIndex < filteredCurrentWeek.length -1) {
        this.setState(({currentDayIndex, ...restTop}) => ({
          currentDayIndex: currentDayIndex + 1,
          ...restTop
        }), () => this.dayModeLogicHandler())
      }
      if(this.state.currentDayIndex === filteredCurrentWeek.length -1) {
        this.setState(({currentDayIndex, ...restTop}) => ({
          currentDayIndex: 0,
          ...restTop
        }), () => this.weekAgendaNavigationHandler('increment'))
      }
    }
    if(modal === 'decrement' && this.state.currentDay !== new Date().setHours(0,0,0,0)) {
      if(this.state.currentDayIndex > 0) {
        this.setState(({currentDayIndex, ...restTop}) => ({
          currentDayIndex: currentDayIndex - 1,
          ...restTop
        }), () => this.dayModeLogicHandler())
      }
      if(this.state.currentDayIndex === 0) {
        this.weekAgendaNavigationHandler("decrement")
      }
    }
  };

  weekAgendaLogicHandler = () => {
    const currentWeek = this.state.currentMonth[this.state.currWeekIndex];
    this.setState({currentWeek});
  };

  weekAgendaNavigationHandler = modal => {
    //init the current week index
    if (modal === "increment") {
      this.setState(({prevWeekLastDayIndex, ...restTop}) => ({
        prevWeekLastDayIndex: [...prevWeekLastDayIndex, this.state.currentWeek.filter(day =>
            new Date(day).getMonth() === this.state.monthGetter).length-1],
        ...restTop
      }),() => this.setState({currentDayIndex: 0}));
      //if the number of weeks incremented does not exceed the amount of weeks in the month
      if(this.state.currWeekIndex < this.state.currentMonth.length -1) {
        this.setState(
            ({currWeekIndex, ...restTop}) => ({
              currWeekIndex: currWeekIndex + 1,
              ...restTop
            }),
            () => this.weekAgendaLogicHandler());
      }
      if(this.state.currWeekIndex === this.state.currentMonth.length -1) {
        this.setState(({currWeekIndex, ...restTop}) => ({
          currWeekIndex: 0,
          ...restTop
        }), () => this.calendarNavigationHandler("increment"));
      }
    }

    if (modal === "decrement" && !this.state.currentWeek.includes(new Date().setHours(0,0,0,0))) {
      if(this.state.appViewMode === "WeekMode") {
        this.setState({currentDayIndex: 0})
      }
      if(this.state.appViewMode === "DayMode") {
        this.setState({currentDayIndex: this.state.prevWeekLastDayIndex[this.state.prevWeekLastDayIndex.length -1]}, () => {
          this.setState(({prevWeekLastDayIndex, ...restTop}) => ({
            prevWeekLastDayIndex: [...prevWeekLastDayIndex.slice(0, -1)],
            ...restTop
          }))
        });
      }
      if(this.state.currWeekIndex > 0) {
        this.setState(
            ({currWeekIndex, ...restTop}) => ({
              currWeekIndex: currWeekIndex - 1,
              ...restTop
            }),
            () => {
              this.weekAgendaLogicHandler();
            })}

      if(this.state.currWeekIndex === 0) {
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
      if(this.state.appViewMode === "CalendarMode") {
        //increment all last index positions for the remaining weeks of a month to serve the DayMode index positioning
        const currentWeekIndex = this.state.currWeekIndex;
        this.setState(({prevWeekLastDayIndex, ...restTop}) => ({
          prevWeekLastDayIndex: [
              ...prevWeekLastDayIndex,
            ...this.state.currentMonth
              .map(week => week.filter(day => new Date(day).getMonth() === this.state.monthGetter).length -1)
                .slice(currentWeekIndex)
          ],
          ...restTop
        }));
      }
      //saving the max index of curr month before incrementing
      this.setState(({prevMonthLastWeekIndex, ...restTop}) => ({
        prevMonthLastWeekIndex: [...prevMonthLastWeekIndex, this.state.currentMonth.length -1],
        ...restTop
      }), () =>
        this.setState(({currWeekIndex, currentDayIndex, ...restTop}) => ({
          currentDayIndex: 0,
          currWeekIndex: 0,
          ...restTop
        }))
      );
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
      if(this.state.appViewMode === "WeekMode" || this.state.appViewMode === "DayMode") {
        //saving the max index of curr month before incrementing
        this.setState({currWeekIndex: this.state.prevMonthLastWeekIndex[this.state.prevMonthLastWeekIndex.length -1]}, () => {
          this.setState(({prevMonthLastWeekIndex, ...restTop}) => ({
            prevMonthLastWeekIndex: [...prevMonthLastWeekIndex.slice(0, -1)],
            ...restTop
          }));
        });
      }
      if(this.state.appViewMode === "CalendarMode") {
        // removing all the week's indexes saved in this.state.prevMonthLastWeekIndex
        // that will come after the first week of the month being rendered upon decrementing
        // so If navigating backwards in DayMode, It will have the proper reference of the last week's index
        const currentWeekIndex = this.state.currWeekIndex;
        const prevMonthLastWeekIndex = this.state.prevMonthLastWeekIndex[this.state.prevMonthLastWeekIndex.length -1];
        const prevWeekLastDayIndexLength = this.state.prevWeekLastDayIndex.length -1;
        this.setState(({prevWeekLastDayIndex, ...restTop}) => ({
          prevWeekLastDayIndex: [...prevWeekLastDayIndex.slice(0, prevWeekLastDayIndexLength - currentWeekIndex - prevMonthLastWeekIndex)],
          ...restTop
        }));
        //saving the max index of curr month before incrementing
        this.setState(({currWeekIndex, currentDayIndex, ...restTop}) => ({
          currentDayIndex: 0,
          currWeekIndex: 0,
          ...restTop
        }), () => {
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
      //if the month is december it resets the month and increments the year
      if(this.state.monthGetter <= 0) {
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
    if(this.state.appViewMode === "DayMode") {
      this.dayAgendaNavigationHandler(modal)
    }
  };

  takeMeToToday = () => {


      this.setState(({yearGetter, monthGetter, currWeekIndex, currentDayIndex, prevWeekLastDayIndex, prevMonthLastWeekIndex,...restTop}) => ({
        yearGetter : new Date().getFullYear(),
        monthGetter: new Date().getMonth(),
        currWeekIndex: 'initial',
        currentDayIndex: 'initial',
        prevWeekLastDayIndex: [],
        prevMonthLastWeekIndex: [],
        ...restTop
      }), () => {
        this.calendarLogicHandler();
      })
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
  //logic to run the dialog box. This box will handle create class, edit class & view full class card
  displayDialogBoxHandler = (
      day,
      topPositionFromClassCard,
      heigthPositionFromClassCard
  ) => {
    let displayDialogBox;
    if (this.state.dialogBoxData.displayDialogBox !== day) displayDialogBox = day;
    if (this.state.dialogBoxData.displayDialogBox === day) displayDialogBox = false;
    this.setState(({ dialogBoxData, ...restTop }) => ({
      dialogBoxData: {
        displayDialogBox,
        topPositionFromClassCard: topPositionFromClassCard,
        heigthPositionFromClassCard: heigthPositionFromClassCard
      },
      ...restTop
    }));
  };

  callbackContainerDimensions = container => {
    this.setState(({ layoutWidthDimensions, ...restTop }) => ({
      layoutWidthDimensions: {
        width: container.offsetWidth,
      },
      ...restTop
    }));
  };

  viewModeHandler = (appViewMode) => {
    this.setState({appViewMode})
  };

  goToClickedDate = clickedDate => {
       if(this.state.appViewMode === "WeekMode") {
         this.setState(({appViewMode, currentDayIndex, ...restTop}) => ({
           appViewMode: "DayMode",
           currentDayIndex: this.state.currentWeek.indexOf(clickedDate),
           ...restTop
         }), () => this.dayModeLogicHandler())
       }
      if(this.state.appViewMode === "CalendarMode" || this.state.appViewMode === "DayMode") {
        const currDayIndex = this.state.currentMonth
            .map(week => week.filter(day => new Date(day).getMonth() === this.state.monthGetter))
            .filter(week => week.includes(clickedDate))
            .flat().indexOf(clickedDate);
        const currentWeekIndex = this.state.currentMonth.findIndex(week => week.includes(clickedDate));
        this.setState(({currWeekIndex, appViewMode, currentDayIndex, ...restTop}) => ({
          appViewMode: "DayMode",
          currWeekIndex: currentWeekIndex,
          currentDayIndex: currDayIndex,
          ...restTop
        }), () => {
          //must check if keeping both logic will work
          this.weekAgendaLogicHandler();
          this.dayModeLogicHandler();
          //**MUST REMEMBER TOMORROW - PREVWEEKLASTDAY IS OVERWRITTING THE AMOUNT OF WEEKS FROM ORIGIN!!!
          const currentMonthIncludesCurrentDay = this.state.currentMonth
              .some(week => week.includes(new Date().setHours(0,0,0,0)))
          const currentMonthCurrentDayWeekIndex = this.state.currentMonth
              .findIndex(week => week.includes(new Date().setHours(0,0,0,0)));
          const previousWeekLastDayIndex = this.state.currentMonth
              .map(week => week.filter(day => new Date(day).getMonth() === this.state.monthGetter).length -1)
              .slice(currentMonthIncludesCurrentDay ? currentMonthCurrentDayWeekIndex : 0,
                  this.state.currentMonth.findIndex(week => week.includes(clickedDate)));
          if(!this.state.currentWeek.includes(clickedDate)) {
            this.setState(({prevWeekLastDayIndex, ...restTop}) => ({
              prevWeekLastDayIndex: [...prevWeekLastDayIndex, ...previousWeekLastDayIndex],
              ...restTop
            }))
          }
        })
      }
  }

  render() {
    console.log("week index",this.state.currWeekIndex);
    console.log("prev last index of week", this.state.prevWeekLastDayIndex)
    console.log("prev last week of month", this.state.prevMonthLastWeekIndex)
    let viewMode = "";
    const weekMode = (
        //the min width for weekMOde in curr setup is 700px wide
        <WeekMode
            appViewMode={this.state.appViewMode}
            arrayOfDailyHoursTable={this.state.arrayOfDailyHoursTable}
            newDatesToVerboseHandler={this.newDatesToVerboseHandler}
            displayDialogBoxHandler={this.displayDialogBoxHandler}
            dialogBoxData={this.state.dialogBoxData}
            agendaInitialAvailableHour={this.props.agendaInitialAvailableHour}
            layoutWidthDimensions={this.state.layoutWidthDimensions}
            agendaLastAvailableHour={this.props.agendaLastAvailableHour}
            dataToBeRendered={this.props.dataToBeRendered}
            currentWeek={this.state.currentWeek}
            monthGetter={this.state.monthGetter}
            goToClickedDate={this.goToClickedDate}/>
    );
    const calendarMode = (
        //the min width for the calendar mode in curr setup is 590px wide
        <CalendarMode
            appViewMode={this.state.appViewMode}
            calendarViewType={this.props.calendarViewType}
            monthGetter={this.state.monthGetter}
            currentMonth={this.state.currentMonth}
            currentWeek={this.state.currentWeek}
            newDatesToVerboseHandler={this.newDatesToVerboseHandler}
            goToClickedDate={this.goToClickedDate}/>
    );
    const dayMode = (
        //day mode width is just fine
        <DayMode
            dialogBoxData={this.state.dialogBoxData}
            appViewMode={this.state.appViewMode}
            arrayOfDailyHoursTable={this.state.arrayOfDailyHoursTable}
            newDatesToVerboseHandler={this.newDatesToVerboseHandler}
            agendaInitialAvailableHour={this.props.agendaInitialAvailableHour}
            agendaLastAvailableHour={this.props.agendaLastAvailableHour}
            dataToBeRendered={this.props.dataToBeRendered}
            currentMonth={this.state.currentMonth}
            currentYear={this.state.yearGetter}
            currentDay={this.state.currentDay}
            monthGetter={this.state.monthGetter}
            currentWeek={this.state.currentWeek}
            appNavigationHandler={this.appNavigationHandler}
            calendarViewType={this.props.calendarViewType}
            takeMeToToday={this.takeMeToToday}
            goToClickedDate={this.goToClickedDate}/>
    );
    switch (this.state.appViewMode) {
      case('WeekMode') :
        viewMode = weekMode;
        break;
      case('CalendarMode') :
        viewMode = calendarMode;
        break;
      case("DayMode") :
        viewMode = dayMode;
        break;
      default:
        viewMode = null;
    }
    return (
        <Layout
            calendarViewType={this.props.calendarViewType}
            defaultMode={this.props.defaultMode}
            takeMeToToday={this.takeMeToToday}
            appViewMode={this.state.appViewMode}
            weekMode={() => this.viewModeHandler("WeekMode")}
            monthMode={() => this.viewModeHandler("CalendarMode")}
            dayMode={() => this.viewModeHandler("DayMode")}
            callbackContainerDimensions={this.callbackContainerDimensions}
            appNavigationHandler={this.appNavigationHandler}
            newDatesToVerboseHandler={this.newDatesToVerboseHandler}
            currentWeek={this.state.currentWeek}
            monthGetter={this.state.monthGetter}
            currentYear={this.state.yearGetter}
            currentDay={this.state.currentDay}>
          {viewMode}
        </Layout>
    );
  }
}
