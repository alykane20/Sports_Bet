import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './HomePage.css';

const HomePage = () => {
  const [user, token] = useAuth();
  const [bets, setBets] = useState([]);
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

  const handleAccountClick = (e) => {
    e.preventDefault();
    navigate("/account")
    }
  const handleFundClick = (e) => {
    e.preventDefault();
    navigate("/addfunds")
    }
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/resolve")
  }

  return (
    <div className="container">
      <div className="items">
        <h1>Account information for {user.username}!</h1>
        <p>Open bets:</p>
        {bets &&
          bets.map((bet) => {
            if(bet.completed ==false){
              return(
          <p key={bet.id}>
            {bet.pick}:  Payout ${bet.payout} 
          </p>
)}})}
      <button className="button" onClick={(event) => handleAccountClick(event)}> View your account</button>
      <button className="button" onClick={(event) => handleFundClick(event)}> Add funds to account</button>
      <button className="button" onClick={(event) => handleClick(event)}> Check to see if you won</button>
      </div>
    </div>
  );
     };

export default HomePage;
