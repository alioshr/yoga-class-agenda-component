import React from "react";
import Agenda from "./Agenda/Agenda";
import "./styles.css";

export default class App extends React.Component {
  state = {
    classes: [
      {
        id: 0,
        classDate: 1585191600000,
        dayOfWeek: "Tuesday",
        classTime: { hour: 13, minutes: 41 },
        duration: "60min",
        classTitle: "Hatha Yoga",
        instructor: "Kasturi Manjari",
        location: "Lisbon, PT",
        classCapacity: 5
      },
      {
        id: 1,
        classDate: 1584932400000,
        dayOfWeek: "Wednesday",
        classTime: { hour: 13, minutes: 0 },
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
          dataToBeRendered={this.state.classes}
          agendaInitialAvailableHour={6}
          agendaLastAvailableHour={19}
        />
      </div>
    );
  }
}
