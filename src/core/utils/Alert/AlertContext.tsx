import React from "react"
import {Alert} from "."


export interface AlertOptions {
    title?: string;
    message: string;
    type:"error" | "info" | "success" | "warning"
  }
  
  const AlertServiceContext = React.createContext<
    // we will pass the openning dialog function directly to consumers
    (options: AlertOptions) => Promise<void>
  >(Promise.reject);

  interface IProps{}

  export const AlertServiceProvider:React.FC<IProps> = ({children}) => {
      const [confirmationState,setConfirmationState] = React.useState<AlertOptions| null> (null);
      const awaitPromisingRef = React.useRef<{
          resolve:() => void;
          reject:() => void;
      }>()

      const openConfirmation = (options:AlertOptions) => {
          setConfirmationState(options)
          return Promise.resolve()
      }
      React.useEffect(() => {
          if(confirmationState !== null){
              setTimeout(() => {
                  setConfirmationState(null)
              },5000)
          }
      },[confirmationState])
      return(
          <>
          <AlertServiceContext.Provider
          value={openConfirmation} children={children}
          />
          <Alert open={Boolean(confirmationState)} {...confirmationState} />
          </>
      )
  }

  export const useAlertService = () => (
      React.useContext(AlertServiceContext)
  )
  export type dialogServiceType = ReturnType<typeof useAlertService>