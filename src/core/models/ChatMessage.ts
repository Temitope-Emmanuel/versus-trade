import firebase from "firebase"
import { DataBaseModel } from "./BaseModel";

export interface ChatMessage extends DataBaseModel {
    createdAt:ReturnType<typeof firebase.firestore.FieldValue.serverTimestamp>;
    author:{
        username:string;
        id:string;
        photoURL:string;
    };
    message:string;
    transaction?:boolean;
    ownerIsCurrentUser?:boolean
}