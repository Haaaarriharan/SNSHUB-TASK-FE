import { DatePicker } from "@/components/datepicker/date-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EmployeeType } from "@/global";
import { PlusIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { setEmployee } from "../redux/EmployeeReducer";
import { RootState } from "@/redux/store";
// FORMIK
import { useFormik } from "formik";
import * as yup from "yup";
// SERVICE
import moment from "moment";
import employeeAPI from "@/service/service";
import Loading from "@/components/loader/loader";
// TOAST
import { toast } from "sonner";
import Header from "@/components/header/header";
import { DataTable } from "@/components/table/table";
import Footer from "@/components/footer/footer";
import { useQuery } from "react-query";
import CustomSelectNew from "@/components/select/Newselect";

const Dashboard = () => {
  const dispatch: any = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [employeeList, setEmployeeList] = useState<any>([]);
  const [filter, setFilter] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(false);

  //VALIDATION SCHEMA
  const validationSchema = yup.object({
    employeeName: yup.string().required("Name is required"),
    designation: yup.string().required("Designation is required"),
    department: yup.string().required("Department is required"),
    dateOfJoining: yup.string().required("Date of Joining is required"),
    address: yup.string().required("Address is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    //INITIAL VALUES
    initialValues: {
      employeeName: "",
      designation: "",
      department: "",
      dateOfJoining: "",
      address: "",
    },
    validationSchema: validationSchema,
    //SUBMITTING THE FORM
    onSubmit: async (values) => {},
  });

  //LIST EMPLOYEES BASED ON USERID
  // const getEmployeesById = async () => {
  //   setLoading(true);
  //   try {
  //     await employeeAPI.getEmployees(User?._id).then((res: any) => {
  //       const uniqueVal: any = res?.data?.data.map(
  //         (item: any) => item?.uniqueId
  //       );
  //       setEmployeeList(uniqueVal);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getEmployessByReactQuery = useQuery(
    ["getEmployessByReactQuery"],
    async () => {
      let payload: any = {
        where: {},
      };

      return await employeeAPI.listAllTheUser(payload);
    },
    {
      onSuccess: (res) => {
        setEmployeeList(res?.data);
      },
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  console.log("getEmployessByReactQuery", getEmployessByReactQuery?.data?.data);

  const getUser = useQuery(
    ["sajnsj"],
    async () => {
      return await employeeAPI.getUserTypeId();
    },
    {
      onSuccess: (res) => {},
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  //TABLE DATA INITIALIZATION
  const EmployeeColumns: ColumnDef<EmployeeType>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: any) => (
        <div className="capitalize">{row?.original?.name}</div>
      ),
    },
    {
      accessorKey: "designation",
      header: () => {
        return <p>Email</p>;
      },
      cell: ({ row }: any) => <div className="">{row?.original?.email}</div>,
    },
    {
      accessorKey: "department",
      header: () => <div className="text-left">Phone Number</div>,
      cell: ({ row }: any) => {
        return (
          <div className="text-left font-medium">
            {row?.original?.phoneNumber}
          </div>
        );
      },
    },

    {
      accessorKey: "department",
      header: () => <div className="text-left">Role</div>,
      cell: ({ row }: any) => {
        let newVar = getUser?.data?.data?.find(
          (d: any) => row?.original?.userTypeId === d?._id
        );

        return (
          <div className="text-left font-medium">{newVar?.type || "--"}</div>
        );
      },
    },
    {
      accessorKey: "dateOfJoining",
      header: () => <div className="text-left">Date of Joining</div>,
      cell: ({ row }: any) => {
        return (
          <div className="text-left">
            {new Date(row?.original?.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        );
      },
    },
  ];

  console.log("dksndsnd", employeeList);

  //CLOSE MODEL FUNCTION
  const handleClose = () => {
    formik.resetForm();
    setOpenForm(false);
    setType(false);
  };

  return (
    <div className=" flex flex-col justify-between h-[100vh]">
      <Header />
      <div className="mx-10 overflow-scroll flex-grow no-scrollbar">
        <div className="flex mt-2 mb-5 gap-2">
          <p
            className="text-lg font-medium"
            style={{
              fontFamily: `Poppins`,
            }}
          >
            LIST OF USERS
          </p>
          <div className="w-36">
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
                setFilter(e);
                let newArr = [...getEmployessByReactQuery?.data?.data];
                let filterArr = newArr.filter((d) => d.userTypeId === e);
                setEmployeeList(filterArr);
                console.log("dksndjn", newArr);
              }}
            />
          </div>
        </div>

        {!loading ? (
          <div>
            <DataTable
              data={employeeList || []}
              columns={EmployeeColumns}
              setFilter={setFilter}
            />
          </div>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <Loading />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
