import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AuthService } from './AuthService ';
import axios from 'axios';


export default function UserProfile(){

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


    const loadProfile=()=>{
        window.location.href = `/profile/${uId}`; // Redirect to the login page after logout
       }


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

        <div className='ppage' style={{ ...divStyle, width: "100%", height: "100vh" }}>
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
    <div className='profile-page1'>
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
                    <button style={{backgroundColor:"#e74c3c"}}class="btn btn-primary mb-3">Edit Profile</button>
                </div>
            </div>
        </div>
        </div>
    )
}