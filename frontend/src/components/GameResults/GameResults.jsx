import ResultSearchBar from "../SearchBar/ResultSearchBar";
const GameResults = (props) => {
    
    return ( 
        <div>
            <ResultSearchBar getGameResults={props.getGameResults} />
            <table>
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
                        <td>{game.sport_title}</td>
                        <td>{game.home_team}</td>
                        <td>{game.scores[0].score}</td>
                        <td>{game.away_team}</td>
                        <td>{game.scores[1].score}</td>
                    </tr>
                    )}})}
                </tbody>
            </table>
        </div>
     );
}
 
export default GameResults ;