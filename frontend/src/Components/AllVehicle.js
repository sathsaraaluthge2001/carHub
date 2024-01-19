import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from './AuthService ';
import axios from 'axios';
import deleteVehicle from './DeleteVehicle';

export default function AllVehicle() {
  const [vehicle, setVehicles] = useState([]);

  const getVehicle = () => {
    axios.get('http://localhost:6060/Vehicle/')
      .then((res) => {
        console.log(res.data);
        setVehicles(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });    
      
  };

  

  useEffect(() => {
    getVehicle();
    
  }, []);

  const handleDelete = (vehicleId) => {
    deleteVehicle(vehicleId)
      .then(() => {
        alert('Vehicle deleted successfully');
        getVehicle();
      })
      .catch((err) => {
        alert('Vehicle not deleted: ' + err);
      });
  };
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
  // Add other background-related styles as needed
};
  

  return (

    <div  style={{ ...divStyle, width: "100%", height: "100vh" }}>
                
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
        
    <div style={{ overflowX: 'auto',padding: '20px', marginLeft:'125px' ,alignItems:'center' }}>
    <h1 style={{ alignItems:'center', color:"#808080"}}>All Vehicles</h1>
    <div className='booki' style={{ overflowX: 'auto', marginLeft: '130px', maxHeight: '450px' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', borderRadius: '5px' }}>
        <thead style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid #ddd' }}>
          <tr>
            <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Reg Number</th>
            <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Brand</th>
            <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Model</th>
            <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Available</th>
            <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Price Per Day</th>
            <th style={{ padding: '5px',  borderBottom: '1px solid #ddd' }}>View</th>
            <th style={{ padding: '5px',  borderBottom: '1px solid #ddd' }}>Delete</th>
            <th style={{ padding: '5px',  borderBottom: '1px solid #ddd' }}>Update</th>
          </tr>
        </thead>
        <tbody style={{ maxHeight: '500px' }}>
          {vehicle.map((v, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{v.regnumber}</td>
              <td style={{ padding: '12px' }}>{v.brand}</td>
              <td style={{ padding: '12px' }}>{v.model}</td>
              <td style={{ padding: '12px' }}>{v.available}</td>
              <td style={{ padding: '12px' }}>Rs: {v.priceperday}</td>
              <td style={{ padding: '5px', textAlign: 'center' }}>
                <a className="nav-link" href={`/get/${v._id}`}>
                  <img
                    src={`http://localhost:6060/images/eye.png`}
                    alt={`${index}`}
                    style={{ width: '20px', height: '20px', objectFit: 'cover', cursor: 'pointer' }}
                  />
                </a>
              </td>
              <td style={{ padding: '5px', textAlign: 'center' }}>
                <img
                  src={`http://localhost:6060/images/delete.png`}
                  alt={`${index}`}
                  style={{ width: '20px', height: '20px', objectFit: 'cover', cursor: 'pointer', marginRight: '5px' }}
                  onClick={() => handleDelete(v._id)}
                />
              </td>
              <td style={{ padding: '5px', textAlign: 'center' }}>
                <a className="nav-link" href={`/update/${v._id}`}>
                  <img
                    src={`http://localhost:6060/images/edit.png`}
                    alt={`${index}`}
                    style={{ width: '20px', height: '20px', objectFit: 'cover', cursor: 'pointer' }}
                  />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  </div>
  


  );
}
