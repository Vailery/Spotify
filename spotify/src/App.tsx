import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";
import { Application } from "./navigation/Application";
import { checkIsLogged } from "./services/authentication";
import { ConfirmAuthentication } from "./services/confirmAuthentication";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/callback" exact component={ConfirmAuthentication} />
        <Route path="/application">
          {checkIsLogged() ? <Application /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
