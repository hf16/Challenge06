import "./MainNav.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

//Main Navbar berada paling atas yang berisi logo movielist dan button login register
  const MainNav = () => {
  // Navigate
  const history = useHistory();

  // Get token from local storage
  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          // Authorize from backend
          await axios.get(`${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (error.response.status === 401) {
            // remove token
            localStorage.removeItem("token");
            history.replace("/");
          }
        }
      }
    })();
  }, [token, history]);

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    history.replace("/login");

  };


  return (
    <>
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <nav className="navbar-brand">
        <Link className="navbar-brand" to="/">
          <h3> MovieList</h3>
        </Link>
           
        </nav>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
        </ul>
          <div className="all__right">
            <div className="btn-login">
            {!token ? (
              <>
               <Link to="/login">  <button className=" login-btn" >login</button> </Link>
               <Link to="/register"> <button className=" register-btn">Register</button> </Link>
               </>
               ) : (
                <>
               <Link to="/logout"> <button className=" register-btn" onClick={handleLogout}>logout</button> </Link>
               </>
               )}  
            </div>          
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNav;
