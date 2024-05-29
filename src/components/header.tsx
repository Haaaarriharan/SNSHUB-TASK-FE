/********************************Import  Packages*************************************/
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
/********************************Import  Components*************************************/
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

/********************************Import  Redux*************************************/
import { clearEmployeeData } from "@/redux/EmployeeReducer";
import { clearuserData } from "@/redux/userReducer";
import { RootState } from "@/redux/store";

const Header = () => {
  const dispatch: any = useDispatch();
  const { data }: any = useSelector((state: RootState) => state.user);

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <p className="text-lg font-bold">Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className=" hover:bg-black select-none"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="https://as1.ftcdn.net/v2/jpg/05/86/52/38/1000_F_586523892_tNPOUFiFbyvPqmdFUV1rZ9pDura6AbGA.jpg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{data?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  dispatch(clearuserData());
                  dispatch(clearEmployeeData());
                }}
                className=" bg-black hover:bg-red-600 hover:cursor-pointer text-white"
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
