import React from "react"
import Head from "next/head"
// import 'styles/globals.css'
import "tailwindcss/dist/tailwind.css"
import theme from "styles/theme"
import type {AppProps} from "next/app"
import {ThemeProvider} from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import AOS from "aos"
import "aos/dist/aos.css"



function MyApp({ Component, pageProps }:AppProps) {
  
  React.useEffect(() => {
    AOS.init({
      delay:500,
      duration:800
    })
    const jssStyles = document.querySelector("#jss-server-side");
    if(jssStyles){
      jssStyles.parentElement.removeChild(jssStyles)
    }
  
  },[])

  return(
    <>
    <Head>
      <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
    <ThemeProvider theme={theme} >
      <CssBaseline/>
      <Component {...pageProps} />
    </ThemeProvider>
    </>
  )
}

export default MyApp