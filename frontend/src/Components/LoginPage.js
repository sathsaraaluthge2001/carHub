import React, { useState} from 'react';
import axios from 'axios';
// Import AuthService without extra spaces or typos
import { AuthService } from './AuthService ';
import { Link } from 'react-router-dom';


export default function LoginHandle(){

    
    const[txtEmail,setEmail]=useState("");
    const[txtPassword,setPassword]=useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function sendData(e){

        e.preventDefault();

        if (!txtPassword || !txtEmail) {
            alert("Please fill in all fields ");
            return;
          }

          axios.get(`http://localhost:6060/User/get/${txtEmail}`)
          .then((res) => {
            const userArray = res.data.user;
        
            if (userArray.length > 0) {
              const userData = userArray[0];
              console.log("User Password:", userData.password);
              console.log("Entered Password:", txtPassword);
        
              if (userData.password === txtPassword) {
                AuthService.login(userData);
                setIsLoggedIn(true);
                window.location.href = `/index/${userData._id}`;
              } else {
                alert("Login Fail: Incorrect password for user");
                window.location.reload();
              }
            } else {
              // User not found, try checking admin
              checkAdminLogin();
            }
          })
          .catch((err) => {
            alert(err.message);
          });
        
        function checkAdminLogin() {
          axios.get(`http://localhost:6060/Admin/get/${txtEmail}`)
            .then((res) => {
              const adminArray = res.data.admin;
        
              if (adminArray.length > 0) {
                const adminData = adminArray[0];
                console.log("Admin Password:", adminData.password);
                console.log("Entered Password:", txtPassword);
        
                if (adminData.password === txtPassword) {
                  AuthService.login(adminData);
                  setIsLoggedIn(true);
                  window.location.href = `/Header/${adminData._id}`;
                } else {
                  alert("Login Fail: Incorrect password");
                  window.location.reload();
                }
              } else {
                alert("Login Fail");
                window.location.reload();

              }
            })
            .catch((err) => {
              alert(err.message);
            });
        }

    }
    
    const backgroundImageUrl = 'http://localhost:6060/images/jeba.png';

    const divStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    // Add other background-related styles as needed
};

    if (!isLoggedIn) {
    return(

      
        <div class="limiter" >
            <div class="container-login100"style={{ ...divStyle, width: "100%", height: "100vh" }}>
            <h1 class="banner_taital" style={{marginLeft:"-27%"}}>car<span style={{color:"#fe5b29"}}>H</span>ub</h1>
              <div class="wrap-login100" style={{marginLeft:"-50%",paddingTop:"5%"}} >
                <form class="login100-form validate-form" onSubmit={sendData} >
                  <span  style={{marginLeft:"-80px",fontSize:"32px" ,color:"black",fontWeight:"bolder"}}>
                    Sign <span style={{color:"#fe5b29"}}>In</span>
                  </span>

                  <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                    <input  class="form-control" style={{width:"200px",marginLeft:"43%", marginTop:"20px"}} type="text" name="email" placeholder="Email" onChange={(e) => {
                            setEmail(e.target.value);
                        }}/>
                  </div>

                  <div class="wrap-input100 validate-input" data-validate = "Password is required">
                    <input  class="form-control"style={{width:"200px",marginLeft:"43%", marginTop:"20px"}} type="password" name="pass" placeholder="Password" onChange={(e) => {
                            setPassword(e.target.value);
                        }}/>
                  </div>
                  
                  <div class="container-login100-form-btn">
                            <button type="submit" style={{width:"100px", marginTop:"20px",marginLeft:"-85px", backgroundColor:"#fe5b29"}} class="btn btn-primary mb-3" id="submit">Sign In</button>
                  </div>
                  <div class="container-login100-form-btn">
                           <span style={{marginLeft:"-90px"}}>Don't have account?<Link to="/reg" state={{fontWeight:"bolder"}} >sign Up</Link></span> 
                  </div>
                </form>
              </div>
            </div>
	       </div>
      
    )
  }
}