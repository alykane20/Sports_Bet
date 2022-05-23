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
import DisplayOpenGames from "./components/DisplayOpenGames/DisplayOpenGames";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [getGames, setGetGames]= useState([]);

  useEffect(() => {
      getEvents()
      }, [])
  
      async function getEvents(searchTerm = 'soccer'){
          
          let response = await axios.get(`https://api.the-odds-api.com/v4/sports/${searchTerm}/odds/?apiKey=${KEY}&regions=us&markets=h2h&oddsFormat=american`)
          console.log(response.data)
          setGetGames(response.data)
      }

  return (
    <div>
      <Navbar />
      <DisplayOpenGames getGames={getGames} getEvents={getEvents}/>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
