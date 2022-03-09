import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { setSession } from "./authentication";

export const ConfirmAuthentication = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const params = location.hash
      .substring(1)
      .split("&")
      .reduce((prev: any, curr: string) => {
        let parts = curr.split("=");
        prev[parts[0]] = decodeURIComponent(parts[1]);
        return prev;
      }, {});

    const token = params.access_token;
    const tokenLifetime = params.expires_in;
    const redirect = () => history.push("/home");

    setSession(token, tokenLifetime, redirect);
  }, [history, location]);

  return <></>;
};
