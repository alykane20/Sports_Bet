import {KEY} from '../../localKey'
import axios from 'axios';
import { useState, useEffect } from "react";


const GameResults = (props) => {
    const [results, setResults]= useState([]);
    

  useEffect(() => {
      getGameResults()
      }, [])
  
      async function getGameResults(){
          
          let response = await axios.get(`https://api.the-odds-api.com/v4/sports/basketball_nba/scores/?daysFrom=2&apiKey=${KEY}`);
          console.log(response.data)
          setResults(response.data)
      }
    return ( 
        <div></div>
     );
}
 
export default GameResults ;