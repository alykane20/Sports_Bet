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

      function findWinner(){
      let completedGames = props.results.filter((game)=>{
        if(game.completed === true){
          console.log(game)
          return true} 
        })
      let results = completedGames.map((el)=>{
        debugger
        if(parseInt(el.scores[0].score) > parseInt(el.scores[1].score)){
          console.log(el.scores[0].name)
          return el.scores[0].name
        } else{
          console.log(el.scores[1].name)
          return el.scores[1].name}
        })}
      
    findWinner()
    
    // function checkBets(){
    //   if (bets.pick 

    // }
  

// For loop to cycle through open bets game ID, and then compare bet.pick to winner value
// If === add bet.payout to user.fund_balance and add 1 to user.total_bets_won



    return (  
        <div>
            <p>See if you won!</p>
           
        </div>
    );
}
 
export default ResolveBets;