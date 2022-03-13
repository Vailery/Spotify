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
      .reduce((prev: { [key: string]: string }, curr: string) => {
        const [firstPart, secondPart] = curr.split("=");

        return {
          ...prev,
          [firstPart]: decodeURIComponent(secondPart),
        };
      }, {});

    const token = params.access_token;
    const tokenLifetime = params.expires_in;
    const redirect = () => history.push("/home");

    setSession(token, tokenLifetime, redirect);
  }, [history, location]);

  return <></>;
};
