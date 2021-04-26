import React from 'react';
import {Badge,Box,Avatar} from '@material-ui/core';
import { Theme, makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { BadgeProps } from '@material-ui/core/Badge';

interface IProps extends Partial<BadgeProps> {
  className?:string;
  img:string;
  style?:object;
  badgeAlert?:number;
  badgePresence?:boolean
}

const useStyles = makeStyles((theme) => createStyles({
  root:(props:Partial<IProps>) => ({
    "& > span":{
      "& > span:nth-child(2)":{
        // "& .MuiBadge-badge":{
          backgroundColor: props.badgePresence ? '#44b700' : theme.palette.grey[500],
          color: '#44b700',
          boxShadow: props.badgePresence ? `0 0 0 2px ${theme.palette.background.paper}` : "none",
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: props.badgePresence ? 'ripple 1.2s infinite ease-in-out' : "",
            border: props.badgePresence ? '1px solid currentColor' : theme.palette.grey.A700,
            content: '""',
          },
        // }
      }
    }
  }),
  online:{
  },
  offline:{
    "& .MuiBadge-badgee":{
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '1px solid currentColor',
        content: '""',
      }
    }
  }
}))

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }),
)(Badge);


const BadgeAvatars:React.FC<IProps> =  ({img,badgeAlert,badgePresence,...props}) => {
  const classes = useStyles({badgeAlert,badgePresence})
  console.log({badgeAlert,badgePresence})
  return (
    <Box className={classes.root}>
        <Badge 
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot" {...props}
        >
          <Badge  badgeContent={badgeAlert || 0} color="secondary"
            anchorOrigin={{
              vertical:'top',
              horizontal:'left'
            }}
          >
            <Avatar style={{height:"1.75rem",width:"1.75rem"}} alt="Remy Sharp" src={img || "/profileImage.jpg"} />
          </Badge>
        </Badge>
    </Box>
  );
}



export default React.memo(BadgeAvatars)