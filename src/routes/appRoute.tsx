/********************************Import Packages*************************************/
import { useEffect, useState } from "react";

/********************************Import Components*************************************/
import HomeRoute from "./homeRoute";
import AuthRoute from "./authRoute";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AppRoute = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(data)
  );
  //Routing based on authentication
  useEffect(() => {
    setIsAuthenticated(Boolean(data));
  }, [data]);
  return <>{isAuthenticated ? <HomeRoute /> : <AuthRoute />}</>;
};

export default AppRoute;
