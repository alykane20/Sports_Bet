import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const ResolveBets = (props) => {
const [user, token] = useAuth();
const [bets, setBets] = useState([]);
const [winner, setWinner] = useState([])
  
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

//   console.log(props.results[0].scores[0])

    // function findWinner(){
    //     let results = props.results.map((el) => {
    //         if (el.scores[0].score > el.scores[1].score)
    //         return results
    //         else {
    //             return el.scores[1].name
    //         }
    //     })} 
    // setWinner(findWinner())
    // console.log(winner)
    
  
//   if (props.results && props.results.scores[0].score > props.results.scores[1].score){
//     console.log(props.results.scores[0].name)  
//     return props.results.scores[0].name 
//   } else{
//       return props.results.scores[1].name
//   }
  
// Logic to compare scores and save gameID and winner value
// For loop to cycle through open bets game ID, and then compare bet.pick to winner value
// If === add bet.payout to user.fund_balance and add 1 to user.total_bets_won



    return (  
        <div>
            <p>See if you won!</p>
            {/* <table>
                <tbody>
                    <tr>
                        <th>Sport</th>
                        <th>Home Team</th>
                        <th>Score</th>
                        <th>Away Team</th>
                        <th>Score</th>
                    </tr>
                   {props.results.map((game)=>{
                    if (game.completed == true){
                        return(
                    <tr key={game.id}>
                        <td>{game.sport_title}</td>
                        <td>{game.home_team}</td>
                        <td>{game.scores[0].score}</td>
                        <td>{game.away_team}</td>
                        <td>{game.scores[1].score}</td>
                    </tr>
                    )}})}
                </tbody>
            </table> */}
        </div>
    );
}
 
export default ResolveBets;