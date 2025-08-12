import { useDispatch, useSelector } from "react-redux";
// COMPONENETS
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
// REDUX
import { clearEmployeeData } from "@/redux/EmployeeReducer";
import { RootState } from "@/redux/store";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { removelogin } from "@/redux/userReducer";

const Header = () => {
  const dispatch: any = useDispatch();
  const { data }: any = useSelector((state: RootState) => state.user);

  return (
    <header
      className="bg-white text-black"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
    >
      <div className="mx-4  flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <p
            className="text-lg  font-medium"
            style={{
              fontFamily: `Poppins`,
            }}
          >
            DASHBOARD
          </p>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar> 
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{data?.data?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  dispatch(removelogin());
                }}
                className=" hover:bg-red-600 hover:cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
