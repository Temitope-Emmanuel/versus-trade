import React from "react"
import {Box} from "@material-ui/core"
import {makeStyles,createStyles} from "@material-ui/core/styles"
import { IAccount } from "core/models/Account"
import {IChat} from "core/models/Chat"
import Message from "./Message"
import { useDispatch, useAppSelector } from "store/hooks"
import {AppState} from "store"
import { useAlertService } from "core/utils/Alert/AlertContext"

const useStyles = makeStyles((theme) => createStyles({
    root:{
        width:"100%",
        maxHeight:"70vh",
        overflowY:"scroll",
        marginBottom:theme.spacing(2),
        padding:theme.spacing(0,3)
    }
}))




interface IProps {
    currentChat:IChat
}

const ListMessage:React.FC<IProps> = ({currentChat}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const dialog = useAlertService()
    // const currentMessage = useAppSelector((state:AppState) => state.firestore.chats)
    const messageListViewRef = React.useRef<HTMLDivElement>(null)
    
    const scrollBottom = () => {
        messageListViewRef.current?.scrollIntoView({behavior:"smooth"})
    }
    
    React.useEffect(() => {
    },[])

    // React.useEffect(() => {
    //     if(currentMessage[currentMessage.length - 1] && currentMessage[currentMessage.length - 1].ownerIsCurrentUser){
    //         scrollBottom()
    //     }
    // },[currentMessage])

    return(
        <Box className={classes.root}>
            {
                currentChat.message.map((item) => (
                    <Message key={item.id} chat={item} />
                    ))
                }    
            <div ref={messageListViewRef} />
        </Box>
    )
}

export default ListMessage