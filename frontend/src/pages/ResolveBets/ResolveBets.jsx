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
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchBets();
    findWinner();
  }, [token]);

      function findWinner(){
      let completedGames = props.results.filter((game)=>{
        if(game.completed === true){
          console.log(game)
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
        compareBets(results)
      }

  function compareBets(winnersForCompare){
    debugger
    let results = bets.map((bet) =>{
      if (bet.pick === winnersForCompare[0])
        return bet.payout
      })
      setPayout(results)
      console.log(payout)
    }

    let initialValues = {
      payout: payout
    }
  
    async function addWinnings(){
      try {
          console.log(initialValues)
          let response = await axios.patch("http://127.0.0.1:8000/api/auth/resolve/", initialValues, {
              headers:{
                  Authorization: 'Bearer ' + token
              }
          })
      } catch (error) {
          console.log(error)
      }};
      


    return (  
        <div>
            <p>Recent game winners:</p>
            {winner.map(el => <div>{el}</div>)}
        </div>
    );
}
 
export default ResolveBets;