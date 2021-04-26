import React, { ComponentType } from "react"
import Head from "next/head"
import "styles/globals.css"
import "tailwindcss/dist/tailwind.css"
import theme from "styles/theme"
import type { AppInitialProps } from "next/app"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import AOS from "aos"
import "aos/dist/aos.css"

import { Provider } from "react-redux"
import { wrapper, newStore } from "../src/store"
import { createFirestoreInstance } from "redux-firestore"
import { ReactReduxFirebaseConfig, ReactReduxFirebaseProvider, ReactReduxFirebaseProviderProps, useFirebase } from "react-redux-firebase"
import firebase from "firebase/app"
import "styles/styles.css"
import { AlertServiceProvider, useAlertService } from "../src/core/utils/Alert/AlertContext"

function MyApp({ Component, pageProps }: {
  Component: ComponentType<AppInitialProps>,
  pageProps: AppInitialProps
}) {

  const dialog = useAlertService()

  // This is the setup for the rrf
  const rrfConfig: Partial<ReactReduxFirebaseConfig> = {
    userProfile: "users",
    // uses firestore for user extra data
    useFirestoreForProfile: true,
    // Know and store the list of available users and their sessions
    presence: 'presence',
    sessions: 'sessions',
    // autoPopulateProfile:true,
    autoPopulateProfile:true,
    useFirestoreForStorageMeta:true,
    
    // Adds role based value on the saved user data
    profileFactory: (user,profileData,firebase) => {
      const profile = {
        email: profileData.email,
        firstName:profileData.firstName,
        lastName:profileData.lastName,
        phoneNumber:profileData.phoneNumber,
        role: 'user',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        profileImage:user.photoURL || "",
        id:(user as any).user.uid
      } as any

        const messaging = (firebase as any).messaging()
        messaging.requestPermission().then(function(){
          return messaging.getToken()
        }).then(token => {
          firebase.firestore().collection("fcmToken").doc((user as any).user.uid).set({
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
            username:`${profileData.firstName}-${profileData.lastName}`,
            token
          })
        }).catch(err => {
          dialog({
            message:`Error:${err.message}`,
            title:"Unable to complete notification",
            type:"error"
          })
        })
      return profile
    }
  }
  const store = newStore();

  // This is the ref passed to the component
  const rrfProps: ReactReduxFirebaseProviderProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
  }


  React.useEffect(() => {

    AOS.init({
      delay: 500,
      duration: 800
    })
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }

  }, [])

  return (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <AlertServiceProvider>

          <ReactReduxFirebaseProvider {...rrfProps} >
            <ThemeProvider theme={theme} >
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </ReactReduxFirebaseProvider>
        </AlertServiceProvider>
      </Provider>
    </>
  )
}

export default wrapper.withRedux(MyApp)