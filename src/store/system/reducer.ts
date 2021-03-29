import {AppState} from ".."
import {Action,ActionTypes,SystemState} from "./types"
import {HYDRATE} from "next-redux-wrapper"
import isEmpty from "lodash/isEmpty"


const initialState: SystemState = {
    isAuthenticated: false,
    isLoading:true,
    pageTitle:"",
    currentUser: {
        email:"",
        profileImage:"",
        providerData:[],
        role:"user",
        
    }
}

export function systemReducer(state = initialState, action: Action): SystemState {
    switch (action.type) {
        case HYDRATE as any:
            return {
                ...state,...(action as any).payload
            }
        case ActionTypes.SETCURRENTUSER:
            return {
                ...state,
                currentUser: {
                    ...action.payload
                },
                isAuthenticated: !isEmpty(action.payload)
            };
        case ActionTypes.SHOW_SPINNER:
            return {
                ...state,
                isLoading:true
            }
        case ActionTypes.HIDE_SPINNER:
            return {
                ...state,
                isLoading:false
            }
        case ActionTypes.SET_PAGE_TITLE:
            return {
                ...state,
                pageTitle:action.payload
            }
        default:
            return state;
    }
}
/**
 * Extract system from redux root state
 * 
 * @param {AppState} state the root state
 * @returns {SystemState} The current system state
 */

export const selectSystem = (state:AppState) => state.system

export default systemReducer