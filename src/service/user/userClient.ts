import { IUserRequest, UserDataRequest } from "@/interfaces/user";
import { BASE_URL } from "../constants";
import { UserService } from "./userService";
export class UserClient {
  static postSignUp = async (data: IUserRequest) => {
    const response = await UserService.post(`${BASE_URL}/register`, data);
    return response;
  };

  static login = async (data: IUserRequest) => {
    const response = await UserService.post(`${BASE_URL}/login`, data);
    return response;
  };

  static getUserDetails = async (userId:string) => {
    const response = await UserService.get(`${BASE_URL}/users/${userId}`)
    return response
  }

  static updateBalance = async (userId:number, data: UserDataRequest) =>{
    const response = await UserService.patch(`${BASE_URL}/users/${userId}`, data)
    return response
  }

  static getUserList = async () =>{
    const response = await UserService.get(`${BASE_URL}/users`)
    return response
  }
}
