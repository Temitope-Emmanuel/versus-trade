import {ChatMessage} from "core/models/ChatMessage"
import {IAccount} from "core/models/Account"

export interface ChatState {
    currentMessages:ChatMessage[];
    currentChatProfile:IAccount;
    alerts:string[]
}

export enum ActionTypes {
    SET_CURRENT_CHAT_PROFILE = "[CHAT] Set_Current_Chat_Profile",
    LOAD_CHAT_MESSAGE = "[CHAT] Load_Chat_Message",
    ADD_CHAT_MESSAGE = "[CHAT] Add_Chat_Message",
    CLEAR_CHAT_MESSAGE = "[CHAT] Clear_Chat_Message",
    SET_MESSAGE_ALERT = "[CHAT] Set_Alert_Message",
    CLEAR_ALERT_MESSAGE = "[CHAT] Clear_Alert_Message"
}


export interface SetCurrentChatProfileAction {
    type:ActionTypes.SET_CURRENT_CHAT_PROFILE,
    payload:IAccount
}
export interface loadChatMessagesAction {
    type:ActionTypes.LOAD_CHAT_MESSAGE,
    payload:ChatMessage[]
}

export interface AddMessageToCurrentChatAction {
    type:ActionTypes.ADD_CHAT_MESSAGE,
    payload:ChatMessage
}
export interface ClearChatMessageAction {
    type:ActionTypes.CLEAR_CHAT_MESSAGE
}
export interface SetMessageAlertAction {
    type:ActionTypes.SET_MESSAGE_ALERT,
    payload:string
}

export interface ClearAlertMessageAction {
    type:ActionTypes.CLEAR_ALERT_MESSAGE
    payload:string
}
export type Action = SetCurrentChatProfileAction | loadChatMessagesAction | AddMessageToCurrentChatAction |
 ClearChatMessageAction | ClearAlertMessageAction | SetMessageAlertAction