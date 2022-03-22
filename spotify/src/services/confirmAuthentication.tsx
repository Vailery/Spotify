import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { setSession } from "./authentication";

export const ConfirmAuthentication = ({
  callback,
}: {
  callback: (isLogged: boolean) => void;
}) => {
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
    const redirect = () => {
      callback(true);
      history.push("/application");
    };

    setSession(token, tokenLifetime, redirect);
  }, []);

  return <></>;
};
