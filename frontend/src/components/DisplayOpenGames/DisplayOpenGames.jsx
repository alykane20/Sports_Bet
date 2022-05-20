import { useState, useEffect } from "react/cjs/react.production.min";
import axios from "axios";
import {KEY} from '../../localKey'

const DisplayOpenGames  = (props) => {
    return( 
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Sport</th>
                        <th>Game Date</th>
                        <th>Home Team</th>
                        <th>Away Team</th>
                    </tr>
                
                   {props.getGames && props.getGames.map((game)=>(
                    <tr>
                        <td>{game.sport_title}</td>
                        <td>{game.commence_time}</td>
                        <td>{game.home_team}</td>
                        {/* <td>{game.bookmakers.markets.outcomes}</td> */}
                        <td>{game.away_team}</td>
                        
                    </tr>
                    
                    ))}
                </tbody>
            </table>
        </div>
     );
}
 
export default DisplayOpenGames;