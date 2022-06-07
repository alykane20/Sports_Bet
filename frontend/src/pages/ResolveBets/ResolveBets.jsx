import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate} from "react-router-dom";

const ResolveBets = (props) => {
const navigate = useNavigate();
const [user, token] = useAuth();
const [bets, setBets] = useState([]);
const [loser, setLoser] = useState([]);
const [winner, setWinner] = useState([]);
const [payout, setPayout] = useState(0);
const [gameWinner, setGameWinner] = useState([]);
const [id, setId] = useState(" ")

  
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
        //findLoser(response.data);
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
            setPayout(openBets[i].payout)
            console.log("payout", openBets[i].payout )
            setId(openBets[i].id)
            setGameWinner(winnersForCompare[j])
            //set bet to complete
            //axios call to backend to change all values we need
            //await addWinnings(openBets[i].payout)
          }
          else if(true){//team_one or team_two is winnerForCompare[j]
            // if their pick != a winner, it lost.
            // setPayout(0)... but payout should default to 0, so dont think i need this
            // setId(openBets[i].id)
            // setGameWinner() === should be whichever team in bet that != bet.pick
            //set bet to complete
            //axios call to backend to change all values we need
            console.log("winner, user didnt bet on:", winnersForCompare[j])

          }
          else{
            //games that winnersFormCompare[j] are not in
            //need to do anything? maybe not

            
          }
        }
      }
    }
  }
     
  
  
  async function addWinnings(payout){
    console.log(payout)
    try {
        let response = await axios.patch("http://127.0.0.1:8000/api/auth/resolve/", {payout:payout}, {
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
    addWinnings()
    completeGame()
    navigate("/")
  }


  return (  
      <div>
          <p>Recent game winners:</p>
          {winner.map(el => <div>{el}</div>)}
      <div>
      <button onClick={(event) => handleClick(event)}> Check Bets</button>
      </div>

      </div>
  );
}
 
export default ResolveBets;