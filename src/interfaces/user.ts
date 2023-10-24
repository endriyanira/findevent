export interface IUserRequest {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  email: string;
  firstName:string
  lastName:string
  age?:number
  balance:number
  walletId:number
  password:string
  membership?:string
}

export interface UserDataRequest{
  email?: string;
  firstName?:string
  lastName?:string
  age?:number
  balance?:number
  walletId?:number
  password?:string
}

export interface IUserResponse {
  message?: string;
  error?: boolean;
  data?: {
    accessToken: string;
    user: UserData;
  } | null;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  user: UserData;
}

export interface IUserWalletInfo {
  id:number,
  userId:number
  balance:number
}

