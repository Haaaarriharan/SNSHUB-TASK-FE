/********************************Import Packages*************************************/
import { useEffect, useState } from "react";

/********************************Import Components*************************************/
import HomeRoute from "./homeRoute";
import AuthRoute from "./authRoute";
import { useSelector } from "react-redux";

const AppRoute = () => {
  const { data } = useSelector((state: any) => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(data)
  );
  let newVal = localStorage.getItem("isLoggedIn");
  //Routing based on authentication
  useEffect(() => {
    setIsAuthenticated(Boolean(data));
    if (newVal === "true") {
      setIsAuthenticated(true);
    }
  }, [data, newVal]);
  return <>{isAuthenticated ? <HomeRoute /> : <AuthRoute />}</>;
};

export default AppRoute;
