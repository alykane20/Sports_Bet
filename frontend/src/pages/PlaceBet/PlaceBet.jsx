import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import './PlaceBet.css'

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
            <h3 className="header">Please fill in the following fields with exact team name and moneyline from previous page</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Team to win: {" "}
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
                <button className="button" type='submit'>Confirm bet</button>
            </form>
            <div>
                <h2 className="header">If you're new to sports betting, here's some info to help get you started!</h2>
                <ul className="list-status">
                    <li>What is the "moneyline"?</li>
                    <li>A negative number (ex. -330) denotes the favored team, while a positive one (ex. 200) is the underdog</li>
                    <li>The number itself shows how much you can win!</li>
                    <li>For the favored team, you'd have to bet the amount shown to win $100</li>
                    <li>To win $100 in the above example, you'd need to bet $330, for a total payout of $430</li>
                    <li>For the underdog, the positive number is what you'd win if you bet $100</li>
                    <li>So if you bet $100, you'd win $200, for total payout of $300</li>
                    <li>Of course there are many other ways to bet, but that's the basics of the moneyline!</li>
                </ul>
            </div>
        </div>
     );
}
 
export default PlaceBet;