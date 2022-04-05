import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { setRefreshTokenFromCode } from "./helpers";

export const ConfirmAuthentication = ({
  callback,
}: {
  callback: (isLogged: boolean) => void;
}) => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const code = params.get("code") || "";
    const redirect = () => {
      callback(true);
      history.push("/application");
    };

    setRefreshTokenFromCode(code, redirect);
  }, []);

  return <></>;
};
