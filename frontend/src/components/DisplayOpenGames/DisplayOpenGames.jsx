import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import "./DisplayOpenGames.css";

const DisplayOpenGames  = (props) => {
    const navigate = useNavigate();

    const handleClick = (event, game)=> {
    event.preventDefault();
    props.setSelectedGame(game)
    navigate("/placebet")
}
    return( 
        <div>
            <SearchBar getEvents={props.getEvents}/>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Sport</th>
                        <th>Game Date</th>
                        <th>Home Team</th>
                        <th>MoneyLine</th>
                        <th>Away Team</th>
                        <th>MoneyLine</th>
                    </tr>
                   {props.getGames.map((game)=>(
                    <tr key={game.id}>
                        <td className="row" >{game.sport_title}</td>
                        <td className="row">{game.commence_time}</td>
                        <td className="row">{game.bookmakers[0].markets[0].outcomes[0].name}</td>
                        <td className="row">{game.bookmakers[0].markets[0].outcomes[0].price}</td>
                        <td className="row">{game.bookmakers[0].markets[0].outcomes[1].name}</td>
                        <td className="row">{game.bookmakers[0].markets[0].outcomes[1].price}</td>
                        <td className="row"><button className="button" onClick={(event) => handleClick(event, game)}> Select Game</button></td>
                    </tr>
                    
                    ))}
                </tbody>
            </table>
        </div>
     );
}
 
export default DisplayOpenGames;