import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddFunds.css'


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
       <div className="display">
       <h2 className="title-fund">If your balance is getting low, add some funds to continue betting!</h2>
       <form onSubmit={handleSubmit}>
            <label className="search-field">
              Amount to add:
              <input
              type="number"
              name="fund_balance"
              value={fundBalance}
              onChange={(event) => setFundBalance(event.target.value)}
              />
            </label>
            <button className="button" type="submit">Deposit</button>
      </form>
      <img src="/track.jpg" alt="Zoomed in picture of running track" width="200px" height="200px"/>
      </div>
     );
}
 
export default AddFunds;