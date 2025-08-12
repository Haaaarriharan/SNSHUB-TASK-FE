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
import { useMutation, useQuery } from "react-query";
import employeeAPI from "@/service/service";
import CustomSelectNew from "@/components/select/Newselect";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PUBLIC_ROUTE_API_SERVICE from "@/service/main.service";

export default function ForgotPassword() {
  //VALIDATION SCHEMA
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmpassword : yup.string().required("Confirm Password is required"),
  });
  const navigate = useNavigate();

  
  const { isLoading: loading, mutate: forget_password } = useMutation(
    async (payload: any) => {
      return await PUBLIC_ROUTE_API_SERVICE.FORGOT_PASSWORD(payload);
    },
    {
      onSuccess: (res: any) => {
        navigate("/login");
      },
      onError: (err: any) => {
        toast.error(`${err?.response?.data?.message}`);
      },
    }
  );


  const formik = useFormik({
    //INITIAL VALUES
    initialValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
      if (values?.password !== values?.confirmpassword) {
        toast.error("Password does not matched...");
        return;
      }
      let createPayload = {
        email: values.email,
        password: values?.password,
        confirmpassword: values?.confirmpassword,
      };
      console.log("final", createPayload);
      forget_password(createPayload);
    },
  });

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="">
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <CardDescription>Enter your correct email address.</CardDescription>
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
                type="password"
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
            <div className="">
              <p>Confirm Password</p>
              <Input
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmpassword &&
              formik.errors.confirmpassword ? (
                <div className=" text-red-600 text-sm">
                  {formik.errors.confirmpassword}
                </div>
              ) : null}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="flex justify-between py-1 w-full">
              <div></div>
              <Button
                className="cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                back
              </Button>
            </div>
            <Button className="w-full py-1" type="submit">
              Change Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
