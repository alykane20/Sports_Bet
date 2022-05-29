import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";


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
            <table>
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
                        <td>{game.sport_title}</td>
                        <td>{game.commence_time}</td>
                        <td>{game.bookmakers[0].markets[0].outcomes[0].name}</td>
                        <td>{game.bookmakers[0].markets[0].outcomes[0].price}</td>
                        <td>{game.bookmakers[0].markets[0].outcomes[1].name}</td>
                        <td>{game.bookmakers[0].markets[0].outcomes[1].price}</td>
                        <td><button onClick={(event) => handleClick(event, game)}> Select Game</button></td>
                    </tr>
                    
                    ))}
                </tbody>
            </table>
            <div>
                <p>If you're new to sports betting, here's some info to help get you started!</p>
                <p>What is the "moneyline"?</p>
                <p>A negative number (ex. -330) denotes the favored team, while a positive one (ex. 200) is the underdog</p>
                <p>The number itself shows how much you can win!</p>
                    <ul>
                        <li>For the favored team, you'd have to bet the amount shown to win $100</li>
                        <li>To win $100 in the above example, you'd need to bet $330, for a total payout of $430</li>
                        <li>For the underdog, the positive number is what you'd win if you bet $100</li>
                        <li>So if you bet $100, you'd win $200, for total payout of $300</li>
                    </ul>
                <p>Of course there are many other ways to bet, but that's the basics of the moneyline!</p>
            </div>
        </div>
     );
}
 
export default DisplayOpenGames;