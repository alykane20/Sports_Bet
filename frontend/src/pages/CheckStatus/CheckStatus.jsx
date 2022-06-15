import React from "react";
import {useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import './CheckStatus.css'

const CheckStatus = (props) => {
const [user, token] = useAuth();
const navigate = useNavigate();
const[userStatus, setUserStatus] = useState([]);
// const {userId} = useParams()
const{ state } = useLocation();
console.log(state.totalWins)

useEffect(() => {
    updateStatus()
    }, [])

let initialValues = {
    status: userStatus}

  async function newStatus(){
    try {
        let response = await axios.patch("http://127.0.0.1:8000/api/auth/status/", initialValues, {
            headers:{
                Authorization: 'Bearer ' + token
            }
        });
    } catch (error) {
        console.log(error)
    }};


function updateStatus (){
    if(state.totalWins <= 9){
        setUserStatus("Newbie")
    }
    else if(state.totalWins <= 24){
        setUserStatus("Drafted")
    }
    else if(state.totalWins<= 49){
        setUserStatus("Rookie")
    }
    else if(state.totalWins <= 99){
        setUserStatus("Starter")
    }
    else if(state.totalWins <= 249){
        setUserStatus("Pro")
    }
    else if(state.totalWins <= 499){
        setUserStatus("Star")
    }
    else if(state.totalWins<= 999){
        setUserStatus("MVP")
    }
    else{
        setUserStatus("All-star")
    }
}
const handleClick = (e) => {
    e.preventDefault();
    newStatus()
    navigate("/account")
  }
    return ( 
      <div>
        <div className="checkbox"> 
            <div className="header">
                <h2 >Your current status is: {state.status}</h2>
                <p>If you think you have enough wins, click below!</p>
                <button className="button" onClick={(event) => handleClick(event)}> Level up!</button>
                <div className="pic">
                    <img src="https://dtnbgpzadn69x.cloudfront.net/images/2021/5/6/IMG_0014.jpg" height="300px" width="500px"/>
                </div>    
            </div>
            <div class="contain">
                <img src="https://www.housedigest.com/img/gallery/15-subtle-ideas-to-incorporate-a-sports-theme-in-your-home/l-intro-1651502176.jpg" alt="Blackboard and football" height="400px" width="600px"/>
                <div class="centered">
                <p className="track">Track your status:</p>
                    <ul className="list-status">
                        <li>0-9 wins = Newbie</li>
                        <li>10 wins = Drafted</li>
                        <li>25 wins = Rookie</li>
                        <li>50 wins = Starter</li>
                        <li>100 wins = Pro</li>
                        <li>250 wins = Star</li>
                        <li>500 wins = MVP</li>
                        <li>1000 wins = All-star</li>
                    </ul>
                </div>
            </div>
         </div>  
         <p className="quote">“I'd rather regret the risks that didn't work out than the chances I didn't take at all.” —Simone Biles
         </p>
        </div>
     );
}
 
export default CheckStatus;

