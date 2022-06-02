import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Account = (props) => {
const [user, token] = useAuth();
const navigate = useNavigate();
const [userData, setUserData] = useState([]);


useEffect(() => {
    const getUser = async () => {
    try {
        let response = await axios.get("http://127.0.0.1:8000/api/auth/info/", {
            headers:{
                Authorization: 'Bearer ' + token
            }
        })
        setUserData(response.data);
    } catch (error) {
        console.log(error)
    }
  };
    getUser();
}, [token]);

return ( 
    <div>
  {userData &&
          userData.map((user) => (
          <div key={user.id}>
           <p>Balance: ${user.fund_balance}</p>  
           <p>Total wins: {user.total_bets_won}</p>
           <p>Status: {user.status}</p>
          </div>
          
          ))}
    
   
 
    </div>
    )
}
 
export default Account;