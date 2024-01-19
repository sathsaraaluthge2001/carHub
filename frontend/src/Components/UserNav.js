import React from 'react';
import { Link } from 'react-router-dom';

export default function UserNav(){

    return(
        <nav style={{ background: "#333333" }} className="navbar navbar-expand-lg navbar-light">
        <a style={{marginLeft:"10px",color:"whitesmoke",fontStyle:"italic",fontSize:"26px"}} className="navbar-brand" href="#">car<span style={{color:"#fe5b29"}}>H</span>ub</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a style={{color:"whitesmoke"}} className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a style={{color:"whitesmoke"}} className="nav-link" href="/vehi">Vehicles</a>
          </li>
          <li className="nav-item">
            <a style={{color:"whitesmoke"}}  className="nav-link" href="#">about Us</a>
          </li>
          <li className="nav-item">
            <a style={{color:"whitesmoke"}} className="nav-link" href="#">Contact Us</a>
          </li>
        </ul>
      </div>
    </nav>

    )
}