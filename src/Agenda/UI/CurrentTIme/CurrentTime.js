import React, {useState, useEffect} from 'react'
import classes from './CurrentTime.module.css'

export default function CurrentTime(props) {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        setInterval(()=> {
            setCurrentTime(new Date())
        }, 1000)
    }, []);
    const padToTwo = number => (number <= 9 ? `0${number}` : number);
    const currentTimeTopPositioning = {top: props.currentTime + "px", position: "absolute"};
    let currentTimeLineWidth;
    if(props.appViewMode === "DayMode") {
        if(props.dayCardContainerWidth !== undefined) {
            currentTimeLineWidth = {width: props.dayCardContainerWidth.width + "px"};
        }
    }
    if(props.appViewMode === "WeekMode" && props.dayCardContainerWidth !== undefined) {
        currentTimeLineWidth = {width: props.dayCardContainerWidth * 7 + "px"};
    }
    return (
        <div style={currentTimeTopPositioning} className={classes.CurrentTimeWrapper}>
            <div className={classes.CurrentTime} >
                {`${padToTwo(currentTime.getHours())}:${padToTwo(currentTime.getMinutes())}`}
            </div>
            <div className={classes.CurrentTimeLine} style={currentTimeLineWidth}/>
        </div>
    )
}