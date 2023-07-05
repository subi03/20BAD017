import React from 'react'
import classes from './Navbar.module.css'
import NavItem from './NavItem/NavItem'
import Aux from '../../hoc/ReactAux/ReactAux'

const navbar = () => (
    <header className={classes.Navbar}>
        <div>
            <ul>
                {/* <li>Transport App </li> */}
                <NavItem link='/' exact>Transport App</NavItem>
            </ul>
            <ul >
                <NavItem link='/login' >Login</NavItem>
                <NavItem link='/register' >Register</NavItem>
            </ul>
        </div>
    </header> 
)

export default navbar