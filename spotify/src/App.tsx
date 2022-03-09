import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login";
import { ConfirmAuthentication } from "./services/confirmAuthentication";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/callback" exact component={ConfirmAuthentication} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
