/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useParams } from 'react-router-dom';
// Import AuthService without extra spaces or typos
import { AuthService } from './AuthService ';

import { useEffect } from 'react';


function Header(){

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



 const {id}=useParams();

    return(
        
          
        <div >
                
          <div class="sidebar">
            <div class="admin-info">
              <img src="http://localhost:6060/images/man.jpg" alt="Admin Logo"/>
              <p >Sathsara</p>
              <hr/>
            </div>
            <ul>
              <li><a href="/">Home</a></li>
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
              <li><a href="orders.html">Bookings</a></li>
              <li><a href="/inde">Settings</a></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>

          <div class="content1">
            
          </div>
        </div>
 
        
    )
}

export default Header;