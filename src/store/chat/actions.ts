import { ChatMessage } from "core/models/ChatMessage";
import {dialogServiceType} from "core/utils/Alert/AlertContext"
import {
  AddMessageToCurrentChatAction,ClearChatMessageAction,
  SetCurrentChatProfileAction,loadChatMessagesAction,
  ActionTypes,ClearAlertMessageAction,SetMessageAlertAction
} from "./types"
import { Dispatch } from "redux";
import { AppState } from "store";
import { IAccount } from "core/models/Account";
import {Transaction} from "core/models/Transaction"
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
export function addTransaction(newTransaction:Transaction,dialog){
    return async (dispatch:Dispatch,state:() => AppState,getFirebase:{
        getFirebase:() => ExtendedFirebaseInstance,
        getFirestore:() => ReturnType<typeof firebase.firestore>
    })  => {
        const appState = state();
        const firestore = getFirebase.getFirestore();
        const firebase = getFirebase.getFirebase()
        // Create an id for the chat
        const documentRefForChat = firestore.collection("users").doc(appState.firebase.profile.id).collection("chatMessages").doc()
        
        // Create an id for the transaction
        const documentRef = firestore.collection("users").doc(appState.firebase.profile.id).collection("transactions").doc(documentRefForChat.id)
        const downloadResult = [];
        // Upload the result
        await firebase.uploadFiles(`media/transactions/${documentRef.id}`, newTransaction.files as any,`media/transactions/${documentRef.id}`,{
            documentId:documentRef.id,
            metadataFactory:(uploadRes, firebase, metadata, downloadURL) => {
                // upload response from Firebase's storage upload
                const {
                  metadata: { name, fullPath }
                } = uploadRes
                downloadResult.push({
                    fullPath,
                    downloadURL
                  })
                // default factory includes name, fullPath, downloadURL
                return {
                  name,
                  fullPath,
                  downloadURL,
                }
              }
        }).then(async(result) => {

            console.log({downloadResult})
    
                const newChat:ChatMessage = {
                    author:{
                        id:appState.firebase.profile.id,
                        photoURL:appState.firebase.profile.photoURL || "",
                        username:appState.firebase.profile.email,
                    },
                    message:"A transaction has been created",
                    transaction:true,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                }
        
                await documentRefForChat.set({
                 ...newChat,
                 id:documentRefForChat.id
                })
    
                const {files,...newerTransaction} = newTransaction
                await documentRef.set({
                    ...newerTransaction,
                    id:documentRef.id,
                    file:downloadResult
                })
                
        })

    }
}

export function loadAllChatMessage(chatMessage:ChatMessage[]):loadChatMessagesAction{
    return({
        payload:chatMessage,
        type:ActionTypes.LOAD_CHAT_MESSAGE
    })
}

export function addAlertNotification(arg:string):SetMessageAlertAction{
    return({
        payload:arg,
        type:ActionTypes.SET_MESSAGE_ALERT
    })
}

export function clearAlertNotification(arg:string):ClearAlertMessageAction{
    return({
        payload:arg,
        type:ActionTypes.CLEAR_ALERT_MESSAGE
    })
}