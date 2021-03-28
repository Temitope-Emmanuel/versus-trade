import {IAccount} from "core/models/Account"
import {HYDRATE} from "next-redux-wrapper"

export interface SystemState {
    isAuthenticated:boolean;
    isLoading:boolean;
    pageTitle:string;
    currentUser:IAccount;
}


export enum ActionTypes {
    SHOW_SPINNER = "[System] Show_Spinner",
    HIDE_SPINNER = "[System] Hide_Spinner",
    LOGIN = "[System] Login",
    SETCURRENTUSER = "[System] SetCurrentUser",
    SET_PAGE_TITLE = "[System] SetPageTitle",
}

export interface ShowSpinnerAction {
    type:ActionTypes.SHOW_SPINNER
}


export interface HideSpinnerAction {
    type:ActionTypes.HIDE_SPINNER
}
export interface SetTitleAction {
    type:ActionTypes.SET_PAGE_TITLE,
    payload:string
}
export interface LoginAction {
    type: ActionTypes.LOGIN,
    payload: string
}
export interface SetCurrentUserAction {
    type: ActionTypes.SETCURRENTUSER,
    payload: any
} 

export type Action = HideSpinnerAction  | LoginAction | SetCurrentUserAction |
 ShowSpinnerAction | HideSpinnerAction | SetTitleAction