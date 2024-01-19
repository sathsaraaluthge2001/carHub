import React from "react";
import  axios  from "axios";


export default function deleteVehicle(vehicleId){
  return axios.delete(`http://localhost:6060/Vehicle/delete/${vehicleId}`)
    
}