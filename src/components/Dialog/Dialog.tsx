import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {useMediaQuery,useTheme} from "@material-ui/core"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


interface IProps {
    open:boolean;
    handleClose:() => void
}

const AlertDialogSlide:React.FC<IProps> = ({children,handleClose,open}) => {
    const theme = useTheme()
    const mediaQuery = useMediaQuery(theme.breakpoints.down('md'))
  return (
      <Dialog
        open={open} fullScreen={mediaQuery}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {children}
      </Dialog>
  );
}

export default AlertDialogSlide