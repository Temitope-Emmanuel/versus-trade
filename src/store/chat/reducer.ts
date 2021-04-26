import { Action, ActionTypes, ChatState } from "./types";

const initialState: ChatState = {
  currentChatProfile: {
    firstName:"",
    lastName:"",
    username:"",
    email: "",
    profileImage: "",
    providerData: [],
    role: "user",
    favorite: false,
  },
  alerts: {},
  chatList:{
    favorite:[],
    normal:[]
  },
  isLoading: {},
  messages:{}
};



const chatReducer = (state = initialState, action: Action): ChatState => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_CHAT_PROFILE:
      return {
        ...state,
        currentChatProfile: action.payload
      };
    case ActionTypes.LOAD_PREVIOUS_CHAT_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.userId]: [
            ...action.payload.chatMessage,
            ...state.messages[action.payload.userId],
          ],
        },
      };
    case ActionTypes.LOAD_CURRENT_CHAT_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.currentChatProfile.id]: [...action.payload],
        },
      };
    case ActionTypes.ADD_CHAT_MESSAGE:{
      return {
        ...state,
        messages:{
          ...state.messages,
          [action.payload.userId]:[...(state.messages[action.payload.userId] || []),action.payload.chatMessage]
        }
      }
    }
      case ActionTypes.CLEAR_CHAT_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.userId]: [],
        },
      };
    case ActionTypes.SET_MESSAGE_ALERT:
      return {
        ...state,
        alerts: {
          ...state.alerts,
          [action.payload.userId]: (state.alerts[action.payload.userId] || 0) + 1,
        },
      };
    case ActionTypes.CLEAR_ALERT_MESSAGE:
      return {
        ...state,
        alerts: {
          ...state.alerts,
          [action.payload.userId]: 0,
        },
      };
    case ActionTypes.ADD_LOADING: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.userId]: [
            ...(state.isLoading[action.payload.userId] || []),
            action.payload,
          ],
        },
      };
    }
    case ActionTypes.REMOVE_LOADING: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.userId]: [
            ...state.isLoading[action.payload.userId].filter(
              (item) => item.reason !== action.payload.reason
            ),
          ],
        },
      };
    }
    case ActionTypes.SET_CHAT_LIST:{
      return {
        ...state,
        chatList:{
          favorite:[...action.payload.filter(item => item.favorite)],
          normal:[...action.payload.filter(item => !item.favorite)]
        }
      }
    }
    default:
      return state;
  }
};

export default chatReducer;
