import ResultSearchBar from "../SearchBar/ResultSearchBar";
import {Link} from "react-router-dom";
import './GameResults.css'

const GameResults = (props) => {
    
    return ( 
        <div>
            <ResultSearchBar getGameResults={props.getGameResults} />
            <table className="table">
                <tbody>
                    <tr>
                        <th>Sport</th>
                        <th>Home Team</th>
                        <th>Score</th>
                        <th>Away Team</th>
                        <th>Score</th>
                    </tr>
                   {props.results.map((game)=>{
                    if (game.completed == true){
                        return(
                    <tr key={game.id}>
                        <td className="row">{game.sport_title}</td>
                        <td className="row">{game.home_team}</td>
                        <td className="row">{game.scores[0].score}</td>
                        <td className="row">{game.away_team}</td>
                        <td className="row">{game.scores[1].score}</td>
                    </tr>
                    )}})}
                </tbody>
            </table>
            <p>If you have an account, select sport and click <Link to="/resolve" >HERE</Link> to resolve any bets you have in that sport!</p>
            
        </div>
     );
}
 
export default GameResults ;