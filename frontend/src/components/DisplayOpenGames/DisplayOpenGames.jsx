import { useState, useEffect } from "react/cjs/react.production.min";
import axios from "axios";
import {KEY} from '../../localKey'

const DisplayOpenGames  = (props) => {
const [getGames, setGetGames]= useState([]);

useEffect(() => {
    getEvents()
    }, [])

    async function getEvents(){
        const apiKey = {KEY}
        const sportKey = 'upcoming'
        const regions = 'us'
        const markets = 'h2h'
        const oddsFormat = 'american'
        
        let response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
            params:{
            apiKey,
            regions,
            markets,
            oddsFormat,
            }
        })
        .then (response => {
            console.log(JSON.stringify(response.data))
        setGetGames(response.data)
      })}

    
    return( 
        <div>getEvents()</div>
     );
}
 
export default DisplayOpenGames;