import "./App.css";
import Routes from "./config/Routes/Routes";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/touch-loader/touchLoader";

import { GoogleOAuthProvider } from "@react-oauth/google";


function App() {
  return (
    <>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Routes} />
          </Switch>
        </BrowserRouter>
      </GoogleOAuthProvider>
       



      
    </>
  );
}

export default App;
