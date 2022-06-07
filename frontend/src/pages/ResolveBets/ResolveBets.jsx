import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate} from "react-router-dom";

const ResolveBets = (props) => {
const navigate = useNavigate();
const [user, token] = useAuth();
const [bets, setBets] = useState([]);
const [winner, setWinner] = useState([]);
// const [payout, setPayout] = useState(0);
// const [gameWinner, setGameWinner] = useState([]);
// const [id, setId] = useState(" ")

  
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
        setWinner(namesOfWinners)
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
          <p>Recent game winners:</p>
          {winner.map(el => <div>{el}</div>)}
      <div>
      <button onClick={(event) => handleClick(event)}> View your bet history </button>
      </div>

      </div>
  );
}
 
export default ResolveBets;