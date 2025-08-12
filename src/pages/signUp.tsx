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

export default function SignUp() {
  const dispatch: any = useDispatch();

  //VALIDATION SCHEMA
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: yup
      .string()
      .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, "Phone number is not valid")
      .required("Phone number is required"),
    userTypeId: yup.string().required("Roles is required"),
    password: yup.string().required("Password is required"),
    confirmpassword : yup.string().required("Confirm Password is required"),
  });
  const navigate = useNavigate();

  const getUser = useQuery(
    ["getEmployessByReactQuery"],
    async () => {
      return await employeeAPI.getUserTypeId();
    },
    {
      onSuccess: () => {},
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  const createRegister = async (payload: any) => {
    let res = await employeeAPI.createUser(payload);
    try {
      navigate("/login");
    } catch (err: any) {
      console.log("err", err?.response);
      toast.error("sasjnajs");
    }
  };

  const formik = useFormik({
    //INITIAL VALUES
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      userTypeId: "",
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
        name: values?.name,
        email: values.email,
        password: values?.password,
        phoneNumber: values.phoneNumber,
        userTypeId: values.userTypeId,
      };
      createRegister(createPayload);
    },
  });

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>Enter your details to access.</CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className="space-y-1">
            <div className="">
              <p>Name</p>
              <Input
                id="name"
                name="name"
                placeholder="Username"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className=" text-red-600 text-sm">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
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
              <p>Phone Number</p>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder=""
                type="number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className=" text-red-600 text-sm">
                  {formik.errors.phoneNumber}
                </div>
              ) : null}
            </div>
            <div className="">
              <p>User Type</p>
              <CustomSelectNew
                placeholder={""}
                options={getUser?.data?.data?.map((item: any) => {
                  return {
                    label: item?.type,
                    value: item?._id,
                  };
                })}
                styles={""}
                customOnChange={(e: any) => {
                  formik.setFieldValue("userTypeId", e);
                }}
              />
            </div>

            <div className="">
              <p>Password</p>
              <Input
                id="password"
                name="password"
                required
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
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                already have an account?
              </div>
            </div>
            <Button className="w-full py-1" type="submit">
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
