import React,{useState,useEffect} from"react"
import axios from "axios";
import { AuthService } from "./AuthService ";

export default function AddVehicle() {

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


    const [txtBrand, setBrand] = useState("");
    const [txtModel, setModel] = useState("");
    const [txtType, setType] = useState("");
    const [txtYear, setYear] = useState("");
    const [txtFeatures, setFeatures] = useState("");
    const [txtFuelType, setFuelType] = useState("");
    const [txtPricePerDay, setPricePerDay] = useState("");
    const [txtReg,setReg]=useState("");
    const [txtTransmission,setTrans]=useState("");
    const [txtAvai,setAvai]=useState("");

    const [fileImage, setImage] = useState(); // Changed to null
  
    function sendData(e) {
      e.preventDefault();
  
      if (!txtBrand || !txtModel || !txtType || !txtYear || !txtFeatures || !txtFuelType || !txtPricePerDay || !fileImage) {
        alert("Please fill in all fields and select an image.");
        return;
      }
      
      const formData = new FormData();
      formData.append('image', fileImage); // Updated
  
      formData.append('brand', txtBrand);
      formData.append('model', txtModel);
      formData.append('year', txtYear);
      formData.append('type', txtType);
      formData.append('fueltype', txtFuelType);
      formData.append('features', txtFeatures);
      formData.append('priceperday', txtPricePerDay);
      formData.append('transmission', txtTransmission);
      formData.append('regnumber', txtReg);
      formData.append('available', txtAvai);
  
      console.log(formData);
  
      axios.post("http://localhost:6060/Vehicle/add", formData)
        .then(() => {
          alert("Vehicle added successfully");
          window.location.reload();
          
        })
        .catch((err) => {
          alert("Vehicle not added: " + err);
        
        });
    }

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
        <div style={{ ...divStyle, width: "100%", height: "100vh" }}>
                
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
      
        <div style={{ overflowX: 'auto',padding: '20px', marginLeft:'125px' ,alignItems:'center' }}>
            <h1 style={{color:"#808080"}}>Add Vehicle</h1>
        <form className='booki' style={{marginLeft:'300px',alignItems:'center',marginTop:'1px',padding: '20px',width:'52%', borderRadius: '30px'}} onSubmit={sendData} >
            <div>
            {/* Brand, Model, and Year */}
            <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                <div>
                <label style={{ color: 'black' }}>Brand: </label>
                <select style={{ background: 'white' }} class="form-control" name="Brand" id="txtBrand"  onChange={(e) => {
                    setBrand(e.target.value);
                }}>
                    <option value="volvo">Volvo</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Benz">Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="BMW">BMW</option>
                    <option value="Range Rover">Range Rover</option>
                    <option value="Land Rover">Land Rover</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Ford">Ford</option>
                    <option value="suzuky">suzuky</option>
                </select>
                </div>
                <div>
                <label style={{ color: 'black' }}>Model:</label>
                <input type="text" style={{ background: 'white' }} class="form-control" id="txtModel"  onChange={(e) => {
                    setModel(e.target.value);
                }} />
                </div>
                <div>
                <label style={{ color: 'black' }}>Year:</label>
                <input type="text" class="form-control" style={{ background: 'white' }}  id="txtYear" onChange={(e) => {
                    setYear(e.target.value);
                }} />
                </div>
            </div>

            {/* Type, Transmission, and Availability */}
            <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                <div>
                <label style={{ color: 'black' }}>Type:</label>
                <select style={{ background: 'white' }} name="Type" class="form-control"  id="txtType" onChange={(e) => {
                    setType(e.target.value);
                }}>
                    <option value="suv">SUV</option>
                    <option value="sport">Sport</option>
                    <option value="Hybrid ">Hybrid </option>
                </select>
                </div>
                <div>
                <label style={{ color: 'black' }}>Transmission:</label>
                <select style={{ background: 'white' }} name="Transmission" class="form-control"  id="txtTransmission" onChange={(e) => {
                    setTrans(e.target.value);
                }}>
                    <option value="Auto">Auto</option>
                    <option value="Manual">Manual</option>
                </select>
                </div>
                <div>
                <label style={{ color: 'black' }}>Availability:</label>
                <select style={{ background: 'white' }} name="Availability" class="form-control"  id="txtAvai" onChange={(e) => {
                    setAvai(e.target.value);
                }}>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                </select>
                </div>
            </div>

            {/* Fuel Type, Seats, and Price Per Day */}
            <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                <div>
                <label style={{ color: 'black' }}>Fuel Type:</label>
                <select style={{ background: 'white' }} name="FuelType" class="form-control"  id="txtFuelType"  onChange={(e) => {
                    setFuelType(e.target.value);
                }}>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="electric">Electric</option>
                </select>
                </div>
                <div>
                <label style={{ color: 'black' }}>Seats:</label>
                <input type="text" class="form-control" style={{ background: 'white' }} id="txtFeatures"  onChange={(e) => {
                    setFeatures(e.target.value);
                }} />
                </div>
                <div>
                <label style={{ color: 'black' }}>Price Per Day:</label>
                <input type="text" class="form-control" style={{ background: 'white' }} id="txtPricePerDay"  onChange={(e) => {
                    setPricePerDay(e.target.value);
                }} />
                </div>
            </div>

            {/* Image upload */}

            <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
            <div>
                <label style={{ color: 'black' }}>Reg-No:</label>
                <input type="text" class="form-control" style={{ background: 'white' }} id="txtReg"  onChange={(e) => {
                    setReg(e.target.value);
                }} />
                </div>
                <div>
                <label style={{ color: 'black' }}>Image:</label>
                <input type="file" style={{ background: 'white' }} class="form-control"  id="fileImage" onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    setImage(selectedFile);
                }} />
                </div>
            </div>

            {/* Submit button */}
            <div style={{ display: 'flex', gap: '30px'}}>
                <button type="submit" style={{backgroundColor:"#e74c3c"}}class="btn btn-primary mb-3" id="submit">Submit</button>
            </div>
            </div>
        </form>
        </div>
        </div>
    )
}