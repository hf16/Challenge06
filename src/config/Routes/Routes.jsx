import Home from "../../pages/Home/Home";
import { Redirect, Route, Switch } from "react-router-dom";
import SinglePage from "../../components/SingleContentPage/SinglePage";
import MainNav from "../../components/MainNavbar/MainNav";

import "bootstrap/dist/css/bootstrap.min.css";
import Protected from "../../components/Protected";



// TES
import Register from "../../pages/Register";
import Login from "../../pages/Login";

const Routes = () => {
  return (
    <>
      <MainNav />

      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/:mediaType/:id" children={<SinglePage />} /> */}
          
          {/* TES */}
          
          <Route path="/login" children={<Login />} />
          <Route path="/register" children={<Register />} />

          <Route
          path="/:mediaType/:id"
          children={
            <Protected>
              <SinglePage />
            </Protected>
          }
        />

          <Redirect to="/error" />
        </Switch>
      </div>
    </>
  );
};

export default Routes;
