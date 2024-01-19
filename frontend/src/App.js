import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from './Components/Header';
import AddVehicle from './Components/AddVehicle';
import AllVehicle from './Components/AllVehicle';
import UpdateVehicle from './Components/UpdateVehicle';
import VehicleDetail from "./Components/VehicleDetail";
import HomePage from "./Components/HomePage";
import LoginHandle from "./Components/LoginPage";
import Index from "./Components/index";
import Blank from "./Components/Blank";
import UserNav from "./Components/UserNav";
import UVehicles from "./Components/UVehicles";
import VehiDe from "./Components/VehiDe";
import AddUser from "./Components/AddUser";
import AllUser from "./Components/AllUser";
import Register from "./Components/Register";
import PBooking from "./Components/PBooking";
import ABooking from "./Components/ABooking";
import UserProfile from "./Components/UserProfile";
import AdminUser from "./Components/AdminUser";
import UserBookings from "./Components/UserBookings";
import { AuthService } from "./Components/AuthService ";

import './App.css';
import './css/bootstrap.min.css';
import './css/style.css';
import './css/side.css';
import './css/vehicle.css';
import './css/animate.min.css';

function App() {
   // Check if user is logged in
   const isLoggedIn = AuthService.isLoggedIn(); // Check if user is logged in
   const userRole = AuthService.getUserRole();
   const regPage='reg';
   const regDirect= true;
  return (
    <Router>
      <div className="App">
      {isLoggedIn ? (userRole === 'admin' ? <Header /> : null) : (<LoginHandle />)}
        <Routes>
        <Route path="/index:uId"element={isLoggedIn ? (userRole === 'admin' ? <Header /> : <Index />) : ( <Navigate to="/" /> ) }/>
        <Route
            path="/"
            element={isLoggedIn ? <LoginHandle /> : <Navigate to="/" />}
          />
          <Route
            path="/reg"
            element={regDirect ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/Header/:id"
            element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/AddUser"
            element={isLoggedIn ? <AddUser /> : <Navigate to="/" />}
          />
          <Route
            path="/AllUser"
            element={isLoggedIn ? <AllUser /> : <Navigate to="/" />}
          />
          <Route
            path="/add"
            element={isLoggedIn ? <AddVehicle /> : <Navigate to="/" />}
          />
          <Route
            path="/all"
            element={isLoggedIn ? <AllVehicle /> : <Navigate to="/" />}
          />
          <Route
            path="/update/:id"
            element={isLoggedIn ? <UpdateVehicle /> : <Navigate to="/" />}
          />
          <Route
            path="/get/:id"
            element={isLoggedIn ? <VehicleDetail /> : <Navigate to="/" />}
          />

          <Route
            path="/index/:uId"
            element={isLoggedIn ? <Index /> : <Navigate to="/" />}
          />
          <Route
            path="/vehi/:uId"
            element={isLoggedIn ? <UVehicles /> : <Navigate to="/" />}
          />
          <Route
            path="/pBook"
            element={isLoggedIn ? <PBooking /> : <Navigate to="/" />}
          /><Route
            path="/profile/:uId"
            element={isLoggedIn ? <UserProfile /> : <Navigate to="/" />}
          />
          <Route
            path="/viewUser/:uId"
            element={isLoggedIn ? <AdminUser /> : <Navigate to="/" />}
          />
          <Route
            path="/Abook"
            element={isLoggedIn ? <ABooking /> : <Navigate to="/" />}
          />
          <Route
            path="/book/:id/:uId"
            element={isLoggedIn ? <VehiDe /> : <Navigate to="/" />}
          />
          <Route
            path="/UserBookings/:uId"
            element={isLoggedIn ? <UserBookings /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
