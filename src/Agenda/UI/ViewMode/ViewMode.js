import React from 'react'
import classes from './ViewMode.module.css'

export default function ViewMode(props) {
return (
    <div className={classes.ViewModeContainer}>
        <div onClick={props.dayMode} className={classes.ViewModeItem}>Day</div>
        <div onClick={props.weekMode} className={classes.ViewModeItem}>Week</div>
        <div onClick={props.monthMode} className={classes.ViewModeItem}>Month</div>
    </div>
)
}