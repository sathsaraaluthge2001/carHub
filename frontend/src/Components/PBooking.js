import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from './AuthService ';
import axios from 'axios';


export default function PBooking(){

    const [booking, seBooking] = useState([]);

  const getBooking = () => {
    axios.get('http://localhost:6060/Booking/st?status=pending')
      .then((res) => {
        console.log(res.data);
        seBooking(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });    
      
  };

  console.log(booking);

  useEffect(() => {
    getBooking();
    
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
/*------------------------------*/
      const [txtStatus,setStatus]=useState("");
      const txtPick=booking.pickupdate;
      const txtRetu=booking.returndate;
      const txtCon=booking.contactno;
      const txtAdRe=booking.aditionalreq;
      const txtDLicen=booking.dlicen;
      const txtRegnumber=booking.regnumber;
      const txtVid=booking.vid;
      const txtUid=booking.uId;
      const txtEmail=booking.email;
      const [selectedBookingId, setSelectedBookingId] = useState("");
      const [selectedVehiId, setSelectedVehiId] = useState(""); // New state for selected booking ID

      const handleOkClick = (bookingId,bookingVehiId) => {
        setSelectedBookingId(bookingId);
        setSelectedVehiId(bookingVehiId);// Set the selected booking ID when the "Ok" button is clicked
      };

   function sendData(e){
    e.preventDefault();

    
  
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

    axios.put(`http://localhost:6060/Booking/update/${selectedBookingId}`, newBooking)
          .then(() => {
            alert("status update successfully");
            window.location.reload();
          })
          .catch((err) => {
            alert("status not  updated: " + err);
          
          });

    if(txtStatus==="Accept"){
      const txtavailable="Unavailiable";
      const newAvailiable = {
        available:txtavailable
      };

      axios.put(`http://localhost:6060/Vehicle/updateAvailability/${selectedVehiId}`, newAvailiable)
          .then(() => {
            alert("Availiable update successfully");
            
          })
          .catch((err) => {
            alert("Availiable not  updated: " + err);
          
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


    return(
        <div >
            <div class="container-login100"style={{...divStyle, width: "100%", height: "100vh" }}>  
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
        
          <div style={{ overflowX: 'auto', padding: '20px', marginLeft: '125px', alignItems: 'center' }}>
        <h1 style={{ alignItems: 'center', color: "#808080" }}>Pending Bookings</h1>
        <form onSubmit={sendData}>
          <div  className='booki' style={{ overflowX: 'auto', marginLeft: '130px', maxHeight: '500px' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', borderRadius: '5px' }}>
              <thead style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid #ddd' }}>
                <tr>
                  <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Vehicle Number</th>
                  <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Email</th>
                  <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Pick up date</th>
                  <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Return Date</th>
                  <th style={{ padding: '12px',  borderBottom: '1px solid #ddd' }}>Status</th>
                  <th style={{ padding: '5px',  borderBottom: '1px solid #ddd' }}>View</th>
                  <th style={{ padding: '5px',  borderBottom: '1px solid #ddd' }}>Accept/Decline</th>
                  <th style={{ padding: '5px',  borderBottom: '1px solid #ddd' }}>Update</th>
                </tr>
              </thead>

              <tbody style={{ maxHeight: '500px' }}>
                {booking.map((b, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '12px' }}>{b.regnumber}</td>
                    <td style={{ padding: '12px' }}>{b.email}</td>
                    <td style={{ padding: '12px' }}>{b.pickupdate}</td>
                    <td style={{ padding: '12px' }}>{b.returndate}</td>
                    <td style={{ padding: '12px' }}>{b.status}</td>
                    <td style={{ padding: '5px', textAlign: 'center' }}>
                      <a className="nav-link" href={`/get/${b._id}`}>
                        <img
                          src={`http://localhost:6060/images/eye.png`}
                          alt={`${index}`}
                          style={{ width: '20px', height: '20px', objectFit: 'cover', cursor: 'pointer' }}
                        />
                      </a>
                    </td>
                    <td style={{ padding: '5px', textAlign: 'center' }}>
                      <select style={{ background: 'white' }} name="Type" className="form-control" id="txtType" onChange={(e) => {
                        setStatus(e.target.value);
                      }}>
                        <option value="Decline">Decline</option>
                        <option value="Accept">Accept</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px' }}><button type="submit" onClick={() => handleOkClick(b._id, b.vid)}>Ok</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
  </div>
  </div>  


    )
}