import React from 'react'
import classes from './LoadingButton.module.css'

const loadingbutton = (props) => {
    let arr = [classes.Button]

    if (!props.load) {
        arr.push(classes.Cursor)
    }


    let button = (
        <a className={arr.join(' ')} onClick={props.clicked}>
            {props.load ? <div className={classes.spinner}></div> : <span className={classes.Text}>{props.text} </span>}
        </a>
    )

    if(props.show){
        return button
    }else {
        return null
    }
}

export default loadingbutton