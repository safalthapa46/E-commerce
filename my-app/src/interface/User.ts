export interface IUserDetail {
    address: string;
    firstName: string;
    gender: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
  }
  
  export interface IUser {
    _id:string
    email: string;
    isVerified: boolean;
    password: string;
    role: string;
    userDetail: IUserDetail;
  }