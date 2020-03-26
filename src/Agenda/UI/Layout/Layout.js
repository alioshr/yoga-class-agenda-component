import React from "react";
import classes from "./Layout.module.css";

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
    return (
      <div className={classes.OutStructure}>
        {/*here is display the top title w/ the curr month*/}
        <div className={classes.MonthDisplay}>
          <div
            className={classes.LeftArrow}
            onClick={() => this.props.weekNavigationHandler("decrement")}
          />
          <div
            className={classes.RightArrow}
            onClick={() => this.props.weekNavigationHandler("increment")}
          />
          {this.props.newDatesToVerboseHandler(
            new Date(Math.min(...this.props.currentWeek)),
            "renderMonth"
          )}
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