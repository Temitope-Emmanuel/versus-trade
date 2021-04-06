import { ChatMessage } from "core/models/ChatMessage";
import {dialogServiceType} from "core/utils/Alert/AlertContext"
import {
  AddMessageToCurrentChatAction,ClearChatMessageAction,
  SetCurrentChatProfileAction,loadChatMessagesAction,
  ActionTypes  
} from "./types"
import { Dispatch } from "redux";
import { AppState } from "store";
import { IAccount } from "core/models/Account";
import {getFirestore} from "redux-firestore"
import {ExtendedFirebaseInstance, getFirebase} from "react-redux-firebase"
import firebase from "firebase/app"

export function setChatProfile (currentProfile:IAccount):SetCurrentChatProfileAction{
    return ({
        type:ActionTypes.SET_CURRENT_CHAT_PROFILE,
        payload:currentProfile
    })
}

export function clearChatMessage ():ClearChatMessageAction{
    return ({
        type:ActionTypes.CLEAR_CHAT_MESSAGE
    })
}
export function addChatMessage(newMessage:ChatMessage,dialog:dialogServiceType){
 return (dispatch:Dispatch,state:() => AppState,getFirebase:{
     getFirebase:() => ExtendedFirebaseInstance,
     getFirestore:() => ReturnType<typeof firebase.firestore>
 })  => {
     const appState = state()
     const firestore = getFirebase.getFirestore()
     const documentRef = firestore.collection("users").doc(appState.chat.currentChatProfile.id).collection("chatMessages").doc()
     return documentRef.set({
         ...newMessage,
         id:documentRef.id
     }).catch(err => {
         dialog({
             message:`Error:${err.message}`,
             type:"error",
             title:"Unable to complete adding new chat message"
         })
     })
 }  
}