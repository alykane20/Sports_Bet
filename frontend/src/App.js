// General Imports
import { Routes, Route } from "react-router-dom";
import {useState, useEffect} from 'react'
import "./App.css";
import {KEY} from './localKey'
import axios from "axios";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PlaceBet from "./pages/PlaceBet/PlaceBet";
import ResolveBets from "./pages/ResolveBets/ResolveBets";
import AddFunds from "./pages/AddFunds/AddFunds";
import Account from "./pages/Account/Account";
import CheckStatus from "./pages/CheckStatus/CheckStatus";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import DisplayOpenGames from "./components/DisplayOpenGames/DisplayOpenGames";
import GameResults from "./components/GameResults/GameResults";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";



function App() {
  const [getGames, setGetGames]= useState([]);
  const [selectedGame, setSelectedGame] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
      getEvents()
      }, [])
  useEffect(() => {
      getGameResults()
        }, [])

      async function getEvents(searchTerm = 'basketball'){
          let response = await axios.get(`https://api.the-odds-api.com/v4/sports/${searchTerm}/odds/?apiKey=${KEY}&regions=us&markets=h2h&oddsFormat=american`)
          setGetGames(response.data)
      }
      async function getGameResults(searchTerm = 'baseball_mlb'){
        let response = await axios.get(`https://api.the-odds-api.com/v4/sports/${searchTerm}/scores/?daysFrom=2&apiKey=${KEY}`);
        setResults(response.data)
    }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addfunds" element={<AddFunds />} />
        <Route path="/account" element={<Account />} />
        <Route path="/status/:userId" element={<CheckStatus />} />
        <Route path="/resolve" element={results.length>0 && <ResolveBets results={results} getGameResults={getGameResults}/>} />
        <Route path="/games" element={getGames && <DisplayOpenGames setSelectedGame={setSelectedGame} getGames={getGames} getEvents={getEvents}/>} />
        <Route path="/results" element={results && <GameResults results={results} getGameResults={getGameResults}/>} />
        <Route
          path="/placebet" 
          element={
            <PrivateRoute>
              {selectedGame && <PlaceBet selectedGame={selectedGame} />}
            </PrivateRoute>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
