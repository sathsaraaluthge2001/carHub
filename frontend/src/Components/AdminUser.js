import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AuthService } from './AuthService ';
import axios from 'axios';


export default function AdminUser(){

    const {id}=useParams();
    const{uId}=useParams();
   console.log(uId);
    const[user,setUser]=useState([]);
    const getUser=()=>{

        axios.get('http://localhost:6060/User/getid/'+uId)
        .then((res) => {
            console.log(res.data);
            setUser(res.data.user)
            
        })
        .catch((err) => {
            alert(err.message);
        }); 
    };

    useEffect(() => {
        getUser();
        
    }, []);



    const handleLogout = () => {
        AuthService.logout(); // Call the logout method from AuthService
        window.location.href = '/'; // Redirect to the  page after logout
       };
        // Correct usage of AuthService
        const isLoggedIn = AuthService.isLoggedIn();
  
        useEffect(() => {
          if (!isLoggedIn) {
          // Redirect to  if user is not logged in
          window.location.href = '/';
          }
        }, [isLoggedIn]);

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

        <div className='ppage' style={{ width: "100%", height: "100vh" }}>
           <div class="container-login100"style={{ ...divStyle, width: "100%", height: "100vh" }}> 
          <div class="sidebar">
            <div class="admin-info">
              <img src="http://localhost:6060/images/man.jpg" alt="Admin Logo"/>
              <p >Sathsara</p>
              <hr/>
            </div>
            <ul>
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
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>

          <div class="content1">
            
          </div>
          <div className='profile-page1' style={{paddingTop:"40px", marginLeft:"100px"}}>
            <div className="profile-container1">
                <div className="profile-image1">
                    <img src={`http://localhost:6060/images/${user.image}`} alt="User Image" />
                    <div className="profile-info1">
                        <div>{user.name}</div>
                    </div>

                    
                    <div className="profile-info1">
                        <div>{user.email}</div>
                    </div>
                </div>
                
                <div className="profile-details1">
                    <div className="profile-info1">
                        <label className='lb'>Address:</label>
                        <div>{user.address}</div>
                    </div>
                    <div className="profile-info1">
                        <label className='lb'>NIC:</label>
                        <div>{user.nic}</div>
                    </div>
                    <div className="profile-info1">
                        <label className='lb'>Contact Number:</label>
                        <div>{user.contactno}</div>
                    </div>
                    <div className="profile-info1">
                        <label className='lb'>Gender:</label>
                        <div>{user.gender}</div>
                    </div>
                    <button className='bbtn'>Edit Profile</button>
                </div>
            </div>
        </div>
        </div>
          </div>
   
    )
}