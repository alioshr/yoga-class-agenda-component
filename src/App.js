import React from "react";
import Agenda from "./Agenda/Agenda";
import "./styles.css";

export default class App extends React.Component {
  state = {
    classes: [
      {
        id: 0,
        classDate: 1585191600000,
        dayOfWeek: "Thursday",
        classTime: { hour: 11, minutes: 41 },
        duration: "60min",
        classTitle: "Hatha Yoga",
        instructor: "Kasturi Manjari",
        location: "Lisbon, PT",
        classCapacity: 5
      },
      {
        id: 1,
        classDate: 1584932400000,
        dayOfWeek: "Monday",
        classTime: { hour: 9, minutes: 41 },
        duration: "60min",
        classTitle: "Hatha Yoga",
        instructor: "Kasturi Manjari",
        location: "Lisbon, PT",
        classCapacity: 5
      },
      {
        id: 2,
        classDate: 1585710000000,
        dayOfWeek: "Wednesday",
        classTime: { hour: 13, minutes: 0 },
        duration: "90min",
        classTitle: "Super Yoga",
        instructor: "Kasturi Manjari",
        location: "Cascais, PT",
        classCapacity: 5
      },
      {
        id: 3,
        classDate: 1585105200000,
        dayOfWeek: "Wednesday",
        classTime: { hour: 21, minutes: 0 },
        duration: "60min",
        classTitle: "Super Yoga",
        instructor: "Kasturi Manjari",
        location: "Cascais, PT",
        classCapacity: 5
      }
    ]
  };
  render() {
    return (
        <div className="App">
          <Agenda
              defaultMode={"WeekMode"}
              dataToBeRendered={this.state.classes}
              agendaInitialAvailableHour={6}//or starting row in case of month view
              agendaLastAvailableHour={22}//or starting row in case of month view
          />
        </div>
    );
  }
}
