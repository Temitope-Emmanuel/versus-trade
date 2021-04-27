import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {createStyles, DialogActions, DialogContent, DialogTitle, makeStyles, useMediaQuery,useTheme} from "@material-ui/core"
import { title } from 'node:process';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => createStyles({
  root:{
  },
  footerContainer:{
    justifyContent:"center"
  },
  dialogContainer:{
    overflowX:"hidden"
  }
}))

interface IProps {
    open:boolean;
    title:string;
    dialogAction?:any
    handleClose:() => void
}

const AlertDialogSlide:React.FC<IProps> = ({children,title,dialogAction,handleClose,open}) => {
  const theme = useTheme()
  const classes = useStyles()
  const mediaQuery = useMediaQuery(theme.breakpoints.down('xs'))
  
  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted maxWidth="sm"
        onClose={handleClose} fullWidth={true}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
         <DialogTitle id="alert-dialog-slide-title">
          {title}
      </DialogTitle>
        <DialogContent className={`flex flex-col p-24 ${classes.dialogContainer}`}>
          {children}
        </DialogContent>
        <DialogActions className={classes.footerContainer}>
          {dialogAction}
        </DialogActions>
      </Dialog>
  );
}

export default AlertDialogSlide