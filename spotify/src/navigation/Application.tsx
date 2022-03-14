import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header/Header";
import Home from "../components/Home/Home";
import { LeftMenu } from "../components/LeftMenu/LeftMenu";
import styles from "./Application.module.css";

export const Application = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <LeftMenu />
        <Header />
        <Switch>
          <Route path="/application/home" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
