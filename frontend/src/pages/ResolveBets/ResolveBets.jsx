import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const ResolveBets = (props) => {
const [user, token] = useAuth();
const [bets, setBets] = useState([]);
  
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

  console.log(props.results)

//   if (props.results.scores[0].score > props.results.scores[1].score){
//       return props.results.scores[0].name
//   } else{
//       return props.results.scores[1.].name
//   }

// Logic to compare scores and save gameID and winner value
// For loop to cycle through open bets game ID, and then compare bet.pick to winner value
// If === add bet.payout to user.fund_balance and add 1 to user.total_bets_won



    return (  
        <div>
            <p>See if you won!</p>
        </div>
    );
}
 
export default ResolveBets;