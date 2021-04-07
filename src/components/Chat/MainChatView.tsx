import React from "react"
import { Box,makeStyles, Typography, Slide, useTheme,useMediaQuery,Grow, createStyles, Tab, Tabs, Theme, withStyles } from "@material-ui/core"
import { Badge } from "components/Badge"
import { RiMore2Fill } from "react-icons/ri"
import TouchRipple from "@material-ui/core/ButtonBase"
import SwipeableViews from "react-swipeable-views"
import ListChat from "./ListChat"
import SendChat from "./SendMessage"
import { IAccount } from "core/models/Account"
import {BiStar} from "react-icons/bi"
import {BsStarFill} from "react-icons/bs"
import { useAppSelector,useDispatch } from "store/hooks"
import {isEmpty, useFirebase} from "react-redux-firebase"
import {SendMessageToUser} from "core/models/Chat"
import {ChatMessage} from "core/models/ChatMessage"
import {setChatProfile,loadAllChatMessage,addChatMessage,clearChatMessage} from "store/chat/actions"
import { useAlertService } from "core/utils/Alert/AlertContext"


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}


function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


interface StyledTabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    },
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

interface StyledTabProps {
    label: string;
}

const StyledTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textTransform: 'none',
            color: '#fff',
            fontWeight: theme.typography.fontWeightRegular,
            fontSize: theme.typography.pxToRem(15),
            marginRight: theme.spacing(1),
            '&:focus': {
                opacity: 1,
            },
        },
    }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => createStyles({
    root:{},
    favoriteContainer:{
        height:"2rem",
        width:"2rem",
        "& > *" :{
            margin:"auto",
            top:0,
            bottom:0,
            right:0,
            left:0
        }
    }
}))

