/********************************Import Components and Packages*************************************/
import Login from "@/pages/login";
import SignUp from "@/pages/signUp";
import { Route, Routes } from "react-router-dom";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/" Component={SignUp} />
      <Route path="/login" Component={Login} />
    </Routes>
  );
};

export default AuthRoute;
