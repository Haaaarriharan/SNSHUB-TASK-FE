import apiInstance from "@/axios";
import { toast } from "sonner";

const employeeAPI = {
  //CREATING THE EMPLOYEE
  createEmployee: async (payload: any) => {
    try {
      const res = await apiInstance.post(`/employee-create`, payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  getUserTypeId: async () => {
    try {
      const res = await apiInstance.get(`/usertype/list`);
      return res;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (payload: any) => {
    try {
      const res = await apiInstance.post(`/register`, payload);
      return res;
    } catch (error: any) {
      console.log("djsnjnsd", error?.response?.data?.message);
      toast.error(`${error?.response?.data?.message}`);
      throw error;
    }
  },

  loginUser: async (payload: any) => {
    try {
      const res = await apiInstance.post(`/login`, payload);
      return res;
    } catch (error: any) {
      toast.error(`${error?.response?.data?.message}`);
      throw error;
    }
  },

  listAllTheUser: async (payload: any) => {
    try {
      const res = await apiInstance.post(`/user/listall`, payload);
      return res;
    } catch (error: any) {
      toast.error(`${error?.response?.data?.message}`);
      throw error;
    }
  },
  //LISTING THE EMPLOYEE BY USERID
  getEmployees: async (id: any) => {
    try {
      const res = await apiInstance.get(`/employee-list/${id}`);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default employeeAPI;
