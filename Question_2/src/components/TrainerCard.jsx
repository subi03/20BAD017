import React from 'react';
import '../App.css';

import trainerData from './trainerData';
import {Link} from 'react-router-dom';
import Trainer from '../views/Trainer';
import BookingForm from '../views/BookingForm';

const TrainerCard=()=> {
    return(
        <>

        {trainerData.map((Tdata) => ( 
        <div className="TrainerCard col-lg-4 col-md-6 col-12 p-2 mt-3">
        <Link className="text-decoration-none text-dark" to="/trainer">
             <div className="border shadow-sm rounded-3">
                <div className="d-flex p-2">
                    <div className="col-4 d-flex">
                        <img
                            className="TrainerCard-image my-auto" 
                            src={Tdata.Timage} 
                            alt="User's profile picture"
                        />
                    </div>
                    <div className="col-8">
                        <h4 className="theme-color text-uppercase">{Tdata.trainerName}</h4>
                        <p className="mb-0">
                            <span className="material-icons md-24m me-2">work</span>
                            {Tdata.experience}
                        </p>
                        <p className="mb-0">
                            <span className="material-icons md-24m me-2">local_activity</span>
                            {Tdata.duty}
                        </p> 
                    </div>
                </div>
                <div className="d-flex TrainerCard-details py-2 px-2">
                    <div className="col-7">
                        <p className="mb-0"><span className="material-icons text-secondary md-24m me-2">{Tdata.videocam}</span>{Tdata.platform}</p>
                        <p className="mb-0"><span className="material-icons text-secondary md-24m me-2">home</span>{Tdata.venue}</p>
                        <p className="mb-0"><span className="material-icons text-secondary md-24m me-2">{Tdata.door_sliding}</span>{Tdata.Outdoors}</p>
                        <h4 className=" theme-color fw-bold mt-2">₹{Tdata.fees}/ <span className="h6 fw-normal">person</span></h4>
                    </div>
                    <div className="col-5 d-flex justify-content-end pe-3">
                        <Link to="BookingForm" > 
                            <button  className=" btn theme-bgcolor  text-white rounded-pill my-auto px-3">View Details</button>
                        </Link>
                    </div>
                </div>
            </div>
        </Link>   
        </div>
        ))}
</>
    )
}

export default TrainerCard;
