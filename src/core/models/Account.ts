import { DataBaseModel } from "./BaseModel";


export interface IAccount extends DataBaseModel {
    email:string;
    providerData:{}[];
    role:"user" | "admin";
    profileImage:string;
    hasChat?:boolean
}