import React, {useState, useRef, useLayoutEffect, useEffect} from 'react'
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

    useEffect(() => {
        props.callbackDivRef(dimensions);
    }, [dimensions]);

    return (
        <div className={classes.DayCard}>
            <div className={classes.ChildInnerTable}
                 ref={ref} >
                <div>{props.children}</div>
            </div>
        </div>
    )

}