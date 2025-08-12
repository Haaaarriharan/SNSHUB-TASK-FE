/********************************Import Packages*************************************/
import { useEffect, useState } from "react";

/********************************Import Components*************************************/
import HomeRoute from "./homeRoute";
import AuthRoute from "./authRoute";
import { useSelector } from "react-redux";

const AppRoute = () => {
  const { data } = useSelector((state: any) => state?.user);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(data)
  );

  // //Routing based on authentication
  useEffect(() => {
    setIsAuthenticated(data?.isloggedin || false);
    if (data?.isloggedin === true) {
      setIsAuthenticated(true);
    }
  }, [data]);
  return <>{isAuthenticated ? <HomeRoute /> : <AuthRoute />}</>;
};

export default AppRoute;
