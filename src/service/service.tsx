import apiInstance from "@/axios";

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
