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
    const calculateCurrentTime = (new Date().getHours() - props.classInitialAvailableHour) * 60 + new Date().getMinutes();
    const currentTimeTopPositioning = {top: calculateCurrentTime + "px", position: "absolute"};
    let currentTimeLineWidth = {width: props.dayCardContainerWidth * 7 + "px"};
    return (
        <div style={currentTimeTopPositioning} className={classes.CurrentTimeWrapper}>
            <div className={classes.CurrentTime} >
                {`${padToTwo(currentTime.getHours())}:${padToTwo(currentTime.getMinutes())}`}
            </div>
            <div className={classes.CurrentTimeLine} style={currentTimeLineWidth}/>
        </div>
    )
}