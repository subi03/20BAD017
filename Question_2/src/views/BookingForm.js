import React,{useState} from 'react';
import '../App.css';
import {Public ,People, AccessTime } from '@material-ui/icons';
import {Container,Checkbox, FormControlLabel, MenuItem, FormControl, Select} from '@material-ui/core';

const BookingForm =()=>{
    const [time,setTime]=useState(0);
    const [member,setMember]=useState(0);
    const [mode,setMode]=useState(0);
    

        const emptyTime=(e)=>{
                setTime(e.target.value);}

        const chooseMember=(e)=>{
            setMember(e.target.value);}

        const selectMode=(e)=>{
            setMode(e.targetvalue);}

return(
    <>
    <div >
        <h2 className="tForm">Book Your Ticket</h2>
        <h4 className="tForm"></h4>
        <Container >
             <h4> Default Time and People Count</h4>
             <Container className="  formBg" >
               <h6 className="spacing2">Default training time</h6>
                <div>
                    <AccessTime />
                    <FormControl  >
                        <div className="spacing1 ">
                            <Select
                            disableUnderline={true}
                            value={time}
                            onChange={emptyTime}
                            >
                            <MenuItem value={time}>Select defualt time </MenuItem>
                            <MenuItem value={1}>6:00 AM to 7:00 AM</MenuItem>
                            <MenuItem value={2}>10:30 AM to 11:30 AM</MenuItem>
                            <MenuItem value={3}>11:00 AM to 12:00 PM</MenuItem>
                            <MenuItem value={4}>12:28 PM to 1:28 PM</MenuItem>
                            <MenuItem value={5}>1:00 PM to 2:00 PM</MenuItem>
                            <MenuItem value={6}>2:30 PM to 3:30 PM</MenuItem>
                            </Select>
                        </div>
                    </FormControl>
                        <hr className="solid"/>
                        <div>
                        <h6>Number of People</h6>
                        <People />
                        <FormControl  >
                            <div className="spacing1">
                            <Select
                            disableUnderline={true}
                            value={member}
                            onChange={chooseMember}
                            >
                            <MenuItem value={member}>Select number of people</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            </Select>
                        </div>
                        </FormControl>
                        </div><br/> 
                </div>
             </Container>
        </Container>
        <br/>
        <Container>
             <h4> Seat , Berth Type</h4>
             <Container className="formBg" >
               <h6> Seat , Berth Type</h6>
                <div>
                    <Public />
                    <FormControl  >
                    <div className="spacing1">
                        <Select
                        disableUnderline={true}
                        value={mode}
                        onChange={selectMode}
                        >
                        <MenuItem value={mode}>Window Seat </MenuItem>
                        <MenuItem value={1}>Miidle Berth</MenuItem>
                        <MenuItem value={2}>Upper Berth</MenuItem>
                        </Select>
                    </div>
                    </FormControl>
                        </div><br/>
             </Container>
        </Container>
<br/>
        <Container>
             <h4> Foood Booking</h4>
             <Container className="formBg" >
             <FormControlLabel
                            value="end"
                            control={<Checkbox color="primary" />}
                            label="Need"
                            labelPlacement="end"
                        />
            <FormControlLabel
                            value="end"
                            control={<Checkbox color="primary" />}
                            label="Not Needed"
                            labelPlacement="end"
           />
            <FormControlLabel
                        value="end"
                        control={<Checkbox color="primary" />}
                        label="On Spot"
                        labelPlacement="end"
            />                    
             </Container>
        </Container>
        <div className="subButton">
            <button  className="navbar-button btn  text-white" type="submit"><h5>Book Now</h5></button>
        </div>
    </div>
    </>
)
}

export default BookingForm;