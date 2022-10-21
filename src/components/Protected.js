import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Protected({ children }) {
  // Navigate
  const history = useHistory();

  // Get token from local storage
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Long function
    // async function authorize() {
    //   if (token) {
    //     try {
    //       // Authorize from backend
    //       await axios.get(
    //         "process.env.REACT_APP_AUTH_API/api/v1/auth/me",
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );
    //     } catch (error) {
    //       if (error.response.status === 401) {
    //         // remove token
    //         localStorage.removeItem("token");
    //         // Redirect to login page
    //         navigate("/login");
    //       }
    //     }
    //   }
    // }
    // authorize();
    //
    // Short function
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
            // Redirect to login page
            history.replace("/login");
          }
        }
      }
    })();
  }, [token, history]);

  // If no token
  if (!token) {
     history.replace(`/login`)
  }

  return children;
}

export default Protected;
