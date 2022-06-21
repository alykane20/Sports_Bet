import React, { useContext, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div>
      <div className="header">
        <h1 >Welcome to SportsBet!</h1>
        <h2 >The stress-free way to bet on your favorite teams</h2>
      </div>
      <div className="container-login">
        <div className="item-login">
          <ul className="list">
            <li>If you have an account, login to see more information</li>
            <li>If you are new, please click the link and register to start betting today!</li>
          </ul>
        </div> 
      <div className="items-form">
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
            <label>
            Username:{" "}
              <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            </label>
            <label>
            Password:{" "}
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              />
            </label>
            {isServerError ? (
            <p className="error">Login failed, incorrect credentials!</p>
            ) : null}
            <Link to="/register">Click to register!</Link>
            <button>Login!</button>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default LoginPage;
