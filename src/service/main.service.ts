import apiInstance from "@/axios";

class PUBLIC_ROUTE_API {
  //CRETAE NEW DESIGN
  Login = async (data: any) => {
    return await apiInstance.post(`/login`, data);
  };

  FORGOT_PASSWORD = async (data: any) => {
    return await apiInstance.post(`/forgot_password`, data);
  };
}

const PUBLIC_ROUTE_API_SERVICE = new PUBLIC_ROUTE_API();

export default PUBLIC_ROUTE_API_SERVICE;
