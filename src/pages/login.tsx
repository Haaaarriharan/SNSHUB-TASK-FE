/********************************Import Components*************************************/

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/********************************Import Redux*************************************/
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/userReducer";

/********************************Import Formik*************************************/
import { useFormik } from "formik";
import * as yup from "yup";
import { useQuery } from "react-query";
import employeeAPI from "@/service/service";
import CustomSelectNew from "@/components/select/Newselect";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch: any = useDispatch();

  //VALIDATION SCHEMA
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const navigate = useNavigate();

  const loginRegister = async (payload: any) => {
    let res = await employeeAPI.loginUser(payload);
    try {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (err: any) {
      console.log("err", err?.response);
    }
  };

  const formik = useFormik({
    //INITIAL VALUES
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let createPayload = {
        email: values.email,
        password: values?.password,
      };
      loginRegister(createPayload);
    },
  });

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your details to access.</CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className="space-y-1">
            <div className="">
              <p>Email</p>
              <Input
                id="email"
                name="email"
                placeholder="m@example.com"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className=" text-red-600 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="">
              <p>Password</p>
              <Input
                id="password"
                name="password"
                type="text"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className=" text-red-600 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
