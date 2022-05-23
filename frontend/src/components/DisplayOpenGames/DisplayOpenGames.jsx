import { useState, useEffect } from "react/cjs/react.production.min";
import axios from "axios";
import {KEY} from '../../localKey'
import SearchBar from "../SearchBar/SearchBar";

const DisplayOpenGames  = (props) => {
    return( 
       
        <div>
            <SearchBar getEvents={props.getEvents}/>
            <table>
                <tbody>
                    <tr>
                        <th>Sport</th>
                        <th>Game Date</th>
                        <th>Home Team</th>
                        <th>Away Team</th>
                    </tr>
                
                   {props.getGames && props.getGames.map((game)=>(
                    <tr key={game.id}>
                        <td>{game.sport_title}</td>
                        <td>{game.commence_time}</td>
                        <td>{game.home_team}</td>
                        <td>{game.away_team}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
     );
}
 
export default DisplayOpenGames;