import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";

let initialValues = {
    user: '',
    pick: '',
    amount_bet: '',
    won: false
}

const PlaceBet = (props) => {
    const [user, token] = useAuth()
    const navigate = useNavigate()
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, placeNewBet)
    
    async function placeNewBet(){
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/bets/", formData, {
                heades:{
                    Authorization: 'Bearer ' + token
                }
            })
            navigate("/")
        } catch (error) {
            console.log(error)
        }

    }
    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Pick to win: {" "}
                    <input
                    type="text"
                    name="pick"
                    value={formData.pick}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                    Amount to bet: {" "}
                    <input
                    type="text"
                    name="bet"
                    value={formData.amount_bet}
                    onChange={handleInputChange}
                    />
                </label>
                <button>Confirm bet</button>
            </form>
        </div>
     );
}
 
export default PlaceBet;