import React,{useState,useEffect} from"react"
import axios from "axios";

export default function dashbo(){


    return(

        <div style={{marginLeft:"400px"}}>
          <div style={{ width: "100px", height: "100px", backgroundColor: "#3498db", color: "#fff", padding: "10px", marginBottom: "10px" }}>
                Total Vehicles: <span style={{ fontWeight: "bold" }}>[Value]</span>
            </div>

            <div style={{ width: "100px", height: "100px", backgroundColor: "#2ecc71", color: "#fff", padding: "10px", marginBottom: "10px" }}>
                Total Users: <span style={{ fontWeight: "bold" }}>[Value]</span>
            </div>

            <div style={{ width: "100px", height: "100px", backgroundColor: "#e74c3c", color: "#fff", padding: "10px", marginBottom: "10px" }}>
                Total Income: <span style={{ fontWeight: "bold" }}>[Value]</span>
            </div>

            <div style={{ width: "100px", height: "100px", backgroundColor: "#f39c12", color: "#fff", padding: "10px", marginBottom: "10px" }}>
                Another Metric: <span style={{ fontWeight: "bold" }}>[Value]</span>
            </div>


         </div>   

    )
}

