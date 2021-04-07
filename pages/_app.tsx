import React, { ComponentType } from "react"
import Head from "next/head"
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
import { ReactReduxFirebaseConfig, ReactReduxFirebaseProvider, ReactReduxFirebaseProviderProps } from "react-redux-firebase"
import firebase from "firebase/app"

import { AlertServiceProvider } from "../src/core/utils/Alert/AlertContext"

function MyApp({ Component, pageProps }: {
  Component: ComponentType<AppInitialProps>,
  pageProps: AppInitialProps
}) {
  // const firebase = useFirebase()

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
    profileFactory: user => {
     console.log({user})
      const profile = {
        email: user.email || user.providerData[0].email,
        role: 'user',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        profileImage:user.photoURL,
        id:user.uid
      } as any

      if (user.providerData && user.providerData.length) {
        profile.providerData = user.providerData
      }
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