import { DataBaseModel } from "./BaseModel";


export interface IAccount extends DataBaseModel {
    email:string;
    firstName:string;
    lastName:string;
    providerData:{}[];
    role:"user" | "admin";
    profileImage:string;
    favorite:boolean;
    hasChat?:boolean;
    username:string
}