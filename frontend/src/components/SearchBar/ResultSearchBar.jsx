import React, {useState} from "react";


const ResultSearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    function handleSubmit(event){
        event.preventDefault()
        props.getGameResults(searchTerm)
    }

    return (  
        <div>
            <p>Current seach options: basketball_nba, baseball_mlb, icehockey_nhl, soccer_epl</p>
            <form onSubmit={(event)=>handleSubmit(event)}>
             <input type="text" placeholder="Choose a current sport" onChange={(event) =>{setSearchTerm(event.target.value)}}/>
            
                <button type="submit">Search</button>
            
            </form>
        </div>
    );
}
 
export default ResultSearchBar;