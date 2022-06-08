import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link} from "react-router-dom";
import ResultSearchBar from "../../components/SearchBar/ResultSearchBar";
import './ResolveBets.css'

const ResolveBets = (props) => {
const navigate = useNavigate();
const [user, token] = useAuth();
const [bets, setBets] = useState([]);
  
  useEffect(async() => {
    const fetchBets = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/bets/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setBets(response.data);
        await findWinner(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    await fetchBets();
  }, []);

  async function findWinner(theBets){
      let completedGames = props.results.filter((game)=>{
        if(game.completed === true){
          return true
        }})
      console.log('completedGames', completedGames)
      let namesOfWinners = completedGames.map((el)=>{
        if(parseInt(el.scores[0].score) > parseInt(el.scores[1].score)){
          return el.scores[0].name
        } else{
          console.log(el.scores[1].name)
          return el.scores[1].name}
        })
        console.log('namesofWinners', namesOfWinners);
        compareBets(theBets,namesOfWinners)
  }


  async function compareBets(openBets, winnersForCompare){
 
    for(let i=0; i< openBets.length; i++){
      for(let j=0; j< winnersForCompare.length; j++){
        if(openBets[i].completed === false){ 
          console.log("open bets", openBets[i])
          if(openBets[i].pick===winnersForCompare[j]){
            console.log("Winning:", winnersForCompare[j])
            console.log("payout:", openBets[i].payout )
            console.log("betId:", openBets[i].id)
            await addWinnings(openBets[i].payout)
            await completeGame(openBets[i].id, openBets[i].pick)
          }
          else if(openBets[i].team_one == winnersForCompare[j] || openBets[i].team_two == winnersForCompare[j] ){
            console.log(openBets[i].team_one)
            console.log(openBets[i].team_two)
            console.log(winnersForCompare[j]) 
            await completeGame(openBets[i].id, winnersForCompare[j])
          }
          else{
            //need to do anything? maybe not
          }
        }
      }
    }
  }
     
  async function addWinnings(payout){
    console.log(payout)
    try {
        let response = await axios.patch("http://127.0.0.1:8000/api/auth/resolve/", {payout: payout}, {
            headers:{
                Authorization: 'Bearer ' + token
            }
        })
    } catch (error) {
        console.log(error)
    }
  };
    
  async function completeGame(id, gameWinner){
    try {
        let response = await axios.patch(`http://127.0.0.1:8000/api/bets/update/${id}/`, {winner: gameWinner}, {
            headers:{
                Authorization: 'Bearer ' + token
            }
        })
    } catch (error) {
        console.log(error)
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/history")
  }

  return (  
      <div>
      <div>
            {/* <ResultSearchBar getGameResults={props.getGameResults} /> */}
            <table className="table-items">
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
                        <td className="row">{game.sport_title}</td>
                        <td className="row">{game.home_team}</td>
                        <td className="row">{game.scores[0].score}</td>
                        <td className="row">{game.away_team}</td>
                        <td className="row">{game.scores[1].score}</td>
                    </tr>
                    )}})}
                </tbody>
            </table>
        </div>
      <button className="button" onClick={(event) => handleClick(event)}> View your bet history </button>
      <Link to="/account" >Return to account </Link>
      </div>
  );
}
 
export default ResolveBets;