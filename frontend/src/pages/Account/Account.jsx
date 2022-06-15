import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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

const handleClick = (user) => {
    // preventDefault();
    navigate(`/status/${user.id}`, {
        state:{
            fund: user.fund_balance,
            totalWins: user.total_bets_won,
            status: user.status
        },
    });
  };

return ( 
    <div>
       <h1 className="account">Your current account info</h1> 
  {userData &&
          userData.map((user) => (
          <div className="account" key={user.id}>
            <p><Link to='/history'>Betting history</Link></p>
            <p>Balance: ${user.fund_balance}</p>  
            <p>Total wins: {user.total_bets_won}</p>
            <p>Status: {user.status}</p>
           <button className="button" onClick={() => handleClick(user)}>Check status</button>
          </div>
          ))}
        <div className="text">
            <h2>About your account:</h2>
            <div className="about">
                <p><b>Balance</b> = Funds currently available for you to place bets with</p>
                <p><b>Total wins</b> = This includes all winning bets since account was opened (whether you won $1 or $100,000)</p>
                
            </div>
        </div>
    </div>
    )
}
 
export default Account;