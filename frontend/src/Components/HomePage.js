import React,{useState,useEffect} from"react"
import axios from "axios";
import { AuthService } from "./AuthService ";

export default function HomePage(){
    const[countV,getCountV]=useState();
    const[countU,getCountU]=useState();
    const[countB,getCountB]=useState();

    const getcountVehicle =()=>{
        
        axios.get('http://localhost:6060/Vehicle/')
      .then((res) => {
        console.log(res.data.length);
        getCountV(res.data.length);
      })
      .catch((err) => {
        alert(err.message);
      });    

    }

    useEffect(()=>{
      getcountVehicle();
    },[]);

    const getcountUser =()=>{
        
      axios.get('http://localhost:6060/User/')
    .then((res) => {
      console.log(res.data.length);
      getCountU(res.data.length);
    })
    .catch((err) => {
      alert(err.message);
    });    

  }

  useEffect(()=>{
    getcountUser();
  },[]);

  const getcountBooking =()=>{
        
    axios.get('http://localhost:6060/Booking/')
  .then((res) => {
    console.log(res.data.length);
    getCountB(res.data.length);
  })
  .catch((err) => {
    alert(err.message);
  });    

}

useEffect(()=>{
  getcountBooking();
},[]);
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
             <div class="container-login100"style={{ ...divStyle, width: "100%", height: "100vh" }}> 
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
       
        <div>
          <div style={{marginLeft:"-500px",paddingTop:"80px"}}>
            <h1 class="banner_taital" style={{fontSize:"40px", color:"black"}}>Wellcome To </h1>
            <h2 class="banner_taital" style={{fontSize:"30px",color:"black",marginTop:"-50px"}}>car<span style={{color:"#fe5b29"}}>H</span>ub</h2>
            <h4 class="banner_taital" style={{fontSize:"20px",color:"black",marginTop:"-50px"}}>Admin Panel</h4>
          </div>
       
        <div style={{marginLeft:"85%" ,height: "90vh",marginTop:"-190px" }}>
          <div style={{paddingTop:"65px", width: "150px", height: "150px", backgroundColor: "#3498db", color: "#fff", padding: "10px", marginBottom: "10px", marginLeft:"40px", borderRadius:"30px" }}>
                Total Vehicles:<br/> <span style={{ fontWeight: "bold" }}>{countV}</span>
            </div>

            <div style={{paddingTop:"65px", width: "150px", height: "150px", backgroundColor: "#2ecc71", color: "#fff", padding: "10px", marginBottom: "10px" , marginLeft:"40px", borderRadius:"30px" }}>
                Total Users:<br/>  <span style={{ fontWeight: "bold" }}>{countU}</span>
            </div>

            <div style={{paddingTop:"65px", width: "150px", height: "150px", backgroundColor: "#e74c3c", color: "#fff", padding: "10px", marginBottom: "10px", marginLeft:"40px" , borderRadius:"30px" }}>
                Total Booking: <br/> <span style={{ fontWeight: "bold" }}>{countB}</span>
            </div>
         </div>   
    </div>
</div>
</div>  
    )
}

