import React, {useState} from "react";


const ResultSearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    function handleSubmit(event){
        event.preventDefault()
        props.getGameResults(searchTerm)
    }

    return (  
        <form onSubmit={(event)=>handleSubmit(event)}>
            <input type="text" placeholder="Ex: soccer, basketball" onChange={(event) =>{setSearchTerm(event.target.value)}}/>
            
            <button type="submit">Search</button>
            
        </form>
    );
}
 
export default ResultSearchBar;