import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>BET! Sports betting made fun!</b>
          </Link>
        </li>
        <li>
          <Link to="/games" style={{ textDecoration: "none", color: "white" }}>Upcoming games
          </Link>
        </li>
        <li>
        <Link to="/results" style={{ textDecoration: "none", color: "white" }}>Recent results
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
        
      </ul>
    </div>
  );
};

export default Navbar;
