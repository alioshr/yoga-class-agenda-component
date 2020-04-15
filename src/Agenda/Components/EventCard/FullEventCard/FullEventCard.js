import React from 'react'

export default function FullEventCard(props) {

    return (
        <div>
            {props.fullClassData.map(cl =>
                cl.classDate === props.currentDay ?
                        <div key={props.currentDay}>
                            <div>{cl.classTitle}</div>
                            <div>
                                <div className="row">
                                    <label htmlFor="">Class Time</label><div>{cl.classTime.hour}:{cl.classTime.minutes}</div>
                                </div>
                            </div>
                        </div> : null
                    )
                }
            <button>Edit Class</button><button>Delete Class</button>
        </div>
    )
}