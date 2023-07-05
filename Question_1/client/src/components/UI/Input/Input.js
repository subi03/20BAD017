import React from 'react';
import classes from './Input.module.css'
import classNames from 'classnames'


const input = (props) => {
    let inputElement = null;

    let textClass = [classes.Text]

    if (props.touched) {
        textClass.push(classes.Red)
    }
    if (props.touched && !props.isValid) {
        textClass.push(classes.Red)
    }
    if (props.touched && props.isValid) {
        textClass.pop()
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = (
                <input
                    className={textClass.join(' ')}
                    type={props.type}
                    onChange={props.changed}
                    value={props.value}
                    onClick={props.clicked}
                    disabled={props.disabled}
                    {...props.elementConfig} />
            )
            break;
        case ('radio'):
            inputElement = (
                <label className={classes.RadioContainer}>
                    <input
                        className={classes.Radio}
                        type={props.elementType}
                        {...props.elementConfig}
                        onChange={props.changed}
                        checked={props.checked}
                    />
                    {props.label}
                </label>
            )
            break;
        case ('checkbox'):
            inputElement = (
                <label className={classes.Switch}>
                    <input 
                        type={props.elementType} 
                        onChange={props.changed}
                    />
                    <span className={classNames(classes.slider, classes.round)}></span>
                </label>
            )
            break;
        default:
            inputElement = <input
                className={classes.Text}
                type={props.type}
                onChange={props.changed}
                value={props.value}
                {...props.elementConfig} />;

    }

    return (
        <div >
            {inputElement}
        </div>
    )
}

export default input;

