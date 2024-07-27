import React, {useState} from "react";


import {createCustomer,} from "../services/CustomerProfileService.js";


const CustomerSignUp = () => {

    const [customer, setCustomer] = useState({
            firstName: '',
            lastName: '',
        cellNo: '',
        license: '',
            email: '',
            password: '',
        });

      const [action, setAction ] = useState ("SignUp");
     return(
           <div className = 'container'>
               <div className="header">
                   <div className="text">{action}</div>
                   <div className='underline'></div>

        </div>

          <div className = "inputs">
            {action==="Login"?<div> </div>: <div className = "input">
                <input type="text" placeholder="Name"/>
    </div>
}

           {action==="Login"?<div> </div>: <div className = "input">
               <input type="text" placeholder="Surname"/>
    </div>
            }

           {action==="Login"?<div> </div>:  <div className = "input">
               <input type="tel" placeholder="Contact"/>
    </div>
            }

           {action==="Login"?<div> </div>:  <div className = "input">
               <input type="text" placeholder="License"/>
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

       {action === "Login" && (
           <div className="submit" onClick={() => {
               createCustomer(customer);
           }}> Submit</div>)}
   </div>
           </div>
     );
};

export default CustomerSignUp