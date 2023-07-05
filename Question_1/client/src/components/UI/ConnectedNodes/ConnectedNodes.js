import React from 'react'
import classes from './ConnectedNodes.module.css'
import ReactAux from '../../../hoc/ReactAux/ReactAux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrain } from '@fortawesome/free-solid-svg-icons'

const connectednodes = (props) => (
    <ReactAux class={classes.ConnectedNodes}>
        <span className={classes.Times}>{props.departureTime}</span><span className={classes.dot1}></span><span className={classes.Departure}>{props.departure}</span>
        <FontAwesomeIcon className={classes.TrainIcon} icon={faTrain} size='lg'/><div className={classes.line}></div>
        <span className={classes.Times}>{props.arrivalTime}</span><span className={classes.dot2}></span><span className={classes.Arrival}>{props.arrival}</span>

    </ReactAux>
)

export default connectednodes