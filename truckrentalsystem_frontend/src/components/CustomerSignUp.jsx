import React, { useState }  from "react";
import './CustomerSignUp.css'

import {
    createCustomer,
} from "../services/CustomerSignUp";
import { useNavigate } from "react-router-dom";


const CustomerSignUp = () => {

    const [customer, setCustomer] = useState({

            firstName: '',
            lastName: '',
            cellNo,
            license,
            email: '',
            password: '',

        });

      const [action, setAction ] = useState ("SignUp");
     return(
           <div className = 'container'>
           <div className = "header">
           <div className = "text">{action}</div>
           <div className = 'underline'></div>

        </div>

          <div className = "inputs">
            {action==="Login"?<div> </div>: <div className = "input">
          <input type="firstName" placeholder="Name" />
    </div>
}

           {action==="Login"?<div> </div>: <div className = "input">
          <input type="lastName" placeholder="Surname"/>
    </div>
            }

           {action==="Login"?<div> </div>:  <div className = "input">
          <input type="cellNo" placeholder="Contact"/>
    </div>
            }

           {action==="Login"?<div> </div>:  <div className = "input">
          <input type="license" placeholder="License"/>
    </div>
            }


    <div className = "input">
          <input type="email" placeholder="Email"/>
    </div>

           <div className = "input">
          <input type="password" placeholder="Password"/>
    </div>
    </div>
   <div className ="submit-container">
   <div className = {action=== "Login"? "submit gray": "submit"} onClick={()=>{setAction("Sign Up")}}> Sign Up </div>
   <div className ={action=== "Sign Up"? "submit gray": "submit"} onClick={()=>{setAction("Login")}}> Login </div>

   <div className = {action ==="Login"? "submit"} onClick={() => {createCustomer(customer)}}</div>
    </div>
    </div>
     )
}

export default CustomerSignUp