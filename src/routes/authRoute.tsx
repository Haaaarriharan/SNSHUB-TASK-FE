/********************************Import Components and Packages*************************************/
import ForgotPassword from "@/pages/forgotpassword";
import Login from "@/pages/login";
import SignUp from "@/pages/signUp";
import { Route, Routes } from "react-router-dom";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/" Component={SignUp} />
      <Route path="/login" Component={Login} />
      <Route path="/ForgotPassword" Component={ForgotPassword} />
    </Routes>
  );
};

export default AuthRoute;
