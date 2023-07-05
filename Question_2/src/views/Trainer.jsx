import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Slider from "react-slick";
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import {Typography,Chip,Container} from '@material-ui/core';
import {Home,LocationOn,Language,EmojiEvents,ArrowBack,MeetingRoom} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    chipSpacing: {
      
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.9),
      },
      display: 'flex',
    },
  }));
export default function Trainer() {
    const classes = useStyles();

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const [slide, setSlide] = useState(settings)
    return(
        <Container className="Trainers">
            <h1 className="theme-color">Train name</h1>
            <div className="col-12 d-flex justify-content-end pe-3">
                        <Link to="BookingForm" > 
                            <button  className=" btn theme-bgcolor bookNowButton text-white  my-auto px-3">BOOK NOW</button>
                        </Link>
                    </div>
            <div className="row m-0">
                <div className="col-md-5">
                    <Slider {...slide}>
                        <div>
                        <img href="1.jpg" alt="train" width="550" height="150"/>
                        </div>
                    <div>
                        <img href="1.jpg" alt="train" width="550" height="150"/>
                        </div>
                    <div>
                        <img href="1.jpg" alt="train" width="550" height="150"/>                        </div>
                    </Slider>
                </div>
            </div>
            
            <br/>
            <hr className="solid"/>
            <Container>
                <h6><b>About:</b></h6>
                <p >
                Travelling across the country is now easier than ever because of the complete digitization of the IRCTC ticketing procedure. Now, you can book train tickets online from the comfort of your home. And it’s not just the train tickets booking system that has been revolutionized. 
                </p>
                <hr className="solid"/>
                <h6><b>Cost Coaches</b></h6>
                <div className={classes.chipSpacing}>
                    <Chip color="primary" variant="outlined" label="1st Class - 900/-"/>
                    <Chip color="primary" variant="outlined" label="2nd Class - 600/-"/>
                    <Chip color="primary" variant="outlined" label="General - 400/-"/>
                    <Chip color="primary" variant="outlined" label="Push Back Seater - 400/-"/>
                    <Chip color="primary" variant="outlined" label="AC Berth - 800/-"/>
                </div>
                <hr className="solid"/>
                <h6><b> Food Available</b></h6>
                    Cutlet,Tea,Coffee,Biscuits,Chips,Briyani,Idly,Chapathi
                

                <hr className="solid"/>
                <Typography color="textSecondary" >
                    <b>NOTE: </b>
                    Train will On time So Special Permissison will bw given to wait for the person to come. 
                </Typography>
                
                <hr className="solid"/>
                <h6><b>Time Availability</b></h6>
                <div className={classes.chipSpacing}>
                <Chip color="primary" variant="outlined" label="6:00 AM to 7:00 AM"/>
                <Chip color="primary" variant="outlined" label="10:30 AM to 11:30 AM"/>                
                <Chip color="primary" variant="outlined" label="12:28 PM to 1:28 PM"/>                
                <Chip color="primary" variant="outlined" label="1:00 PM to 2:00 PM"/>
                </div>
                
            
                
                        

                <hr className="solid"/>
                <h6><b>Other Speciality in this Train</b></h6>
                <div className={classes.chipSpacing}>
                <Chip color="primary" variant="outlined" label="Comfortable"/>
                <Chip color="primary" variant="outlined" label="Awesome Food"/>                
                <Chip color="primary" variant="outlined" label="Spacious"/>                
                <Chip color="primary" variant="outlined" label="Place for Physical Challenged"/>                               
                <Chip color="primary" variant="outlined" label="AC"/>                
                <Chip color="primary" variant="outlined" label="Clean RestRooms"/>                
                <Chip color="primary" variant="outlined" label="Safe and Secure"/>                   
                </div>
            </Container>
        </Container>
    )
}