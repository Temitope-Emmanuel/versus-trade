import {combineReducers} from "redux"
import systemReducer from "./system/reducer"
import chatReducer from "./chat/reducer"

import {createStore,applyMiddleware,compose} from "redux"
import {createWrapper} from "next-redux-wrapper"
import {reduxFirestore,getFirestore, firestoreReducer,Config} from "redux-firestore"
import {firebaseReducer, getFirebase} from "react-redux-firebase"
import thunk from "redux-thunk"
import reduxLogger from "redux-logger"


import * as firebase from "firebase"
import {fbConfig} from "../core/utils/firebaseConfig"
import firebaseApp from "firebase/app"
import "firebase/firestore"
import "firebase/auth"


const rootReducer = combineReducers({
    system:systemReducer,
    chat:chatReducer,
    // Add firestore & firebase to the store
    firestore:firestoreReducer,
    firebase:firebaseReducer
})

export interface AppState2 {
    firestore:ReturnType<typeof firestoreReducer>;
    firebase:ReturnType<typeof firebaseReducer>
}

export type AppState = ReturnType<typeof rootReducer> & AppState2


const initialState = {};

const rrfConfig:Partial<Config> = {
 enableLogging:true,

}


export const newStore = () => {
    if(!firebaseApp.apps.length){
        firebaseApp.initializeApp(fbConfig)
        firebaseApp.firestore()
      }
    
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk.withExtraArgument({
                // Adds the firebase && firestore to the dispatch call for availability
                getFirebase,getFirestore
            }),reduxLogger),
            // Makes firebase function call available
        reduxFirestore(firebase,rrfConfig)
        )
    )
}

// type StoreType = ReturnType<typeof newStore>

// Create a new redux store with a passed in context based on the invocation environment
export const wrapper = createWrapper(newStore,{debug:true})