import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import deleteUser from './DeleteUser';
import axios from 'axios';
import { AuthService } from './AuthService ';

export default function AllUser(){

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

    const [user, setUser] = useState([]);

    const getUser = () => {
        axios.get('http://localhost:6060/User/')
        .then((res) => {
            console.log(res.data);
            setUser(res.data);
        })
        .catch((err) => {
            alert(err.message);
        });    
        
    };

  

  useEffect(() => {
    getUser();
    
  }, []);

    const handleDelete = (userId) => {
        deleteUser(userId)
          .then(() => {
            alert('User deleted successfully');
            getUser();
          })
          .catch((err) => {
            alert('User not deleted: ' + err);
          });
      };
    
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
      <div style={{ ...divStyle, width: "100%", height: "100vh" }}>
                
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
        <h1 style={{ alignItems:'center', color:"#808080"}}>All Users</h1>
        <div className='booki' style={{ overflowX: 'auto', marginLeft: '130px', maxHeight: '500px' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', borderRadius: '5px' }}>
            <thead style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid #ddd' }}>
              <tr >
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Address</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Gender</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Contact No</th>
                <th style={{ padding: '5px', borderBottom: '1px solid #ddd' }}>View</th>
                <th style={{ padding: '5px', borderBottom: '1px solid #ddd' }}>Delete</th>
                
              </tr>
            </thead>
            <tbody style={{ maxHeight: '500px' }}>
              {user.map((u, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '4px' }}>{u.email}</td>
                  <td style={{ padding: '4px' }}>{u.name}</td>
                  <td style={{ padding: '4px' }}>{u.address}</td>
                  <td style={{ padding: '4px' }}>{u.gender}</td>
                  <td style={{ padding: '4px' }}>Rs: {u.contactno}</td>
                  <td style={{ padding: '5px', textAlign: 'center' }}>
                    <a className="nav-link" href={`/viewUser/${u._id}`}>
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
                      onClick={() => handleDelete(u._id)}
                    />
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    )
}