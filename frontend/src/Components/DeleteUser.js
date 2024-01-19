import React from "react";
import  axios  from "axios";


export default function deleteUser(userId){
  return axios.delete(`http://localhost:6060/User/delete/${userId}`)
    
}