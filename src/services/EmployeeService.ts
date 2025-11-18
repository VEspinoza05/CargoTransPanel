import type { IEmployeeModel } from "@/models/EmployeeModel";
import axios from "../api/axios";

export const getEmployees = async (): Promise<IEmployeeModel[]> => {
  const response = await axios.get<IEmployeeModel[]>("/Employee")
  
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<string> => {
  const response = await axios.delete(`/Employee/${id}`)
  return response.data;
};

export const createEmployee =  async (newEmployee: any): Promise<any> => {
  console.log('CREATE EMPLOYEE' + JSON.stringify(newEmployee))

  const response = await axios.post("/Auth/register", {
    firstName: newEmployee.firstName,
    lastName: newEmployee.lastName,
    roleId: Number(newEmployee.roleId),
    status: newEmployee.status,
    phone: newEmployee.phone,
    contractType: newEmployee.contractType,
    shift: newEmployee.shift,
    email: newEmployee.email,
    password: newEmployee.email,
  });
  return response.data;
};

export const updateEmployeePassword =  async (id: number, password: string): Promise<any> => {
  const response = await axios.put(`/Employee/UpdatePassword/${id}`, {
    password: password
  });
  return response.data;
}

export const updateEmployee =  async (id: number, updatedEmployee: any): Promise<any> => {
  const response = await axios.put(`/Employee/${id}`, {
    firstName: updatedEmployee.firstName,
    lastName: updatedEmployee.lastName,
    roleId: updatedEmployee.roleId,
    status: updatedEmployee.status,
    phone: updatedEmployee.phone,
    contractType: updatedEmployee.contractType,
    shift: updatedEmployee.shift,
    email: updatedEmployee.email
  });
  return response.data;
}