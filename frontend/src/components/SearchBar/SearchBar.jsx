import './SearchBar.css'
import React, {useState} from "react";


const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    function handleSubmit(event){
        event.preventDefault()
        props.getEvents(searchTerm)
    }

    return (  
        <form onSubmit={(event)=>handleSubmit(event)}>
            <input className='search-bar' type="text" placeholder="Ex: soccer, basketball" onChange={(event) =>{setSearchTerm(event.target.value)}}/>
            <button className="button" type="submit">Search</button>
       </form>
    );
}
 
export default SearchBar;