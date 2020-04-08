import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import classes from './DayCard.module.css'
import DayHeader from "../../../../AgendaCards/DayHeader/DayHeader";
import DayOfTheWeekCard from "../../../../AgendaCards/DayOfTheWeekCard/DayOfTheWeekCard";
import DateCards from "../../../../AgendaCards/DateCards.js/DateCards";

export default function DayCard(props) {
    const ref = useRef();
    const [dimensions, setDimensions] = useState({});
    const updateDimensions = () => {
        setDimensions(ref.current.getBoundingClientRect());
    };
     //componentDidMount
    useLayoutEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions)
        }
    }, []);
   if(dimensions.width) {
       props.callbackDivRef(dimensions);
   }

    return (
        <div className={classes.DayCard}>
            <DayHeader>
                <DayOfTheWeekCard
                    newDatesToVerboseHandler={props.newDatesToVerboseHandler}
                    today={props.today}/>
                    <DateCards today={props.today} monthGetter={props.monthGetter}/>
            </DayHeader>
            <div className={classes.ChildInnerTable}
                 ref={ref} >
                <div>{props.children}</div>
            </div>
        </div>
    )

}