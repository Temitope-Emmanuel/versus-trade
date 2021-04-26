import React from "react"
import {Box, IconButton} from "@material-ui/core"
import {makeStyles,createStyles} from "@material-ui/core/styles"
import Message from "./Message"
import { useAppSelector, useDispatch} from "store/hooks"
import { IAccount } from "core/models/Account"
import {useFirestore} from "react-redux-firebase"
import {addPreviousMessageHistory,clearChatNotification} from "store/chat/actions"
import {IoIosArrowUp} from "react-icons/io"
import {
    FixedSizeList as List
} from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

const useStyles = makeStyles((theme) => createStyles({
    root:{
        width:"100%",
        position:"relative",
        maxHeight:"70vh",
        height:"100%",
        overflowY:"auto",
        marginBottom:theme.spacing(2),
        // "& div":{
        //     overflowX:"hidden"
        // },
        // padding:theme.spacing(0,2),
        "&::-webkit-scrollbar": {
            width: "6px",
            overflow: "scroll",
            position: "absolute",
            color:"blue"
        },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgb(215, 218, 221)",
            // background:primary,
            borderRadius: "3px"
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            background: "rgba(116, 125, 131, 0.61)",
            boxShadow: "inset 0 0 6px rgba(215, 218, 221, 0.726)"
        },
        "& > div:nth-child(3)":{
            "& div":{
                "&::-webkit-scrollbar": {
                    width: "8px",
                    overflow: "scroll",
                    position: "absolute",
                    color:"blue",
                },
                "&::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 6px rgb(215, 218, 221)",
                    // background:primary,
                    borderRadius: "3px",
                    marginLeft:theme.spacing(2)
                },
                "&::-webkit-scrollbar-thumb": {
                    borderRadius: "10px",
                    background: "rgba(116, 125, 131, 0.61)",
                    boxShadow: "inset 0 0 6px rgba(215, 218, 221, 0.726)"
                }
            }
        },
        "& *":{
            scrollBehavior:"smooth"
        }
    },
    loadingIconContainer:{
        transition:"all .2s ease-in .12",
        top:"-10%",
        zIndex:1,
        position:"fixed"
    },
    showLoadingIcon:{
        top:"20%",
        opacity:1,
        visibility:"visible"
    },
    hideLoadingIcon:{
        top:"-10%",
        opacity:0,
        visibility:"hidden"
    },
    showMore:{
        position:"fixed",
        zIndex:10,
        left:"50%",
        top:"17.5%",
        transform:"translateX(50%)"
    },
    rotate:{
        display:"none"
    }
}))




interface IProps {
    currentChatProfile:IAccount
}

const ListMessage:React.FC<IProps> = ({currentChatProfile}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const boxContainerRef = React.useRef<HTMLDivElement|null>(null)
    const loader = React.useRef<HTMLDivElement|null>(null)
    const firestore = useFirestore()
    const messages = useAppSelector(state => state.chat.messages[currentChatProfile?.id]) || []
    const currentUser = useAppSelector((state) => state.firebase.profile)
    const messageListViewRef = React.useRef<HTMLDivElement>(null)
    const [lastTotalMessage,setLastTotalMessage] = React.useState(false)
    const listRef = React.useRef<any>(null)
    const [fetching,setFetching] =  React.useState(false)
    const currentChatRef = React.useRef<firebase.default.firestore.Query<firebase.default.firestore.DocumentData>>()
    const scrollBottom = () => {
        messageListViewRef.current?.scrollIntoView({behavior:"smooth"})
    }
    
    React.useEffect(() => {
        if( messages.length){
            const lastMessage = messages[messages.length-1]
            if(lastMessage.author.id === currentUser.id){
                listRef.current.scrollToItem(messages.length - 1)
            }else{
                // dispatch(addAlertNotification(messagesProfile.id))
            }
        }
    },[messages])

    React.useEffect(() => {
        if(currentChatProfile.id){
            currentChatRef.current = firestore.collection("users").doc(currentChatProfile.id)
            .collection("chatMessages").orderBy("createdAt","desc")
            dispatch(clearChatNotification(currentChatProfile.id))
        }
    },[currentChatProfile])

    const getMoreChats = () => {
        if(messages[0]){
            setFetching(true)
            currentChatRef.current.startAfter(messages[0].createdAt).limit(10).get().then(data => {
                new Promise((resolve,reject) => {
                    return setTimeout(() => {
                        resolve(setFetching(false))
                    },1000)
                }).then(() => {
                    if(!data.empty){
                        const result:any[] = []
                        data.docs.map(item => {
                            result.push({
                                id:item.id,
                                ...item.data() as any
                            })
                        })
                        dispatch(addPreviousMessageHistory(result.map(item => ({
                            ...item,
                            ownerIsCurrentUser:item.author.id === currentUser.id
                        })).reverse(),currentChatProfile.id))
                    }else{
                        setLastTotalMessage(true)
                    }
                })
            })
        }
    }

    const controlScroll = () => {
        if(listRef.current){
            (listRef.current as any).scrollToView(200)
        }
    }

    // entries: IntersectionObserverEntry[], observer: IntersectionObserver
    const handleObserver:IntersectionObserverCallback = (entity,observer) => {
        if(entity.length){
            const target = entity[0]
            if(!lastTotalMessage && target.isIntersecting && !fetching){
                getMoreChats()
            }
        }
    }

    React.useEffect(() => {
        const options:IntersectionObserverInit = {
            root:null,
            // rootMargin:"20px",
            threshold:.5
        }
        const observer = new IntersectionObserver(handleObserver,options)
        if(loader.current){
            observer.observe(loader.current)
        }
    },[])

    const Row:React.FC<{
        index:number;
        style:object
    }> = ({index,style}) => (
       <Message style={style} chat={messages[index]} />
    )

    return(
        <>
            <div className={classes.root} ref={boxContainerRef}>
                <IconButton className={`${classes.showMore} ${ !messages.length || lastTotalMessage || fetching ? classes.rotate:""}`}  
                    disabled={lastTotalMessage || fetching} onClick={getMoreChats}>
                    <IoIosArrowUp/>
                </IconButton>   
                <Box className={`refresher ${classes.loadingIconContainer} ${fetching ? classes.showLoadingIcon : classes.hideLoadingIcon}`}>
                    <Box className="loading-bar" />
                    <Box className="loading-bar" />
                    <Box className="loading-bar" />
                    <Box className="loading-bar" />
                </Box> 
                <Box className="w-full h-full -mt-3 pt-3">
                    <AutoSizer>
                        {({height,width}) => (
                            <Box >
                                <List ref={listRef} useIsScrolling itemCount={messages.length} width={width}
                                    height={height} itemSize={70}
                                >
                                    {Row}
                                </List>
                                <div ref={messageListViewRef} />
                            </Box>
                        )}
                    </AutoSizer>
                </Box>  
            </div>
        </>
    )
}

export default ListMessage