import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios  from 'axios';
import {useState, useEffect } from 'react';
import { AuthService } from './AuthService ';

export default function UserBookings(){

    const{uId}=useParams();
    
    const[bookings,setBookings]=useState([]);
    const getBooking=()=>{
        axios.get('http://localhost:6060/Booking/getUBooking/'+uId)
        .then((res)=>{
            console.log(res.data);
            setBookings(res.data.booking);
        })
        .catch((err)=>{
            alert(err.message);
        })
    }

    useEffect(()=>{
        getBooking();
    }, []);







    //-------------------------------------------------------------
    const loadProfile=()=>{
        window.location.href = `/profile/${uId}`; // Redirect to the login page after logout
       }
     
       const handleLogout = () => {
        AuthService.logout(); // Call the logout method from AuthService
        window.location.href = '/'; // Redirect to the login page after logout
       };
        // Correct usage of AuthService
        const isLoggedIn = AuthService.isLoggedIn();
     
      
     
        useEffect(() => {
          if (!isLoggedIn) {
          // Redirect to login if user is not logged in
          window.location.href = '/';
          }
        }, [isLoggedIn]);

        //background image
        const backgroundImageUrl = 'http://localhost:6060/images/jeba.png';

    const divStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    }
     
    return(
         <div style={{ ...divStyle, width: "100%", height: "100vh" }}>
            <nav style={{ background: "#333333",height:"60px" }} className="navbar navbar-expand-lg navbar-light">
        <a style={{marginLeft:"10px",color:"whitesmoke",fontStyle:"italic",fontSize:"26px"}} className="navbar-brand" href="#">car<span style={{color:"#fe5b29"}}>H</span>ub</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a style={{color:"whitesmoke"}} className="nav-link" href={`/index/${uId}`}>Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a style={{color:"whitesmoke"}} className="nav-link" href={`/vehi/${uId}`}>Vehicles</a>
          </li>
          <li className="nav-item">
            <a style={{color:"whitesmoke"}}  className="nav-link" href={`/UserBookings/${uId}`}>Bookings</a>
          </li>
        </ul>
        <button type="submit" onClick={handleLogout} style={{width:"120px", marginTop:"20px", backgroundColor:"#fe5b29",marginLeft:"54%"}} class="btn btn-primary mb-3" id="submit">Sign Out</button>
        <button onClick={loadProfile} style={{width:"120px", marginTop:"20px", backgroundColor:"#fe5b29",marginLeft:"10px"}} class="btn btn-primary mb-3" id="submit">Profile</button>
      </div>
    </nav>

            <div className="container mt-4">
                <h2 className="mb-4" style={{ color: "black" }}>My Bookings</h2>
                <div className='booki' style={{ maxHeight: "400px", overflowY: "auto"  }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Pickup Date</th>
                                <th>Return Date</th>
                                <th>Registration Number</th>
                                <th>Email</th>
                                <th>Contact Number</th>
                                <th>Driver's License</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={index}>
                                    <td>{booking.pickupdate}</td>
                                    <td>{booking.returndate}</td>
                                    <td>{booking.regnumber}</td>
                                    <td>{booking.email}</td>
                                    <td>{booking.contactno}</td>
                                    <td>{booking.dlicen}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

         </div>

    )
}