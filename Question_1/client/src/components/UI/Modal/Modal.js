import React from 'react'
import classes from './Modal.module.css'

const modal = (props) => {

    let modal = (
        <div className={classes.openModal} onClick={props.clicked}>
            <div className={classes.ProceedsModal}>
                {props.children}
                <button onClick={props.clicked}>Close</button>
            </div>
        </div>
    )

    if (props.show) {
        return modal
    } else {
        return null
    }
}

export default modal