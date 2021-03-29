import React from 'react';
import { withStyles, Theme, createStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.dark,
      color:"white",
      fontFamily:"Raleway, Helvetica,Arial, sans-serif",
      fontWeight:600,
      opacity:.5,
      fontSize:10,
      [theme.breakpoints.up("sm")]:{
        fontSize: 15
      }
    },
    body: {
      fontFamily:"Raleway, Helvetica,Arial, sans-serif",
    //   fontWeight:600,
      fontSize: 9.5,
      opacity:.65,
      [theme.breakpoints.up("sm")]:{
        fontSize: 12.5
      },
      [theme.breakpoints.up("md")]:{
        fontSize: 15
      },
    }
  }),
)(TableCell);

interface IProps{
}

const StyledCell:React.FC<IProps> = ({children}) => (
  <StyledTableCell>
    {children}
  </StyledTableCell>
)

export default StyledCell