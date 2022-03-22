import { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";
import { Application } from "./navigation/Application";
import { checkIsLogged } from "./services/authentication";
import { ConfirmAuthentication } from "./services/confirmAuthentication";

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(checkIsLogged());

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/callback">
          <ConfirmAuthentication callback={setIsLogged} />
        </Route>
        <Route path="/application">
          {isLogged ? <Application /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
