import React from "react"
import {
    Box, makeStyles, Typography, Slide,
    useTheme, useMediaQuery, Grow, createStyles,
    Tab, Tabs, Theme, withStyles
} from "@material-ui/core"
import { Badge } from "components/Badge"
import { RiMore2Fill } from "react-icons/ri"
import TouchRipple from "@material-ui/core/ButtonBase"
import SwipeableViews from "react-swipeable-views"
import ListChat from "./ListChat"
import SendChat from "./SendMessage"
import { IAccount } from "core/models/Account"
import { BiStar } from "react-icons/bi"
import { BsStarFill } from "react-icons/bs"
import { useAppSelector, useDispatch } from "store/hooks"
import {ProfileCard} from "components/Cards"
import { useFirebase, useFirebaseConnect } from "react-redux-firebase"
import {
    setChatProfile, setChatList, addSingleChatMessage,
    addCurrentMessageHistory
} from "store/chat/actions"
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
    root: {
        position: "relative"
    },
    chatListContainer: {
        position: "relative",
        zIndex: 2
    },
    favoriteContainer: {
        height: "2rem",
        width: "2rem",
        "& > *": {
            margin: "auto",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        }
    }
}))

const MainChatView = () => {
    useFirebaseConnect(() => ([
        {
            path:"presence"
        }
    ]))
    const theme = useTheme()
    const classes = useStyles()
    const firebase = useFirebase()
    const dispatch = useDispatch()
    const dialog = useAlertService()
    const [open, setOpen] = React.useState(false)
    const [userPresence,setUserPresence] = React.useState<string[]>([])
    const [userAlert,setUserAlert] = React.useState<string[]>([])
    const [favorite,setFavorite] = React.useState(false)
    const currentUser = useAppSelector(state => state.firebase.profile)
    const presence = useAppSelector(state => state.firebase.ordered.presence) || []
    const alerts = useAppSelector(state => state.chat.alerts)
    const currentChatProfile = useAppSelector(state => state.chat.currentChatProfile)
    const allMessages = useAppSelector(state => state.chat.messages) || []
    const chatList = useAppSelector(state => state.chat.chatList)
    const mediaQuery = useMediaQuery(theme.breakpoints.up("sm"))
    const listener: any[] = []
    const toggleOpen = () => {
        setOpen(!open)
    }

    const getAllAvailableUserChat = async () => {
        const response = await firebase.firestore().collection("users")
            .where("hasChat", "==", true)
            .orderBy("createdAt")
            .onSnapshot(docs => {
                console.log("Called")
                if (!docs.empty) {
                    const result = []
                    docs.docs.map(item => {
                        result.push({
                            id: item.id,
                            ...item.data()
                        })
                    })
                    dispatch(setChatList(result))
                }
            })
        listener.push(response)
    }

    const getCurrentChat = async () => {
        const allAvailableChat = Object.keys(allMessages)
        if (allAvailableChat.includes(currentChatProfile.id)) {
        } else {
            // First create a reference to be used later    
            const currentUserRef = firebase.firestore().collection("users").doc(currentChatProfile.id)
                .collection("chatMessages").orderBy("createdAt")

            // Then get all chat within a specified time
            currentUserRef.limitToLast(10).get().then(payload => {
                let lastChat: any;
                if (!payload.empty) {
                    const result: any[] = []
                    payload.docs.map(item => {
                        lastChat = item
                        result.push({
                            id: item.id,
                            ...item.data() as any
                        })
                    })
                    dispatch(addCurrentMessageHistory(result.map(item => ({
                        ...item,
                        ownerIsCurrentUser: item.author.id === currentUser.id
                    }))))
                }
                return lastChat
            }).then((lastMessage) => {
                let chatResponse;
                // Check if this is the first message sent ever
                if (lastMessage) {
                    chatResponse = currentUserRef.startAfter(lastMessage).onSnapshot(docs => {
                        if (!docs.empty) {
                            const result:any[] = []
                            docs.docChanges().forEach(items => {
                                if(!items.doc.metadata.hasPendingWrites){
                                    const chatId = items.doc.ref.path.split("/")[1]
                                    const newMessage = {
                                        chat: chatId,
                                        newMessage: {
                                            id: items.doc.id,
                                            ownerIsCurrentUser: items.doc.data().author.id === currentUser.id,
                                            ...items.doc.data() as any
                                        }
                                    }
                                    if (items.type === "added") {
                                        if(!result.find(item => item.id === newMessage.newMessage.id)){
                                            result.push(newMessage)
                                        }
                                    } else if (items.type === "modified") {
                                        if(!result.find(item => item.id === newMessage.newMessage.id)){
                                            result.push(newMessage)
                                        }
                                    }
                                }
                            })
                            result.map(item => {
                                dispatch(addSingleChatMessage(item))
                            })
                        }
                    })
                    listener.push(chatResponse)
                } else {
                    chatResponse = currentUserRef.onSnapshot(docs => {
                        if (!docs.empty) {
                            const result:any[] = []
                            docs.docChanges().forEach(items => {
                                if(!items.doc.metadata.hasPendingWrites){
                                    const chatId = items.doc.ref.path.split("/")[1]
                                    const newMessage = {
                                        chat: chatId,
                                        newMessage: {
                                            id: items.doc.id,
                                            ownerIsCurrentUser: items.doc.data().author.id === currentUser.id,
                                            ...items.doc.data() as any
                                        }
                                    }
                                    if (items.type === "added") {
                                        if(!result.find(item => item.id === newMessage.newMessage.id)){
                                            result.push(newMessage)
                                        }
                                    } else if (items.type === "modified") {
                                        if(!result.find(item => item.id === newMessage.newMessage.id)){
                                            result.push(newMessage)
                                        }
                                    }
                                }
                            })
                            result.map(item => {
                                dispatch(addSingleChatMessage(item))
                            })
                        }
                    })
                    listener.push(chatResponse)
                }
            })
        }
    }


    React.useEffect(() => {
        return () => {
            listener.map(item => {
                item()
            })
        }
    }, [])
    
    React.useEffect(() => {
        const newPresence = presence.map(item => item.key)
        setUserPresence(newPresence)
    },[presence])
    
    React.useEffect(() => {
        // const newAlert = alerts.ma
    },[alerts])

    React.useEffect(() => {
        const allList = [...chatList.favorite,...chatList.normal]
        if(allList.length && currentChatProfile.id){
            const foundIdx = allList.findIndex(item => item.id === currentChatProfile.id)
            setFavorite(allList[foundIdx].favorite)
        }
    },[chatList])

    React.useEffect(() => {
        if(currentUser.isLoaded){
            if (currentUser.role === "admin") {
                setOpen(true)
                getAllAvailableUserChat()
            } else {
                setOpen(false)
                dispatch(setChatProfile(currentUser as unknown as IAccount))
            }
        }
    }, [currentUser])

    React.useEffect(() => {
        if (currentChatProfile.id) {
            getCurrentChat()
        }
    }, [currentChatProfile])

    const handleChatProfileUpdate = (arg: IAccount) => () => {
        if (arg.id !== currentChatProfile.id) {
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

    React.useEffect(() => {
        if (currentUser.role === "admin") {
            if (mediaQuery) {
                setOpen(true)
            } else {
                setOpen(false)
            }
        }
    }, [mediaQuery])
    

    const setToFavorite = async () => {
        firebase.firestore().collection("users")
            .doc(currentChatProfile.id)
            .update({ favorite: !favorite }).then(() => {
                setFavorite(!favorite)
            }).catch(err => {
                dialog({
                    type: "error",
                    message: `Error:${err.message}`,
                    title: "Something went wrong"
                })
            })
    }


    return (
        <Box className="rounded-2xl overflow-hidden mx-auto shadow-xl flex">
            <Slide direction="right" in={open} mountOnEnter unmountOnExit>
                <Box className="mainChatListView relative w-2/6 mr-1">
                    <Box className="bg-blue-900 px-3 py-3 flex items-center justify-between">
                        <Box className="flex items-center space-x-3">
                            <Typography className="text-white">
                                {currentUser.email}
                            </Typography>
                        </Box>
                    </Box>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0}>
                            <Box className={classes.chatListContainer}>
                                {chatList.normal.map((item, idx) => (
                                    <ProfileCard active={currentChatProfile.id === item.id} key={item.id}
                                    online={userPresence.includes(item.id)} alert={alerts?.[item.id]}
                                    updateChatProfile={handleChatProfileUpdate} userProfile={item}
                                    />
                                ))}
                            </Box>
                        </TabPanel>
                        {
                            currentUser.role === "admin" &&
                            <TabPanel value={value} index={1}>
                                {chatList.favorite.map((item, idx) => (
                                    <ProfileCard active={currentChatProfile.id === item.id} key={item.id}
                                    online={userPresence.includes(item.id)} alert={alerts?.[item.id]}
                                        updateChatProfile={handleChatProfileUpdate} userProfile={item}
                                    />
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
                    <h4 className="text-black">
                        Please Select a Chat to Continue
                    </h4>
                </div>
                <Box className="bg-blue-900 py-3 p-5 flex items-center">
                    <Box className="flex justify-between items-center w-full">
                        {
                            currentChatProfile.id && 
                            <>
                            <Box className="flex items-center space-x-3">
                                <Badge img={currentChatProfile.profileImage}
                                    badgePresence={userPresence.includes(currentChatProfile.id)}
                                />
                                <Typography className="font-medium text-white">
                                    {currentChatProfile.email}
                                </Typography>
                            </Box>
                            {
                                currentUser.role === "admin" &&
                                <Box onClick={setToFavorite}
                                    className={`relative flex ${classes.favoriteContainer}`}>
                                    <Grow mountOnEnter unmountOnExit in={!favorite} timeout={{ enter: 500 }} >
                                        <BiStar className="text-xl absolute cursor-pointer" />
                                    </Grow>
                                    <Grow mountOnEnter unmountOnExit in={favorite} timeout={{ enter: 500 }} >
                                        <BsStarFill className="text-xl absolute cursor-pointer" />
                                    </Grow>
                                </Box>
                            }
                            </>
                        }
                        {
                            currentUser.role === "admin" &&
                            <div className="mr-0 ml-auto">
                                <TouchRipple >
                                    <RiMore2Fill onClick={toggleOpen} className={
                                        `text-2xl cursor-pointer text-gray-400 hover:text-gray-900`
                                    } />
                                </TouchRipple>
                            </div>
                        }
                        
                    </Box>
                </Box>
                <Box className="flex flex-col justify-center items-center" style={{ height: "65vh" }}>
                    {/* {
                        currentUser.role === "admin" ?
                            <ListChat currentChatProfile={currentChatProfile} /> :
                            currentUser.hasChat ?
                                <>
                                </>
                                :
                                <>
                                    <Typography>
                                        Send a message to begin a transaction
                                    </Typography>
                                </>
                    } */}
                    <ListChat currentChatProfile={currentChatProfile} />
                    <SendChat />
                </Box>
            </Box>
        </Box>
    )
}

export default MainChatView