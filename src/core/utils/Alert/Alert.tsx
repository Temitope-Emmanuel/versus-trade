import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {Alert,AlertTitle} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import {AlertOptions} from "./AlertContext"


function MuiAlert(props:any) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


interface IProps extends Partial<AlertOptions> {
  open:boolean
}


const SnackbarComponent:React.FC<IProps> = ({message = "",title = "",type = "info",open}) => {
    const classes = useStyles();
  
  
    const alertMessage = () => {
      switch(type){
        case "error":
          return <MuiAlert severity="error">
              <AlertTitle>
                  {title}
              </AlertTitle>
              {message}
          </MuiAlert>;
        case "warning":
          return <MuiAlert severity="warning">
              <AlertTitle>
                  {title}
              </AlertTitle>
              {message}
          </MuiAlert>;
        case "info":
          return <MuiAlert severity="info">
              <AlertTitle>
                  {title}
              </AlertTitle>
              {message}
          </MuiAlert>;
        case "success":
          return <MuiAlert severity="success">
              <AlertTitle>
                  {title}
              </AlertTitle>
              {message}
          </MuiAlert>;
        default:
          return <MuiAlert severity="info">
              <AlertTitle>
                  {title}
              </AlertTitle>
              {message}
          </MuiAlert> 
      }
    }
    
    return (
        <Snackbar open={open} className={classes.root} autoHideDuration={5000} >
          {
            alertMessage()
          }
        </Snackbar>
    );
  }
  
  
  export default SnackbarComponent