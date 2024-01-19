import React, { useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Import AuthService without extra spaces or typos
import { AuthService } from './AuthService ';


export default function Register(){

    
    const[txtEmail,setEmail]=useState("");
    const[txtName,setName]=useState("");
    const[txtAddress,setAddress]=useState("");
    const[txtGender,setGender]=useState("");
    const[txtcontactno,setcontactno]=useState("");
    const[txtPassword,setPassword]=useState("");
    const[txtNic,setNic]=useState("");

    const [fileImage, setImage] = useState();

    function sendData(e){
        e.preventDefault();

        if (!fileImage) {
            console.error("Image not selected");
            return;
        }

        const formData=new FormData();
        formData.append('image',fileImage);
        formData.append('email',txtEmail);
        formData.append('name',txtName);
        formData.append('password',txtPassword);
        formData.append('address',txtAddress);
        formData.append('nic',txtNic);
        formData.append('contactno',txtcontactno);
        formData.append('gender',txtGender);
        
        console.log(formData);

        axios.post("http://localhost:6060/User/add", formData).then(()=>{
            alert("successfully Registerd");
            console.log("User added successfully");
            window.location.href = '/';
        }).catch((err)=>{
            alert("User not added",err);
            console.log("User not added",err );
        });
        

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

   
return (
  <div className="limiter">
    <div className="container-login100" style={{ ...divStyle, width: "100%", height: "100vh" }}>
    <h1 class="banner_taital" style={{marginLeft:"-27%"}}>car<span style={{color:"#fe5b29"}}>H</span>ub</h1>
      <div className="wrap-login100" style={{ display: "flex", marginLeft: "10%" }}>

        <form className="login100-form validate-form" onSubmit={sendData} style={{ paddingTop: "4%",marginLeft:"-5%" }}>
          {/* Left-aligned column for the first 4 text fields */}
          <div className="left-column">
            <span style={{ marginTop: "80px", marginLeft: "170px", fontSize: "32px", color: "black", fontWeight: "bolder" }}>
              Sign <span style={{ color: "#fe5b29" }}>Up</span>
            </span>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input className="form-control" style={{ width: "200px", marginTop: "10%" }} type="text" name="pass" placeholder="name" onChange={(e) => { setName(e.target.value); }} />
            </div>

            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
              <input className="form-control" style={{ width: "200px", marginTop: "20px" }} type="text" name="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value); }} />
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input className="form-control" style={{ width: "200px", marginTop: "20px" }} type="text" name="pass" placeholder="Address" onChange={(e) => { setAddress(e.target.value); }} />
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input className="form-control" style={{ width: "200px", marginTop: "20px" }} type="text" name="pass" placeholder="NIC" onChange={(e) => { setNic(e.target.value); }} />
            </div>
          </div>

          <div className="wrap-input100 validate-input" data-validate="Password is required">
              <select className="form-control" style={{ width: "200px", marginTop: "20px", backgroundColor: "black" }} name="pass" onChange={(e) => { setGender(e.target.value); }}>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
          {/* Right-aligned column for the rest of the fields */}
          <div className="right-column" style={{marginLeft:"85%",marginTop:"-95%"}}>
            

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input className="form-control" style={{ width: "200px", marginLeft: "5%", marginTop: "-13.2%" }} type="text" name="pass" placeholder="Contact No" onChange={(e) => { setcontactno(e.target.value); }} />
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input className="form-control" style={{ width: "200px", marginLeft: "5%", marginTop: "20px", backgroundColor: "black" }} type="file" placeholder="Image" onChange={(e) => { setImage(e.target.files[0]); }} />
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input className="form-control" style={{ width: "200px", marginLeft: "5%", marginTop: "20px" }} type="text" name="pass" placeholder="Password" onChange={(e) => { setPassword(e.target.value); }} />
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input className="form-control" style={{ width: "200px", marginLeft: "5%", marginTop: "20px" }} type="text" name="pass" placeholder="Confirm Password" />
            </div>

            <div className="container-login100-form-btn">
              <button type="submit" style={{ width: "100px", marginTop: "20px", marginLeft: "10%", backgroundColor: "#fe5b29" }} className="btn btn-primary mb-3" id="submit">Sign Up</button>
            </div>
            
          </div>
          <div class="container-login100-form-btn">
                           <span style={{marginLeft:"-30%"}}>You have account?<Link to="/" state={{fontWeight:"bolder"}} >sign In</Link></span> 
                  </div>
        </form>
        
      </div>
    </div>
  </div>
);
  }
