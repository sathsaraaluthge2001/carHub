import React,{useState,useEffect} from"react"
import axios from "axios";
import { AuthService } from "./AuthService ";
export default function AddUser(){

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
            alert("User added successfully");
            console.log("User added successfully");
            window.location.reload();
        }).catch((err)=>{
            alert("User not added",err);
            console.log("User not added",err );
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
          <div>      
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
        

          <div style={{   overflowX: 'auto', padding: '20px', marginLeft: '125px', alignItems: 'center' }}>
        <h1 style={{color:"#808080"}}>Add User</h1>
    <form className="back"  style={{marginLeft:'300px',alignItems:'center',marginTop:'20px',padding: '20px',width:'52%', borderRadius: '30px'}} onSubmit={sendData} >
        <div>
        {/* Brand, Model, and Year */}
        <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
        <div>
            <label style={{ color: 'black' }}>Email:</label>
            <input type="text" required class="form-control" style={{ background: 'white' }} id="txtEmail"  onChange={(e) => {
                setEmail(e.target.value);
            }} />
            </div>
            <div>
            <label style={{ color: 'black' }}>Name:</label>
            <input type="text" required style={{ background: 'white' }} class="form-control" id="txtName"  onChange={(e) => {
                setName(e.target.value);
            }} />
            </div>
            <div>
            <label style={{ color: 'black' }}>Address:</label>
            <input type="text" required class="form-control" style={{ background: 'white' }}  id="txtAddress" onChange={(e) => {
                setAddress(e.target.value);
            }} />
            </div>
        </div>

        {/* Type, Transmission, and Availability */}
        <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
            <div>
            <label style={{ color: 'black' }}>Gender:</label>
            <select required style={{ background: 'white' }} name="Transmission" class="form-control"  id="txtGender" onChange={(e) => {
                setGender(e.target.value);
            }}>
                <option value="male">male</option>
                <option value="female">female</option>
            </select>
            </div>
            <div>
            <label style={{ color: 'black' }}>Contact NO:</label>
            <input required type="text" class="form-control" style={{ background: 'white' }} id="txtcontactno"  onChange={(e) => {
                setcontactno(e.target.value);
            }} />
            </div>
            <div>
            <label style={{ color: 'black' }}>Password:</label>
            <input required type="text" style={{ background: 'white' }} class="form-control" id="txtPassword"  onChange={(e) => {
                setPassword(e.target.value);
            }} />
            </div>
        </div>
           
        </div>

        {/* Fuel Type, Seats, and Price Per Day */}

        {/* Image upload */}

        <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
        <div>
            <label style={{ color: 'black' }}>NIC:</label>
            <input required type="text" style={{ background: 'white' }} class="form-control" id="txNic"  onChange={(e) => {
                setNic(e.target.value);
            }} />
            </div>
        <div>
            <label style={{ color: 'black' }}>Image:</label>
            <input required type="file" style={{ background: 'white' }} class="form-control"  id="fileImage" onChange={(e) => {
                const selectedFile = e.target.files[0];
                setImage(selectedFile);
            }} />
            </div>

        {/* Submit button */}
        
        </div>
        <div style={{ display: 'flex', gap: '30px', marginBottom: '20px' }}>
            <button type="submit" style={{backgroundColor:"#e74c3c"}}class="btn btn-primary mb-3" id="submit">Submit</button>
        </div>
    </form>
    </div>

    </div>

</div>

    )
}