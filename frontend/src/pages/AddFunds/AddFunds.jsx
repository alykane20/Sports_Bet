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
           <div classname="fundbox">
                <form  onSubmit={handleSubmit}>
                <label className="search-field">
                Amount to add:  $
                <input
                type="number"
                name="fund_balance"
                value={fundBalance}
                onChange={(event) => setFundBalance(event.target.value)}
                />
                </label>
                <button className="button" type="submit">Deposit</button>
                </form>
            </div>  
        <div className="box">
            <img src="https://www.thesportsgeek.com/app/uploads/2020/01/sports-balls-money-pile.jpg" alt="sports balls and money" width="300px" height="250px"/>
            <img src="https://www.brainyquote.com/photos_tr/en/w/waynegretzky/378694/waynegretzky1-2x.jpg" alt="Gretzy quote" width="350px" height=" 250px"/>
            <img src="https://miro.medium.com/max/1400/0*aRPRErwCAUxmnFRL.jpg" alt="athletes and cash" width="300px" height="250px"/>
         </div>
      </div>
     );
}
 
export default AddFunds;