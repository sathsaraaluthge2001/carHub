import React,{useState,useEffect} from"react"
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { AuthService } from "./AuthService ";

export default function VehiDe(){

    const{id}=useParams();
    const{uId}=useParams();

    const [vehicle, setVehicles] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
      getUser();
    }, []);
    
    const getUser = () => {
      axios.get(`http://localhost:6060/User/getid/${uId}`)
        .then((res) => {
          console.log("Response from /User/getid/", res.data);
          const userData = res.data.user;
    
          if (userData) {
            setUser(userData);
            getVehicle();
            console.log(userData.email);
          } else {
            console.log("User not found");
          }
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          alert("Error fetching user: " + err.message);
        });
    };
  

//get vehicle delails
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

      const txtAvailiable="Unavailiable";
      const [txtPick, setPick] = useState("");
      const [txtRetu, setRetu] = useState("");
      const [txtCon, setCon] = useState("");
      const [txtAdRe, setAdRe] = useState("");
      const [txtDLicen, setDLicen] = useState("");
      const txtRegnumber=vehicle.regnumber;
      const txtVid=id;
      const txtUid=uId;
      const txtEmail=user.email;
      const txtStatus="pending";

      function sendData(e) {
        e.preventDefault();

        if(txtAvailiable === vehicle.available){
          alert("Sorry not Available this car...");
          return;
        }
        else{

        
        
        if (!txtPick || !txtRetu || !txtRegnumber || !txtUid || !txtEmail || !txtCon || !txtDLicen || !txtStatus) {
          alert("Please fill in all required fields.");
          return;
        }
      
        const newBooking = {
          pickupdate: txtPick,
          returndate: txtRetu,
          regnumber: txtRegnumber,
          vid: txtVid,
          uid: txtUid,
          email: txtEmail,
          contactno: txtCon,
          dlicen: txtDLicen,
          additionalRequirement: txtAdRe,
          status:txtStatus
        };
      
        axios.post("http://localhost:6060/Booking/add", newBooking)
          .then(() => {
            alert("Booking added successfully");
          })
          .catch((err) => {
            alert("Booking not added: " + err);
          });
      }
    }

    const loadProfile=()=>{
      window.location.href = `/profile/${uId}`; // Redirect to the login page after logout
     }

    return (
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
        <div className="dii">
          <div className="vehicle-details-container1">
            <div className="vehicle-info1">
              <div className="reg-number1" style={{marginLeft:"260px",fontSize:"42px",fontStyle:"italic"}}>{vehicle.regnumber}</div>
            </div>
            <div className="vehicle-info1">
              <div>
                <p className="detail1"><strong className="st">Model:</strong> {vehicle.model}</p>
                <p className="detail1"><strong className="st">Brand:</strong> {vehicle.brand}</p>
                <p className="detail1"><strong className="st">Year:</strong> {vehicle.year}</p>
              </div>
              <div>
                <p className="detail1"><strong className="st">Type:</strong> {vehicle.type}</p>
                <p className="detail1"><strong className="st">Fuel Type:</strong> {vehicle.fueltype}</p>
                <p className="detail1"><strong className="st">Available:</strong> {vehicle.available}</p>
              </div>
              <div>
                <p className="detail1"><strong className="st">Seats:</strong> {vehicle.features}</p>
                <p className="detail1"><strong className="st">Transmission:</strong> {vehicle.transmission}</p>
                <p className="detail1"><strong className="st">Per day Rs:</strong> {vehicle.priceperday}.00</p>
                {/* Include other details similarly */}
              </div>
              {/* Repeat this structure for additional vehicle components */}
            </div>
          </div>
          <div className="veh"  style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <img className="img" style={{ width: "auto", textAlign: "center",height:"400px" }} src={`http://localhost:6060/images/${vehicle.image}`} alt="Vehicle" />
            </div>
          </div>
          <div style={{ marginTop:"35%"}}>
                <form onSubmit={sendData} className="booking-form" style={{ width: "40%", border: "2px solid #ccc", borderRadius: "50px", padding: "20px" }}>
                    <div className="form-row">
                    <div className="form-group">
                        <label className="lbname" htmlFor="pickupDate">Pickup Date:</label>
                        <input style={{ background: "white" }} className="form-control" type="date" id="pickupDate" name="pickupDate" required onChange={(e) => {
                    setPick(e.target.value);
                }}/>
                    </div>
                    <div className="form-group">
                        <label className="lbname" htmlFor="returnDate">Return Date:</label>
                        <input style={{ background: "white" }} className="form-control" type="date" id="returnDate" name="returnDate" required onChange={(e) => {
                    setRetu(e.target.value);
                }}/>
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group">
                        <label className="lbname" htmlFor="contactNumber">Contact Number:</label>
                        <input style={{ background: "white" }} className="form-control" type="tel" id="contactNumber" name="contactNumber" required onChange={(e) => {
                    setCon(e.target.value);
                }}/>
                    </div>
                    <div className="form-group">
                        <label className="lbname" htmlFor="driverLicenseNumber">Driver's License Number:</label>
                        <input style={{ background: "white" }} className="form-control" type="text" id="driverLicenseNumber" name="driverLicenseNumber" required onChange={(e) => {
                    setDLicen(e.target.value);
                }}/>
                    </div>
                    </div>
                    <div className="form-group" style={{ textAlign: "center" }}>
                      <label className="lbname" htmlFor="additionalRequirement">Additional Requirements:</label>
                      <textarea style={{ background: "white" }} className="form-control" id="additionalRequirement" name="additionalRequirement" rows="4" onChange={(e) => {
                        setAdRe(e.target.value);
                      }}></textarea>
                    </div>
                    <div className="form-group" style={{ textAlign: "center" }}>
                    <button style={{backgroundColor:"#e74c3c"}}class="btn btn-primary mb-3" type="submit">Book Car</button>
                    </div>
                </form>
                </div>
        </div>

        </div>
      );
      
}