import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Link from "next/link"
import {Badge, Chip, List, Menu, MenuItem, Typography,Divider} from "@material-ui/core"
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {HiMenu, HiOutlineMail} from "react-icons/hi"
import {IoIosArrowBack,IoIosArrowForward, IoIosNotifications, IoMdSettings} from "react-icons/io"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { FaPowerOff } from 'react-icons/fa';
import {RiAccountPinCircleFill} from "react-icons/ri"
import {BsFillPeopleFill} from "react-icons/bs"
import { useAppSelector } from 'store/hooks';
import { useRouter } from 'next/router';
import { useAlertService } from 'core/utils/Alert/AlertContext';
import {useFirebase} from "react-redux-firebase"
import {AiOutlineWechat} from "react-icons/ai"
import {GrTransaction} from "react-icons/gr"
import {FaUserAlt} from "react-icons/fa"
import TouchRipple from "@material-ui/core/ButtonBase"


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor:"white",
      color:"black",
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      "& > *":{
        backgroundImage:`linear-gradient(rgba(34, 42, 69, 0.65), rgba(34, 42, 69, 0.96)), url(/sidebar/sidebar-bg-light.jpg)`,
        backgroundSize:"cover",
        backgroundPosition:"center top",
        backgroundRepeat:"no-repeat",
        color:"white",
        "& svg":{
            fontSize:"1.75rem",
            color:"white"
        }
      }
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    sectionDesktop: {
        display: 'none',
        marginLeft:"auto",
        alignItems:"center",
        [theme.breakpoints.up('sm')]: {
          display: 'flex',
        }
      },
      chipContainer:{
        "&:hover":{
        cursor:"pointer"
        },
        "& > svg":{
          fontSize:"1.5rem"
        }
      }
  }),
);


const DashboardMenu = [
    {
      name:"Chat",
      link:"chat",
      icon:<AiOutlineWechat/>,
      show:["user","admin"]
    },
    {
      name:"Transaction",
      link:"transaction",
      icon:<GrTransaction/>,
      show:["admin"]
    },
    {
      name:"User",
      link:"users",
      icon:<FaUserAlt/>,
      show:["admin"]
    }
  ]


const MiniDrawer:React.FC<{}> = ({children}) => {
  const classes = useStyles();
  const theme = useTheme();
  const firebase = useFirebase()
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const currentUser = useAppSelector(state => state.firebase.profile)
  const alerts = useAppSelector(state => state.chat.alerts)
  const router = useRouter()
  const dialog = useAlertService()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    const getMessage = () => {
      const messaging = (firebase as any).messaging()
      messaging.onMessage(message => {
        console.log({
          message
        })
        dialog({
          title:"A message has been received",
          message:message.notification.body,
          type:"info"
        })
      })
    }

    getMessage()
  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  

  const handleLogout = () => {
    firebase.logout().then(() => {
      router.push("/")
      handleMenuClose()
      dialog({
        message:"Sign out successful",
        type:"info",
        title:""
      })
    }).catch(err => {
      dialog({
        message:`Error:${err.message}`,
        title:"Sign out Failed",
        type:"info",
      })
    })
  }


  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem className="text-gray" onClick={handleMenuClose}>
        <ListItemIcon>
          <AiFillHome/>
        </ListItemIcon>
        <Typography>
          Home
        </Typography>
      </MenuItem>
      <MenuItem className="text-gray" onClick={handleMenuClose}>
        <ListItemIcon>
          <BsFillPeopleFill/>
        </ListItemIcon>
        <Typography>
            Profile
        </Typography>
      </MenuItem>
      <MenuItem className="text-gray" onClick={handleMenuClose}>
        <ListItemIcon>
          <IoMdSettings/>
        </ListItemIcon>
        <Typography>
          Setting
        </Typography>
      </MenuItem>
      <MenuItem className="text-gray" onClick={handleLogout}>
        <ListItemIcon>
          <FaPowerOff/>
        </ListItemIcon>
        <Typography>
          Logout
        </Typography>
      </MenuItem>
    </Menu>
  );

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  
  if(!currentUser.isLoaded) return <div>Loading...</div>
  

  return (
    <div className={classes.root}>
        <AppBar position="fixed" elevation={2}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <HiMenu />
          </IconButton>
            <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <IoIosNotifications />
              </Badge>
            </IconButton>
            <Chip size="medium" 
              onClick={handleProfileMenuOpen}
            className={classes.chipContainer} deleteIcon={
              <RiAccountPinCircleFill/>
            } label={`Hi, ${currentUser?.email}`} onDelete={handleClick} />
            {renderMenu}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </IconButton>
        </div>
        <Divider/>
        <List className="flex flex-col">
          {DashboardMenu.map((item, index) => (
            <TouchRipple key={item.name} style={{display:item.show.includes(currentUser.role) ? "initial" : "none"}}>
              <Link href={`/user/${router.query.userId}/${item.link}`}>
                  <ListItem button>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
              </Link>
            </TouchRipple>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default MiniDrawer