import { DataBaseModel } from "./BaseModel";

export interface Transaction extends DataBaseModel {
    comment:string;
    files:{imageUrl:string,filePath:string}[];
    type:"giftcard" | "cryptocurrency",
    status:"Pending" | "Rejected" | "Successful",
    reason?:string;
}