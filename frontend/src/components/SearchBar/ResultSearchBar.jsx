import './SearchBar.css'



const ResultSearchBar = (props) => {
    // const [searchTerm, setSearchTerm] = useState('')
    
    // function handleSubmit(event){
    //     event.preventDefault()
    //     props.getGameResults(searchTerm)
    // }

    const handleClickBaseball = (e) => {
        e.preventDefault();
        props.getGameResults("baseball_mlb")
      }
    const handleClickBasketball = (e) => {
        e.preventDefault();
        props.getGameResults("basketball_nba")
      }
     const handleClickHockey = (e) => {
        e.preventDefault();
        props.getGameResults("icehockey_nhl")
      }
    const handleClickSoccer = (e) => {
        e.preventDefault();
        props.getGameResults("soccer_epl")
      }
    return (  
        <div>
            <h2 className='heading'>To see recent scores, click a sport to search</h2>
            <div className='container'>
            <button className='items' onClick={(event) => handleClickBaseball(event)}> Search MLB </button>
            <button className='items' onClick={(event) => handleClickBasketball(event)}> Search NBA </button>
            <button className='items' onClick={(event) => handleClickHockey(event)}> Search NHL </button>
            <button className='items'onClick={(event) => handleClickSoccer(event)}> Search EPL </button>
            </div>
            <p className='more'>
                <small>*more sports coming soon!</small>
            </p>
        </div>
    );
}
 
export default ResultSearchBar;