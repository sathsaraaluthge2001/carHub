import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from './AuthService ';
import axios from 'axios';


export default function ABooking(){

    const [booking, seBooking] = useState([]);

  const getVehicle = () => {
    axios.get('http://localhost:6060/Booking/accept?status=Accept')
      .then((res) => {
        console.log(res.data);
        seBooking(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });    
      
  };

  console.log(booking);

  useEffect(() => {
    getVehicle();
    
  }, []);

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
/*------------------------------*/
const backgroundImageUrl = 'http://localhost:6060/images/jeba.png';

    const divStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    // Add other background-related styles as needed
};


    return(
        <div >
                <div class="container-login100"style={{...divStyle, width: "100%", height: "100vh" }}>
                <div class="sidebar">
           
           <ul style={{paddingTop:"70px"}}>
             <li><a href="/Header/:id">Home</a></li>
             <li class="dropdown">
               <a href="#" class="dropdown-toggle">Vehicles</a>
               <div class="dropdown-content">
                 <a href="/all">All Vehicles</a>
                 <a href="/add">Add Vehicle</a>
                 
               </div>
             </li>
             <li class="dropdown">
               <a href="#" class="dropdown-toggle">Users</a>
               <div class="dropdown-content">
                 <a href="/AllUser">All Users</a>
                 <a href="/AddUser">Add User</a>
               
               </div>
             </li>
             <li class="dropdown">
               <a href="#" class="dropdown-toggle">Booking</a>
               <div class="dropdown-content">
                 <a href="/pBook">Pending Bookings</a>
                 <a href="/Abook">Accept bookings</a>
               </div>
             </li>
             <li><a href="/inde">Settings</a></li>
             <li><button style={{backgroundColor:"#e74c3c"}}class="btn btn-primary mb-3" onClick={handleLogout}>Logout</button></li>
           </ul>
         </div>

         <div class="content1">
           
         </div>
        
          <div style={{ overflowX: 'auto', padding: '20px', marginLeft: '125px', alignItems: 'center' }}>
        <h1 style={{ alignItems: 'center', color: "#808080" }}>Accepted Bookings</h1>

        <div className='booki' style={{ overflowX: 'auto', marginLeft: '130px', maxHeight: '500px' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', borderRadius: '5px' }}>
            <thead style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid #ddd' }}>
              <tr>
                <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Vehicle Number</th>
                <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Pick up date</th>
                <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Return Date</th>
                <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Driving Licen</th>
              </tr>
            </thead>

            <tbody style={{ maxHeight: '500px' }}>
              {booking.map((b, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px'}}>{b.regnumber}</td>
                  <td style={{ padding: '12px' }}>{b.email}</td>
                  <td style={{ padding: '12px' }}>{b.pickupdate}</td>
                  <td style={{ padding: '12px' }}>{b.returndate}</td>
                  <td style={{ padding: '12px' }}>{b.dlicen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
  </div>

  </div>

    )
}