import {Action,ActionTypes,ChatState} from "./types"


const initialState:ChatState = {
    currentChatProfile:{
        email:"",
        profileImage:"",
        providerData:[],
        role:"user",
    },
    alerts:[],
    currentMessages:[]
}


const chatReducer = (state = initialState,action:Action):ChatState => {
    switch(action.type){
        case ActionTypes.ADD_CHAT_MESSAGE:
            return {
                ...state,
                currentMessages:[...state.currentMessages,action.payload]
            }
        case ActionTypes.CLEAR_CHAT_MESSAGE:
            return {
                ...state,
                currentMessages:[]
            }
        case ActionTypes.LOAD_CHAT_MESSAGE:
            return {
                ...state,
                currentMessages:[...state.currentMessages,...action.payload]
            }
        case ActionTypes.SET_CURRENT_CHAT_PROFILE:
            return {
                ...state,
                currentChatProfile:action.payload
            }
        case ActionTypes.SET_MESSAGE_ALERT:
            return {
                ...state,
                alerts:[...state.alerts,action.payload]
            }
        case ActionTypes.CLEAR_ALERT_MESSAGE:
            return {
                ...state,
                alerts:[...state.alerts.filter(item => item !== action.payload)]
            }
        default:
            return state
    }
}

export default chatReducer