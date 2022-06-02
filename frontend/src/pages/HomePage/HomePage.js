import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './HomePage.css';

const HomePage = () => {
  const [user, token] = useAuth();
  const [bets, setBets] = useState([]);
  const [userData, setUserData] = useState([]);
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


    async function getUser(){
      try {
          let response = await axios.get("http://127.0.0.1:8000/api/auth/info/", {
              headers:{
                  Authorization: 'Bearer ' + token
              }
          })
          setUserData(response.data);
          console.log("user", response.data)
      } catch (error) {
          console.log(error)
      }};

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
      <p>Balance: ${user.fund_balance}</p>
      <p>Status: {userData.status}</p>
      <p>Total wins: {userData.total_bets_won}</p>
      <p>Open bets:</p>
      {bets &&
        bets.map((bet) => (
          <p key={bet.id}>
            {bet.pick}:  Payout ${bet.payout} 
          </p>
        ))}
      <button className="button" onClick={(event) => handleAccountClick(event)}> View your account</button>
      <button className="button" onClick={(event) => handleFundClick(event)}> Add funds to account</button>
      <button className="button" onClick={(event) => handleClick(event)}> Check to see if you won</button>
          </div>
          <div className="items">
            <p>"Balance" : Current funds in your account available to place bets with</p>
            <p> "Status": Track your progress as you play and win bets!
              New accounts start as Newbie:
              <ul className="list-status">
              <li>10 wins = Drafted</li>
              <li>25 wins = Rookie</li>
              <li>50 wins = Starter</li>
              <li>100 = Pro</li>
              <li>250 = Star</li>
              <li>500 = MVP</li>
              <li>1000 = All-star</li>
              </ul>
            </p>
            <p>"Open bets": Any games you currently have bets on that haven't been completed yet</p> */}
      </div>
      </div>
  );
};

export default HomePage;
