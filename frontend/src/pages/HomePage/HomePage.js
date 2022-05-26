import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [bets, setBets] = useState([]);

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
  
  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      <p>Balance: ${user.fund_balance}</p>
      <p>Status: {user.status}</p>
      <p>My open bets:</p>
      {bets &&
        bets.map((bet) => (
          <p key={bet.id}>
            {bet.pick} payout:${bet.payout} 
          </p>
        ))}
    </div>
  );
};

export default HomePage;
