import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [bets, setBets] = useState([]);
  const [fundBalance, setFundBalance] = useState([]);

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
  
  return (
    <div className="container">
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
    </div>
  );
};

export default HomePage;
