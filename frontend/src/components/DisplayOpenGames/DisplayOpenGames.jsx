import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";


const DisplayOpenGames  = (props) => {
    const navigate = useNavigate();
    const handleClick = ()=> {
    props.setSelectedGame(game.id)
    navigate("/placebet")
}
    return( 
        <div>
            <SearchBar getEvents={props.getEvents}/>
            <table>
                <tbody>
                    <tr>
                        <th>Sport</th>
                        <th>Game Date</th>
                        <th>Home Team</th>
                        <th>Odds</th>
                        <th>Away Team</th>
                        <th>Odds</th>
                    </tr>
                   {props.getGames.map((game)=>(
                    <tr key={game.id}>
                        <td>{game.sport_title}</td>
                        <td>{game.commence_time}</td>
                        <td>{game.bookmakers[0].markets[0].outcomes[0].name}</td>
                        <td>{game.bookmakers[0].markets[0].outcomes[0].price}</td>
                        <td>{game.bookmakers[0].markets[0].outcomes[1].name}</td>
                        <td>{game.bookmakers[0].markets[0].outcomes[1].price}</td>
                        <td><button onClick={handleClick(game.id)}> Select Game</button></td>
                    </tr>
                    
                    ))}
                </tbody>
            </table>
        </div>
     );
}
 
export default DisplayOpenGames;