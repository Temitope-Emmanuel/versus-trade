import { ChatMessage } from "core/models/ChatMessage";
import {dialogServiceType} from "core/utils/Alert/AlertContext"
import {
  AddMessageChatAction,ClearChatMessageAction,
  SetCurrentChatProfileAction,AddLoadingAction,
  ActionTypes,ClearAlertMessageAction,SetMessageAlertAction, RemoveLoadingAction,
  LoadCurrentChatHistoryAction,setChatListAction,LoadPreviousChatHistoryAction
} from "./types"
import { Dispatch } from "redux";
import { AppState } from "store";
import { IAccount } from "core/models/Account";
import {Transaction} from "core/models/Transaction"
import {ExtendedFirebaseInstance} from "react-redux-firebase"
import {LoadingDetail} from "./types"

export function setChatProfile (currentProfile:IAccount):SetCurrentChatProfileAction{
    return ({
        type:ActionTypes.SET_CURRENT_CHAT_PROFILE,
        payload:currentProfile
    })
}

export function addLoadingAction(arg:LoadingDetail):AddLoadingAction{
    return({
        type:ActionTypes.ADD_LOADING,
        payload:arg
    })
}
export function removeLoadingAction(arg:LoadingDetail):RemoveLoadingAction{
    return({
        type:ActionTypes.REMOVE_LOADING,
        payload:arg
    })
}

export function clearChatMessage (userId:string):ClearChatMessageAction{
    return ({
        type:ActionTypes.CLEAR_CHAT_MESSAGE,
        payload:{
            userId
        }
    })
}
export function clearChatNotification(userId:string):ClearAlertMessageAction{
    return({
        type:ActionTypes.CLEAR_ALERT_MESSAGE,
        payload:{
            userId
        }
    })
}
export function setMessage (userId:string):SetMessageAlertAction {
    return({
        type:ActionTypes.SET_MESSAGE_ALERT,
        payload:{
            userId
        }
    })
}


export function addTransaction(newTransaction:Transaction,dialog:dialogServiceType){
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
        await firebase.uploadFiles(`users/${appState.firebase.profile.id}/transaction`,
         newTransaction.file as any,`users/${appState.firebase.profile.id}/transaction`,{
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
                return {
                  name,
                  fullPath,
                  downloadURL,
                }
              }
        }).then(async(result) => {
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
    
                const {file,...newerTransaction} = newTransaction
                await documentRef.set({
                    ...newerTransaction,
                    id:documentRef.id,
                    file:downloadResult
                }).then(() => {
                    dialog({
                        message:"New Transaction successfully created",
                        type:"info",
                        title:""
                    })
                })
                
        }).catch(err => {
            dialog({
                message:`Error:${err.message}`,
                type:"error",
                title:"Unable to complete Request"
            })
        })

    }
}


export function addCurrentMessageHistory(chatMessage:ChatMessage[]):LoadCurrentChatHistoryAction{
    return({
        type:ActionTypes.LOAD_CURRENT_CHAT_MESSAGE,
        payload:chatMessage
    })
}

export function addPreviousMessageHistory(arg:ChatMessage[],userId:string):LoadPreviousChatHistoryAction{
    return({
        type:ActionTypes.LOAD_PREVIOUS_CHAT_MESSAGE,
        payload:{
            chatMessage:arg,
            userId
        }
    })
}

export function addMessageAlert(userId:string):SetMessageAlertAction{
    return({
        type:ActionTypes.SET_MESSAGE_ALERT,
        payload:{
            userId
        }
    })
}

export function addSingleChatMessage({
    chat,newMessage
}:{
    newMessage:ChatMessage,
    chat:string
}){
    return async (dispatch:Dispatch,state:() => AppState) => {
        const {chat:{
            currentChatProfile
        }} = state()
        if(currentChatProfile.id !== chat){
            console.log("we are here")
            dispatch(addMessageAlert(chat))
        }
        return dispatch(({
            type:ActionTypes.ADD_CHAT_MESSAGE,
            payload:{
                chatMessage:newMessage,
                userId:chat
            }
        }))
    }
}

export function setChatList(arg:IAccount[]):setChatListAction{
    return({
        type:ActionTypes.SET_CHAT_LIST,
        payload:arg
    })
}