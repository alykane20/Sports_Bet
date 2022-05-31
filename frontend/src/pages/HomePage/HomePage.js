import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './HomePage.css';

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [bets, setBets] = useState([]);
  const [fundBalance, setFundBalance] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBets = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/bets/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setBets(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchBets();
  }, [token]);

  let initialValues = {
    fund_increase: fundBalance
  }

  async function addFunds(){
    try {
        console.log(initialValues)
        let response = await axios.patch("http://127.0.0.1:8000/api/auth/funds/", initialValues, {
            headers:{
                Authorization: 'Bearer ' + token
            }
        })
    } catch (error) {
        console.log(error)
    }};
    
  const handleSubmit = (e) => {
      e.preventDefault();
      addFunds()
  }
  
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/resolve")
  }

  return (
    <div className="container">
      <div className="items" >
      <h1>Account information for {user.username}!</h1>
      <p>Balance: ${user.fund_balance}</p>
      <p>Status: {user.status}</p>
      <p>My open bets:</p>
      {bets &&
        bets.map((bet) => (
          <p key={bet.id}>
            {bet.pick}:  Payout ${bet.payout} 
          </p>
        ))}
        
      <form onSubmit={handleSubmit}>
            <label>
              Add funds to balance:
              <input
              type="number"
              name="fund_balance"
              value={fundBalance}
              onChange={(event) => setFundBalance(event.target.value)}
              />
            </label>
            <button type="submit">Deposit</button>
      </form>
      <button className="button" onClick={(event) => handleClick(event)}> Check to see if you won</button>
          </div>
          <div className="items">
            <p>"Balance" : Current funds in your account available to place bets with</p>
            <p> "Status": Track your progress as you play and win bets!
              New accounts start as a "newbie"
              10 wins = Drafted
              25 wins = Rookie
              50 wins = Starter
              100 = Pro
              250 = Star
              500 = MVP
              1000 = All-star
            </p>
            <p>"Open bets: Any games you currently have bets on that haven't been completed yet</p>
          </div>
    </div>
  );
};

export default HomePage;
