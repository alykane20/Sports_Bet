import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Account.css'

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
    <div>
        <h2>About your account:</h2>
        <p>Balance = Funds currently available for you to place bets with</p>
        <p>Total wins = This includes all winning bets since account was opened (whether you won $1 or $100,000)</p>
        <p>Track your status:</p>
        <ul className="list-status">
            <li>0-9 wins = Newbie</li>
            <li>10 wins = Drafted</li>
            <li>25 wins = Rookie</li>
            <li>50 wins = Starter</li>
            <li>100 = Pro</li>
            <li>250 = Star</li>
            <li>500 = MVP</li>
            <li>1000 = All-star</li>
        </ul>
    </div>
   
 
    </div>
    )
}
 
export default Account;