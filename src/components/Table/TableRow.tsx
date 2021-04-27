import React from 'react';
import { withStyles, Theme, createStyles} from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import {TableCell} from "."


const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      cursor:"pointer",
      transition:"background-color .1s linear",
      "&:hover":{
          backgroundColor:theme.palette.grey[200]
      }
    //   '&:first-child': {
    //     backgroundColor: "transparent",
    //   },
    }
  })
)(TableRow);



interface IProps{
  fields:any[];
  isLoaded:boolean;
  onClick?:any
}

const StyledRow:React.FC<IProps> = ({fields,onClick}) => (
  <StyledTableRow onClick={onClick ? onClick : null}>
    {fields.map((item,idx) => (
      <TableCell key={idx} >
        {item}
      </TableCell>
    ))}
  </StyledTableRow>
)

export default StyledRow