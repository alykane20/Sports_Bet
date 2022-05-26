import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { useState } from "react/cjs/react.production.min";

const PlaceBet = (props) => {
    const [pick, setPick] = useState('');
    const [amountBet, setAmountBet] = useState('');
    const [money, setMoney] = useState('')
    const [payout, setPayout] = useState('')

    let initialValues = {
        pick: pick,
        amount_bet: amountBet,
        won: false,
        team_one: props.selectedGame.bookmakers[0].markets[0].outcomes[0].name,
        team_two: props.selectedGame.bookmakers[0].markets[0].outcomes[1].name,
        winning_team: 'TBD',
        payout: payout,
        game_id: props.selectedGame.id
    }
    const [user, token] = useAuth()
    const navigate = useNavigate()
    // const [formData] = useCustomForm(initialValues)
    
    async function placeNewBet(){
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/bets/", initialValues, {
                headers:{
                    Authorization: 'Bearer ' + token
                }
            })
            navigate("/")
        } catch (error) {
            console.log(error)
        }}
    
    function betCalculator(moneyLine) {
        var odds;
        var betAmount = amountBet;   
        odds = moneyLine >= 0 ? (moneyLine / 100) + 1 : (100 / Math.abs(moneyLine)) + 1; 
        
        setPayout(parseFloat((odds * betAmount).toFixed(2)));
    }
    const handleSubmit = () => {
        betCalculator(money);
        placeNewBet()
    }
    console.log(payout)
    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Pick to win: {" "}
                    <input
                    type="text"
                    name="pick"
                    value={pick}
                    onChange={(event) => setPick(event.target.value)}
                    />
                </label>
                <label>
                    Amount to bet: {" "}
                    <input
                    type="number"
                    name="amount_bet"
                    value={amountBet}
                    onChange={(event) => setAmountBet(event.target.value)}
                    />                   
                </label>
                <label>
                MoneyLine: {" "}
                    <input
                    type="number"
                    name="payout"
                    value={money}
                    onChange={(event) => setMoney(event.target.value)}
                    />
                </label>
                <button type='submit'>Confirm bet</button>
            </form>
        </div>
     );
}
 
export default PlaceBet;