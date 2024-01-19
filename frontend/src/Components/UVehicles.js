import React from 'react';
import { Link } from 'react-router-dom';
import axios  from 'axios';
import {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthService } from './AuthService ';


export default function UVehicles(){
   const{uId}=useParams();
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

   const loadProfile=()=>{
    window.location.href = `/profile/${uId}`; // Redirect to the login page after logout
   }

    return(
    <div>
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
        <div class="search_section">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <h1 class="search_taital">Pick Up Your Best Car</h1>
                  <p class="search_text">Using 'Content here, content here', making it look like readable</p>
               </div>
            </div>
         </div>
      </div>

      <div class="gallery_section layout_padding">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <h1 class="gallery_taital">All Vehicles</h1>
               </div>
            </div>
            {vehicle.reduce((rows, v, index) => {
               if (index % 3 === 0) rows.push([]);
               rows[rows.length - 1].push(v);
               return rows;
            }, []).map((rowVehicles, rowIndex) => (
               <div class="row" key={rowIndex}>
               {rowVehicles.map((v, index) => (
                  <div class="col-md-4" style={{marginBottom:"26px"}}key={index}>
                     <div class="gallery_box">
                     <div style={{height:"250px"}} class="gallery_img">
                        <img src={`http://localhost:6060/images/${v.image}`} alt="Vehicle" />
                     </div>
                     <h3 style={{marginTop:"-15px"}} class="types_text">{v.model}</h3>
                     <h5 style={{marginTop:"-15px"}}class="types_text">{v.available}</h5>
                     <h5 style={{marginTop:"-10px",color:"black"}}>Seats: {v.features}</h5>
                     <h5 style={{color:"black",marginTop:"-10px"}}>Per day Rs:<span style={{color:"#fe5b29"}}>{v.priceperday}.00</span></h5>
                     <div class="read_bt">
                     <Link to={`/book/${v._id}/${uId}`}>Book Now</Link>
                     </div>
                     </div>
                  </div>
               ))}
               </div>
            ))}
            
         </div>
      </div>
    </div>

    )
}