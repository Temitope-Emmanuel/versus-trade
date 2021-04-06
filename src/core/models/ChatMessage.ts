import firebase from "firebase"

export interface ChatMessage {
    createdAt:ReturnType<typeof firebase.firestore.FieldValue.serverTimestamp>;
    author:{
        username:string;
        id:string;
        photoURL:string;
    };
    message:string;
    transaction?:string
}