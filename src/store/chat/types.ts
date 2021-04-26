import {ChatMessage} from "core/models/ChatMessage"
import {IAccount} from "core/models/Account"

export interface LoadingDetail {
    userId:string;
    type:"chat" | "transaction";
    reason:string
}

export interface ChatState {
    messages:{
        [key:string]:ChatMessage[]
    }
    currentChatProfile:IAccount;
    chatList:{
        normal:IAccount[];
        favorite:IAccount[]
    };
    isLoading:{
        [key:string]:LoadingDetail[]
    }
    alerts:{
        [key:string]:number
    }
}

export enum ActionTypes {
    SET_CURRENT_CHAT_PROFILE = "[CHAT] Set_Current_Chat_Profile",
    LOAD_CURRENT_CHAT_MESSAGE = "[CHAT] Load_Current_Chat_Message",
    LOAD_PREVIOUS_CHAT_MESSAGE = "[CHAT] Load_Previous_Chat_Message",
    ADD_CHAT_MESSAGE = "[CHAT] Add_Chat_Message",
    CLEAR_CHAT_MESSAGE = "[CHAT] Clear_Chat_Message",
    SET_MESSAGE_ALERT = "[CHAT] Set_Alert_Message",
    CLEAR_ALERT_MESSAGE = "[CHAT] Clear_Alert_Message",
    ADD_LOADING = "[CHAT] Add_Loading",
    REMOVE_LOADING = "[CHAT] Remove_Loading",
    SET_CHAT_LIST = "[CHAT] Set_Chat_List"
}

export interface AddLoadingAction {
    type:ActionTypes.ADD_LOADING,
    payload:LoadingDetail
}

export interface RemoveLoadingAction {
    type:ActionTypes.REMOVE_LOADING,
    payload:LoadingDetail
}

export interface setChatListAction {
    type:ActionTypes.SET_CHAT_LIST,
    payload:IAccount[]
}

export interface SetCurrentChatProfileAction {
    type:ActionTypes.SET_CURRENT_CHAT_PROFILE,
    payload:IAccount
}
export interface LoadPreviousChatHistoryAction {
    type:ActionTypes.LOAD_PREVIOUS_CHAT_MESSAGE,
    payload:{
        userId:string;
        chatMessage:ChatMessage[]
    }
}
export interface LoadCurrentChatHistoryAction {
    type:ActionTypes.LOAD_CURRENT_CHAT_MESSAGE,
    payload:ChatMessage[]
}

export interface AddMessageChatAction {
    type:ActionTypes.ADD_CHAT_MESSAGE,
    payload:{
        userId:string;
        chatMessage:ChatMessage
    }
}
export interface ClearChatMessageAction {
    type:ActionTypes.CLEAR_CHAT_MESSAGE,
    payload:{
        userId:string
    }
}
export interface SetMessageAlertAction {
    type:ActionTypes.SET_MESSAGE_ALERT,
    payload:{
        userId:string;
    }
}

export interface ClearAlertMessageAction {
    type:ActionTypes.CLEAR_ALERT_MESSAGE
    payload:{
        userId:string;
    }
}

export type Action = SetCurrentChatProfileAction | LoadCurrentChatHistoryAction | LoadPreviousChatHistoryAction | AddMessageChatAction |
 ClearChatMessageAction | ClearAlertMessageAction | SetMessageAlertAction | AddLoadingAction | RemoveLoadingAction | setChatListAction