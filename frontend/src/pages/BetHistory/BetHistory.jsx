import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './BetHistory.css'

const BetHistory = (props) => {
    const [user, token] = useAuth();
    const [bets, setBets] = useState([]);
    const navigate = useNavigate();
    const [wins, setWins] = useState([]);
    const [losses, setLosses] = useState([]);
    
  
    useEffect(() => {
      const fetchBets = async () => {
        try {
          let response = await axios.get("http://127.0.0.1:8000/api/bets/", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          setBets(response.data);
          winningPercent()
        } catch (error) {
          console.log(error.response.data);
        }
      };
      fetchBets();
    }, [token]);

    function winningPercent(){
      let victory = bets && bets.filter((el) =>{
      if(el.pick == el.winning_team){return true}
    })
    console.log(victory.length)  
    setWins(victory.length)
      let defeat = bets && bets.filter((el) =>{
        if (el.pick != el.winning_team){return true}
    })
    console.log(defeat.length) 
      setLosses(defeat.length)

    }

    return (  
    <div>
      {/* <div className="percent">Overall win percentage: {parseInt((wins / losses)*100)}%</div> */}
        <h2 className="header">Wins</h2>
        <table className="table">
                <tbody>
                    <tr>
                        <th className="title">Home Team</th>
                        <th className="title">Away Team</th>
                        <th className="title">Game Winner</th>
                        <th className="title">Amount Bet</th>
                        <th className="title">Total payout</th>
                    </tr>
                   {bets.map((bet)=>{
                    if (bet.pick == bet.winning_team){
                        return(
                    <tr key={bet.id}>
                        <td className="row">{bet.team_one}</td>
                        <td className="row">{bet.team_two}</td>
                        <td className="row">{bet.winning_team}</td>
                        <td className="row">${bet.amount_bet}</td>
                        <td className="row">${bet.payout}</td>
                    </tr>
                    )}})}
                </tbody>
            </table>
            <h2 className="header" >Losses</h2>
            <table className="table">
                <tbody>
                    <tr>
                        <th className="title">Home Team</th>
                        <th className="title">Away Team</th>
                        <th className="title">Game Winner</th>
                        <th className="title">Your Pick</th>
                        <th className="title">Amount Bet</th>
                    </tr>
                   {bets.map((bet)=>{
                    if (bet.pick != bet.winning_team && bet.completed === true){
                        return(
                    <tr key={bet.id}>
                        <td className="row">{bet.team_one}</td>
                        <td className="row">{bet.team_two}</td>
                        <td className="row">{bet.winning_team}</td>
                        <td className="row">{bet.pick}</td>
                        <td className="row">${bet.amount_bet}</td>
                    </tr>
                    )}})}
                </tbody>
            </table>
    </div>
    );
}
 
export default BetHistory;