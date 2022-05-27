import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";

const PlaceBet = (props) => {
    const [pick, setPick] = useState('');
    const [amountBet, setAmountBet] = useState('');
    const [money, setMoney] = useState('');
    const [payout, setPayout] = useState('');
    const [teamOne, setTeamOne] = useState ('');
    const [teamTwo, setTeamTwo] = useState ('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!loading){
            setTeamOne(props.selectedGame.bookmakers[0].markets[0].outcomes[0].name) 
            setTeamTwo(props.selectedGame.bookmakers[0].markets[0].outcomes[1].name)
        }
    }, [loading])

    useEffect(() =>{
        setLoading(false);
    }, [])

    useEffect(() =>{
        if(!loading){
        placeNewBet()}
    },[payout]
    )
        
    let initialValues = {
        pick: pick,
        amount_bet: amountBet,
        won: false,
        team_one: teamOne,
        team_two: teamTwo,
        winning_team: 'TBD',
        payout: payout,
        game_id: props.selectedGame.id
    }
    const [user, token] = useAuth()
    const navigate = useNavigate()
    
    async function placeNewBet(){
        try {
            console.log(initialValues)
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
        console.log('calculator')
        var odds;
        var betAmount = amountBet;   
        odds = moneyLine >= 0 ? (moneyLine / 100) + 1 : (100 / Math.abs(moneyLine)) + 1; 
        
        setPayout(parseFloat((odds * betAmount).toFixed(2)));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        betCalculator(money);
    }
   
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