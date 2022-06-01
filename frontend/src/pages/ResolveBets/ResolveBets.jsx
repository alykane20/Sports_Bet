import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const ResolveBets = (props) => {
const [user, token] = useAuth();
const [bets, setBets] = useState([]);
const [winner, setWinner] = useState([]);
const [payout, setPayout] = useState([]);
  
  useEffect(() => {
    
    const fetchBets = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/bets/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
       
        setBets(response.data);
        findWinner(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchBets();
  }, [token]);

      function findWinner(theBets){
      let completedGames = props.results.filter((game)=>{
        if(game.completed === true){
          return true}})
      let results = completedGames.map((el)=>{
        if(parseInt(el.scores[0].score) > parseInt(el.scores[1].score)){
          console.log(el.scores[0].name)
          return el.scores[0].name
        } else{
          console.log(el.scores[1].name)
          return el.scores[1].name}
        })
  
        setWinner(results)
        console.log(theBets, results)
        compareBets(theBets,results)
      }

  function compareBets(openBets, winnersForCompare){

    for(let i=0; i< openBets.length; i++){
      for(let j=0; j< winnersForCompare.length; j++){
        if(openBets[i].pick===winnersForCompare[j]){
         setPayout(openBets[i].payout)
        }
        else{
          console.log(openBets[i].pick, winnersForCompare[j])
        }
      }
    }
    }

    let initialValues = {
      payout: payout
    }
  
    async function addWinnings(){
      try {
          let response = await axios.patch("http://127.0.0.1:8000/api/auth/resolve/", initialValues, {
              headers:{
                  Authorization: 'Bearer ' + token
              }
          })
      } catch (error) {
          console.log(error)
      }};
      
      const handleClick = (e) => {
        e.preventDefault();
        addWinnings()
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