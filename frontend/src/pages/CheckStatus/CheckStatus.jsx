import React from "react";
import {useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckStatus = (props) => {
const [user, token] = useAuth();
const navigate = useNavigate();
const [userStatus, setUserStatus] = useState([]);

    return ( 
        <div> Coming soon</div>
     );
}
 
export default CheckStatus;