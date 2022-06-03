import React from "react";
import {useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";

const CheckStatus = (props) => {
const navigate = useNavigate();
const [user, setUser] = useState({});
const[userStatus, setUserStatus] = useState([]);
const {userId} = useParams()
const{ state } = useLocation();
console.log(state.totalWins)

// useEffect(() => {


// },[userId])

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

    return ( 
        <div> 
            <h2>Your current status is {state.status}</h2>
            <p>Check here to see if you can level up!</p>
            <button></button>
        </div>
     );
}
 
export default CheckStatus;

// useEffect(() => {
//     const getUser = async () => {
//     try {
//         let response = await axios.get("http://127.0.0.1:8000/api/auth/info/", {
//             headers:{
//                 Authorization: 'Bearer ' + token
//             }
//         })
//         setUserWins(response.data[0].total_bets_won);
//         console.log(response.data)
//     } catch (error) {
//         console.log(error)
//     }
//   };
//     getUser();
// }, [token]);