import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import "./DisplayOpenGames.css";
import { useState } from "react";

const DisplayOpenGames  = (props) => {
    const navigate = useNavigate();
    // const [gameStart, setGameStart] = useState([])

    const handleClick = (event, game)=> {
    event.preventDefault();
    props.setSelectedGame(game)
    navigate("/placebet")
}

{
let gameTime = "2022-06-11T01:00:00Z"    
let date = new Date(gameTime)
console.log(date.toDateString())

function displayDate(date){
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate()+1;
    let hours = date.getHours(); 
    let AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = minutes + '0' ;
      }
    if (day < 10) {
        day = '0' + day;
      }
      if (month < 10) {
        month = '0' + month;
      }
    return month+'/'+day+'/'+year+' ' + hours + ":" + minutes + AmOrPm; 
    
}
console.log("date")
console.log(displayDate(date))
}


    return( 
        <div>
            <SearchBar getEvents={props.getEvents}/>
            
            <table className="table-items">
                <tbody>
                    <tr>
                        <th className="title">Sport</th>
                        <th className="title">Game Date</th>
                        <th className="title">Home Team</th>
                        <th className="title">MoneyLine</th>
                        <th className="title">Away Team</th>
                        <th className="title">MoneyLine</th>
                    </tr>
                   {props.getGames.map((game)=>(
                    <tr key={game.id}>
                        <td className="row" >{game.sport_title}</td>
                        <td className="row">{Date(game.commence_time)}</td>
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