const MainChatView = () => {
    const theme = useTheme()
    const classes = useStyles()
    const firebase = useFirebase()
    const dispatch = useDispatch()
    const dialog = useAlertService()
    const [open, setOpen] = React.useState(false)
    const [favorite,setFavorite] = React.useState(false)
    const currentUser = useAppSelector(state => state.firebase.profile)
    const currentChatProfile = useAppSelector(state => state.chat.currentChatProfile)
    const mediaQuery = useMediaQuery(theme.breakpoints.up("sm"))
    const [chatList,setChatList] = React.useState<IAccount[]>([])
    const currentMessages = useAppSelector((state) => state.chat.currentMessages)
    const [messages,setMessage] = React.useState<ChatMessage[]>([])
    const chatMessage = useAppSelector(state => state.firestore.data.messages)
    const listener:any[] = []
    const toggleOpen = () => {
        setOpen(!open)
    }

    const getAllAvailableChat = async () => {
        const response = await firebase.firestore().collection("users")
        .where("hasChat","==",true)
        .orderBy("createdAt")
        .get()
        if(!response.empty){
            const result = [];
            response.docs.map(item => {
                result.push({
                    id:item.id,
                    ...item.data()
                })
            })
            setChatList(result)
        }
    }


    React.useEffect(() => {
        return () => {
            listener.map(item => {
                item()                
            })
        }
    },[])

    React.useEffect(() => {
        if(currentUser && currentUser.role === "admin"){
            setOpen(true)
            getAllAvailableChat()
        }else{
            setOpen(false)
            dispatch(setChatProfile(currentUser as unknown as IAccount))
        }
    },[currentUser])

    React.useEffect(() => {
        const getCurrentUserChat = async () => {
            const chatResponse = firebase.firestore().collection("users").doc(currentChatProfile.id)
            .collection("chatMessages").orderBy("createdAt").onSnapshot((docs) => {
                if(!docs.empty){
                    const result = []
                    // docs.docChanges().forEach((change) => {
                    //     console.log({type:change.type})
                    //     if(change.type === "added"){
                    //         change.doc.data().createdAt && result.push({
                    //             ...change.doc.data(),
                    //             id:change.doc.id,
                    //             ownerIsCurrentUser:currentUser.id === change.doc.data().author.id
                    //         })
                    //     }
                    //     else if(change.type === "modified"){
                    //         const result = change.doc.data().createdAt && {
                    //             ...change.doc.data(),
                    //             id:change.doc.id,
                    //             ownerIsCurrentUser:currentUser.id === change.doc.data().author.id
                    //         }
                    //         console.log({result})
                    //     }
                    // })
                    // if(result.length === 1){
                    //     // dispatch(addChatMessage(result[0],toast))
                    // }else{
                        docs.forEach(item => {
                            console.log("This is ant item")
                            // if(item.data().createdAt){
                                result.push({
                                    ...item.data(),
                                    id:item.id,
                                    ownerIsCurrentUser:currentUser.id === item.data().author.id
                                })
                            // }
                        })
                        setMessage(result)
                        // dispatch(loadAllChatMessage(result))
                    // }
                }
            })
            listener.push(chatResponse)
        }
        if(currentChatProfile.id){
            getCurrentUserChat()
        }
    },[currentChatProfile])

    const handleChatProfileUpdate = (arg:IAccount) => () => {
        if(arg.id !== currentChatProfile.id){
            dispatch(clearChatMessage())
            dispatch(setChatProfile(arg))
        }
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index: number) => {
        setValue(index);
      };

    const handleFavoriteToggle = () => {
        setFavorite(!favorite)
    }

    React.useEffect(() => {
        if(currentUser.role === "admin"){
            if(mediaQuery){
                setOpen(true)
            }else{
                setOpen(false)
            }
        }
    },[mediaQuery])

    const handleCurrentChat = (arg: IAccount) => () => {
        dispatch(setChatProfile(arg))
    }

    const defaultUser: IAccount = {
        email: "temitopeojo0@gmail.com",
        profileImage: "/profileImage.jpg",
        providerData: [],
        role: "admin",
        id: "sdnksodisldjl"

    }
    return (
        <Box className="rounded-2xl overflow-hidden mx-auto shadow-xl flex">
            <Slide direction="right" in={open} mountOnEnter unmountOnExit>
                <Box className="mainChatListView relative w-2/6 mr-1">
                    <Box className="bg-blue-900 px-3 py-2 flex items-center justify-between">
                        <Box className="flex items-center space-x-3">
                            <Badge img={currentUser.profileImage} />
                            <Typography className="font-medium text-white">
                                {currentUser.email}
                            </Typography>
                        </Box>
                        <Box className={`relative flex ${classes.favoriteContainer}`}>
                            <Grow mountOnEnter unmountOnExit in={favorite} timeout={{enter:500}} >
                                <BsStarFill onClick={handleFavoriteToggle} className="text-3xl absolute cursor-pointer"/>
                            </Grow>
                            <Grow mountOnEnter unmountOnExit in={!favorite} timeout={{enter:500}} >
                                <BiStar onClick={handleFavoriteToggle} className="text-3xl absolute cursor-pointer"/>
                            </Grow>
                        </Box>
                    </Box>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0}>
                            <Box className="chatListContainer">
                                {chatList.map((item, idx) => (
                                    <TouchRipple key={idx} className="w-full">
                                        <Box className={
                                            `flex p-3 ml-0 w-full justify-start items-center  space-x-2 cursor-pointer
                                    ${currentChatProfile.id === item.id ? 'bg-blue-300' : 'hover:bg-gray-200 '} 
                                    `
                                        } onClick={handleChatProfileUpdate(item)}>
                                            <Badge img={item.profileImage} className="ml-0" />
                                            <Box>
                                                <p className="font-semibold mb-1 text-lg font-raleway">
                                                    {item.email}
                                                </p>
                                                <span className="text-black text-opacity-75 text-sm mt-1">
                                                    {(item.createdAt as any).toDate().toTimeString()}
                                                </span>
                                            </Box>
                                        </Box>
                                    </TouchRipple>
                                ))}
                            </Box>
                        </TabPanel>
                        {
                            currentUser.role === "admin" &&
                        <TabPanel value={value} index={1}>
                            {chatList.map((item, idx) => (
                                <TouchRipple key={idx} className="w-full">
                                    <Box className={
                                        `flex p-3 ml-0 w-full justify-start items-center  space-x-2 cursor-pointer
                                    ${currentChatProfile.id === item.id ? 'bg-blue-300' : 'hover:bg-gray-200 '} 
                                    `
                                    } onClick={handleCurrentChat(item)}>
                                        <Badge img={item.profileImage} className="ml-0" />
                                        <Box>
                                            <p className="font-semibold mb-1 text-lg font-raleway">
                                                {item.email}
                                        </p>
                                            <span className="text-black text-opacity-75 text-sm mt-1">
                                                {(item.createdAt as any).toDate().toTimeString()}
                                            </span>
                                        </Box>
                                    </Box>
                                </TouchRipple>
                            ))}
                        </TabPanel>
                        }
                    </SwipeableViews>
                    <div className="bg-blue-900 absolute bottom-0 w-full">
                        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
                            <StyledTab label="All" />
                            <StyledTab label="Starred" />
                        </StyledTabs>
                        <Typography className="p-3" />
                    </div>
                </Box>
            </Slide>
            <Box className="flex-1 relative chatMessageView bg-gray-100">
                <div className={`
                absolute w-full h-full bg-black bg-opacity-10
                 z-50 justify-center items-center
                 ${currentUser.role === "admin" && !currentChatProfile.id ? "flex" : "hidden"}
                 `}
                >
                    <h4 className="text-lg text-black">
                        Please Select a Chat to Continue
                    </h4>
                </div>
                <Box className="bg-blue-900 py-2 p-5 flex items-center">
                    <Box className="flex justify-between items-center w-full">
                        {
                            currentChatProfile && <Box className="flex items-center space-x-3">
                            <Badge img={currentChatProfile.profileImage} />
                            <Typography className="font-medium text-white">
                               {currentChatProfile.email}
                            </Typography>
                        </Box>
                        }
                        {
                            currentUser.role === "admin" &&
                        <TouchRipple>
                            <RiMore2Fill onClick={toggleOpen} className={
                                `text-2xl cursor-pointer text-gray-400 hover:text-gray-900`
                            } />
                        </TouchRipple>
                        }
                    </Box>
                </Box>
                <Box className="flex flex-col justify-center items-center" style={{height:"65vh"}}>
                {
                    currentUser.role === "admin" ? 
                    <ListChat currentChat={messages} /> :
                    currentUser.hasChat ? 
                    <>
                        <ListChat currentChat={messages} />
                    </>
                    :
                    <>
                    <Typography>
                        Send a message to begin a transaction
                    </Typography>
                    </>
                }
                <SendChat currentChatAccount={defaultUser} />
                </Box>
            </Box>
        </Box>
    )
}

export default MainChatView