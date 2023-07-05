import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="Navbar navbg">
            <div className="d-flex shadow-sm py-2 px-3">
                <Link to="/">
                    <img
                        className="navbar-logo"
                        src="https://yoboshu.com/img/yoboshu-logo.png" alt="Yoboshu Logo" 
                    />
                </Link>
                <div className="ms-auto my-auto">
                    <Link className="text-decoration-none text-dark me-3" to="/"><b>Trainers</b></Link>
                    <Link target="_blank" className="navbar-button btn border-0 text-white me-3" to="https://play.google.com/store/apps/details?id=in.yoboshu.trainerfinal&hl=en">Download App</Link>
                </div>
            </div>
        </div>
    )
}