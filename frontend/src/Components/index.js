import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios  from 'axios';
import {useState, useEffect } from 'react';
import { AuthService } from './AuthService ';
export default function Index(){

   const{uId}=useParams();
   console.log(uId);
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
      <div class="call_text_main">
         <div class="container">
            <div class="call_taital">
               <div class="call_text"><Link to="#"><i class="fa fa-map-marker" aria-hidden="true"></i><span class="padding_left_15">Location</span></Link></div>
               <div class="call_text"><Link to="#"><i class="fa fa-phone" aria-hidden="true"></i><span class="padding_left_15">(+94) 762757670</span></Link></div>
               <div class="call_text"><Link to="#"><i class="fa fa-envelope" aria-hidden="true"></i><span class="padding_left_15">aluthgesathsara2001@gmail.com</span></Link></div>
            </div>
         </div>
      </div>
   
      <div class="banner_section layout_padding">
         <div class="container">
            <div class="row">
               <div class="col-md-6">
                  <div id="banner_slider" class="carousel slide" data-ride="carousel">
                     <div class="carousel-inner">
                        <div class="carousel-item active">
                           <div class="banner_taital_main">
                              <h1 class="banner_taital">Car Rent <br/><span style={{color:"#fe5b29"}}>For You</span></h1>
                              <p class="banner_text">There are many variations of passages of Lorem Ipsum available, but the majority</p>
                              <div class="btn_main">
                                 <div class="contact_bt"><Link to="#">Read More</Link></div>
                                 <div class="contact_bt active"><Link to="#">Contact Us</Link></div>
                              </div>
                           </div>
                        </div>
                        <div class="carousel-item">
                           <div class="banner_taital_main">
                              <h1 class="banner_taital">Car Rent <br/><span style={{color:"#fe5b29"}}>For You</span></h1>
                              <p class="banner_text">There are many variations of passages of Lorem Ipsum available, but the majority</p>
                              <div class="btn_main">
                                 <div class="contact_bt"><Link to="#">Read More</Link></div>
                                 <div class="contact_bt active"><Link to="#">Contact Us</Link></div>
                              </div>
                           </div>
                        </div>
                        <div class="carousel-item">
                           <div class="banner_taital_main">
                              <h1 class="banner_taital">Car Rent <br/><span style={{color:"#fe5b29"}}>For You</span></h1>
                              <p class="banner_text">There are many variations of passages of Lorem Ipsum available, but the majority</p>
                              <div class="btn_main">
                                 <div class="contact_bt"><Link to="#">Read More</Link></div>
                                 <div class="contact_bt active"><Link to="#">Contact Us</Link></div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <a class="carousel-control-prev" href="#banner_slider" role="button" data-slide="prev">
                        <i class="fa fa-angle-left"></i>
                     </a>
                     <a class="carousel-control-next" href="#banner_slider" role="button" data-slide="next">
                        <i class="fa fa-angle-right"></i>
                     </a>
                  </div>
               </div>
               <div class="col-md-6">
                  <div class="banner_img"><img src="images/banner-img.png" alt="sdd"/></div>
               </div>
            </div>
         </div>
      </div>
      
      <div class="about_section layout_padding">
         <div class="container">
            <div class="about_section_2">
            <div class="row">
               <div class="col-md-6"> 
                  <div class="image_iman"><img src="http://localhost:6060/images/benz.jpg" alt="Banner" /></div>
               </div>
               <div class="col-md-6"> 
                  <div class="about_taital_box">
                     <h1 style={{textAlign:"left"}} class="about_taital">About <span style={{ color: "#fe5b29" }}>Us</span></h1>
                     <p style={{textAlign:"left"}} class="about_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                     <div class="readmore_btn"><Link to="#">Read More</Link></div>
                  </div>
               </div>
               </div>

            </div>
         </div>
      </div>
     
      <div class="search_section">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <h1 class="search_taital">Pick Up Your Best Car</h1>
                  <p class="search_text">Using 'Content here, content here', making it look like readable</p>
                  
                  <div class="container">
                     <div class="select_box_section">
                        <div class="select_box_main">
                           <div class="row">
                              <div  class="col-md-3">
                                 <div style={{marginLeft:"178%"}} class="search_btn"><Link to={`/vehi/${uId}`}>All Vehicles</Link></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                 
               </div>
            </div>
         </div>
      </div>
   
      <div class="gallery_section layout_padding">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <h1 class="gallery_taital">Our best offers</h1>
               </div>
            </div>
            {vehicle.slice(0, 6).reduce((rows, v, index) => {
               if (index % 3 === 0) rows.push([]);
               rows[rows.length - 1].push(v);
               return rows;
            }, []).map((rowVehicles, rowIndex) => (
               <div class="row" key={rowIndex}>
               {rowVehicles.map((v, index) => (
                  <div class="col-md-4" style={{marginBottom:"26px"}}key={index}>
                     <div class="gallery_box">
                     <div class="gallery_img">
                        <img src={`http://localhost:6060/images/${v.image}`} alt="Vehicle" />
                     </div>
                     <h3 style={{marginTop:"-5px"}} class="types_text">{v.model}</h3>
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
     
      <div class="choose_section layout_padding">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <h1 class="choose_taital">WHY CHOOSE US</h1>
               </div>
            </div>
            <div class="choose_section_2">
               <div class="row">
                  <div class="col-sm-4">
                     <div class="icon_1"><img src="http://localhost:6060/images/icon-1.png" alt="sdd"/></div>
                     <h4 class="safety_text">SAFETY & SECURITY</h4>
                     <p class="ipsum_text">variations of passages of Lorem Ipsum available, but the majority have </p>
                  </div>
                  <div class="col-sm-4">
                     <div class="icon_1"><img src="http://localhost:6060/images/icon-2.png" alt="sdd"/></div>
                     <h4 class="safety_text">Online Booking</h4>
                     <p class="ipsum_text">variations of passages of Lorem Ipsum available, but the majority have </p>
                  </div>
                  <div class="col-sm-4">
                     <div class="icon_1"><img src="http://localhost:6060/images/icon-3.png" alt="sdd"/></div>
                     <h4 class="safety_text">Best Drivers</h4>
                     <p class="ipsum_text">variations of passages of Lorem Ipsum available, but the majority have </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      
      
      <div class="contact_section layout_padding">
         <div class="container">
            <div class="row">
               <div class="col-sm-12">
                  <h1 class="contact_taital">Get In Touch</h1>
               </div>
            </div>
         </div>
         <div class="container">
            <div class="contact_section_2">
               <div class="row">
                  <div class="col-md-12">
                     <div class="mail_section_1">
                        <input type="text" class="mail_text" placeholder="Name" name="Name"/>
                        <input type="text" class="mail_text" placeholder="Email" name="Email"/>
                        <input type="text" class="mail_text" placeholder="Phone Number" name="Phone Number"/>
                        <textarea class="massage-bt" placeholder="Massage" rows="5" id="comment" name="Massage"></textarea>
                        <div class="send_bt"><Link to="#">Send</Link></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="footer_section layout_padding">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="footeer_logo"><img style={{width:"100px" ,height:"100px"}} src="http://localhost:6060/images/racing-car.png" alt="sdd"/></div>
               </div>
            </div>
            <div class="footer_section_2">
               <div class="row">
                  <div class="col">
                     <h4 class="footer_taital">Subscribe Now</h4>
                     <p class="footer_text">There are many variations of passages of Lorem Ipsum available,</p>
                     <div class="form-group">
                        <textarea class="update_mail" placeholder="Enter Your Email" rows="5" id="comment" name="Enter Your Email"></textarea>
                        <div class="subscribe_bt"><Link to="#">Subscribe</Link></div>
                     </div>
                  </div>
                  <div class="col">
                     <h4 class="footer_taital">Information</h4>
                     <p style={{marginLeft:"35px"}}class="lorem_text">There are many variations of passages of Lorem Ipsum available, but the majority </p>
                  </div>
                  <div class="col">
                     <h4 class="footer_taital">Helpful Links</h4>
                     <p style={{marginLeft:"35px"}} class="lorem_text">There are many variations of passages of Lorem Ipsum available, but the majority </p>
                  </div>
                  <div class="col">
                     <h4 class="footer_taital">Invesments</h4>
                     <p style={{marginLeft:"35px"}} class="lorem_text">There are many variations of passages of Lorem Ipsum available, but the majority </p>
                  </div>
                  <div class="col">
                     <h4 class="footer_taital">Contact Us</h4>
                     <div class="location_text"><Link to="#"><i class="fa fa-map-marker" aria-hidden="true"></i><span class="padding_left_15">Location</span></Link></div>
                     <div class="location_text"><Link to="#"><i class="fa fa-phone" aria-hidden="true"></i><span class="padding_left_15">(+71) 8522369417</span></Link></div>
                     <div class="location_text"><Link to="#"><i class="fa fa-envelope" aria-hidden="true"></i><span class="padding_left_15">demo@gmail.com</span></Link></div>
                     <div class="social_icon">
                        <ul>
                           <li><Link to="#"><i class="fa fa-facebook" aria-hidden="true"></i></Link></li>
                           <li><Link to="#"><i class="fa fa-twitter" aria-hidden="true"></i></Link></li>
                           <li><Link to="#"><i class="fa fa-linkedin" aria-hidden="true"></i></Link></li>
                           <li><Link to="#"><i class="fa fa-instagram" aria-hidden="true"></i></Link></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="copyright_section">
         <div class="container">
            <div class="row">
               <div class="col-sm-12">
                  <p class="copyright_text">2023 All Rights Reserved. Design by <a href="https://html.design">Free Html Templates</a></p>
               </div>
            </div>
         </div>
      </div>
</div>
    )
}