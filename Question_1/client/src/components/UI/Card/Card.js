import React from 'react';
import classes from './Card.module.css'

const card = (props) => {


    let status = [classes.Status];
    let late = [classes.Late]

    if(props.show){
        late.push(classes.Red);
        status.push(classes.Red)
    }else {
        status.push(classes.Green)
    }


    return (
    <div className={classes.Card} >
        <div className={classes.Title}>
            <span>{props.departure} to {props.arrival}</span>
            <span className={classes.Destination}>{props.departureDestination}</span>
            </div>
            <span className={classes.Times}>{props.departureTime} <span className={classes.Arrow}>&#10230;</span> {props.arrivalTime} </span>
            <span className={status.join(' ')}> {props.status} </span>
            <span className={classes.Platform}>Plat. {props.platform}</span>
            <a className={classes.Stops} onClick={props.clicked}>({props.stops} {props.stops === 1 ? <span>stop)</span> : <span>stops)</span>}</a>
            <hr></hr>
            <span className={classes.Duration}>{props.duration} mins</span>
            {props.late > 0 ? <span className={late.join(' ')}> ({props.late} mins late) </span> : null}
        {props.children}
    </div>
    )
}

export default card