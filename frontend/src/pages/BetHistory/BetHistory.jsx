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
    <div>
        <h2 className="header">Wins</h2>
        <table className="table-items">
                <tbody>
                    <tr>
                        <th>Home Team</th>
                        <th>Away Team</th>
                        <th>Game Winner</th>
                        <th>Amount Bet</th>
                        <th>Total payout</th>
                    </tr>
                   {bets.map((bet)=>{
                    if (bet.pick == bet.winning_team){
                        return(
                    <tr key={bet.id}>
                        <td className="row">{bet.team_one}</td>
                        <td className="row">{bet.team_two}</td>
                        <td className="row">{bet.winning_team}</td>
                        <td className="row">{bet.amount_bet}</td>
                        <td className="row">{bet.payout}</td>
                    </tr>
                    )}})}
                </tbody>
            </table>
            <h2 className="header" >Losses</h2>
            <table className="table-items">
                <tbody>
                    <tr>
                        <th>Home Team</th>
                        <th>Away Team</th>
                        <th>Game Winner</th>
                        <th>Your Pick</th>
                        <th>Amount Bet</th>
                    </tr>
                   {bets.map((bet)=>{
                    if (bet.pick != bet.winning_team){
                        return(
                    <tr key={bet.id}>
                        <td className="row">{bet.team_one}</td>
                        <td className="row">{bet.team_two}</td>
                        <td className="row">{bet.winning_team}</td>
                        <td className="row">{bet.pick}</td>
                        <td className="row">{bet.amount_bet}</td>
                    </tr>
                    )}})}
                </tbody>
            </table>
    </div>
    );
}
 
export default BetHistory;