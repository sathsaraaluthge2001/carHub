import React,{useState,useEffect} from"react"
import axios from "axios";
import { useParams } from 'react-router-dom';
import { AuthService } from "./AuthService ";
export default function VehicleDetail(){

    const{id}=useParams();

    const [vehicle, setVehicles] = useState([]);

    const getVehicle = () => {
        axios.get('http://localhost:6060/Vehicle/get/'+id)
        .then((res) => {
            console.log(res.data);
            setVehicles(res.data.Vehicle);
            
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
      
    return(

        <div >
                
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
                <div class="vehicle-cards">
                <div class="vehicle-card"> 
                    <div class="vehicle-details">
                    <h3 style={{color:"black"}}>{vehicle.regnumber}</h3>   
                    <p>Brand:<span className="sp">{vehicle.brand}</span></p>
                    <p>Model:<span className="sp">{vehicle.model}</span></p>
                    <p>Year:<span className="sp">{vehicle.year}</span></p>
                    <p>Type:<span className="sp">{vehicle.type}</span></p>
                    <p>Fuel:<span className="sp">{vehicle.fueltype}</span></p>
                    <p>Price/Day:<span className="sp">{vehicle.priceperday}</span></p>
                    <p>Transmission:<span className="sp">{vehicle.regnumber}</span></p>
                    <p>Available:<span className="sp">{vehicle.available}</span></p>
                    <p>{id}</p>
                    </div>
                </div>
                
                </div>
                
                <div className="vehicle-image">
                <img style={{paddingTop:"40px"}} src={`http://localhost:6060/images/${vehicle.image}`} alt="Vehicle" />
                </div>
                   



        </div>
    )
}

