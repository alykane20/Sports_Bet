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
        <li className="sports-title"> SportsBet</li>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "underline", color: "white" }}>
            Home
          </Link>
        </li>
        <li className="brand">
          <Link to="/games" style={{ textDecoration: "underline", color: "white" }}>Upcoming games
          </Link>
        </li>
        <li className="brand">
        <Link to="/results" style={{ textDecoration: "underline", color: "white" }}>Recent results
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
