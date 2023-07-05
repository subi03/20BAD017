import React from 'react';
import Aux from '../ReactAux/ReactAux';
import Navbar from '../../components/Navbar/Navbar'
import classes from './Layout.module.css'


const layout = (props) => (
    <Aux class={classes.Layout}>
        <Navbar />
        <main>{props.children}</main>
    </Aux>
)   

export default layout;