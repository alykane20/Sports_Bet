import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddFunds = (props) => {
const [user, token] = useAuth();
const [fundBalance, setFundBalance] = useState([]);
const navigate = useNavigate();

    let initialValues = {
        fund_increase: fundBalance}
    
      async function addFunds(){
        try {
            let response = await axios.patch("http://127.0.0.1:8000/api/auth/funds/", initialValues, {
                headers:{
                    Authorization: 'Bearer ' + token
                }
            });
        } catch (error) {
            console.log(error)
        }};

const handleSubmit = (e) => {
    e.preventDefault();
    addFunds()
    navigate("/account")
}

    return ( 
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
     );
}
 
export default AddFunds;