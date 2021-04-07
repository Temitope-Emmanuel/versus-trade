import React from "react"
import {Box} from "@material-ui/core"
import {makeStyles,createStyles} from "@material-ui/core/styles"
import {ChatMessage} from "core/models/ChatMessage"
import Message from "./Message"
import { useAppSelector, useDispatch} from "store/hooks"
import {addAlertNotification} from "store/chat/actions"
import { useAlertService } from "core/utils/Alert/AlertContext"

const useStyles = makeStyles((theme) => createStyles({
    root:{
        width:"100%",
        maxHeight:"70vh",
        height:"100%",
        overflowY:"auto",
        marginBottom:theme.spacing(2),
        padding:theme.spacing(0,2)
    }
}))




interface IProps {
    currentChat:ChatMessage[]
}

const ListMessage:React.FC<IProps> = ({currentChat}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const toast = useAlertService()
    const currentChatProfile = useAppSelector((state) => state.chat.currentChatProfile)
    const currentUser = useAppSelector((state) => state.firebase.profile)
    const messageListViewRef = React.useRef<HTMLDivElement>(null)
    const [lastMember,setLastMember] = React.useState<ChatMessage>()
    const scrollBottom = () => {
        messageListViewRef.current?.scrollIntoView({behavior:"smooth"})
    }
    
    React.useEffect(() => {
        const lastMemberNow = currentChat[currentChat.length-1]
        if( currentChat.length >= 1 && lastMember?.id !== lastMemberNow.id){
            if(lastMemberNow.author.id === currentUser.id){
                scrollBottom()
                setLastMember(currentChat[currentChat.length-1])
            }else{
                dispatch(addAlertNotification(currentChatProfile.id))
            }
        }
    },[currentChat])
    
    return(
        <>
            <Box className={classes.root}>
                {
                    currentChat.map((item) => (
                        <Message key={item.id} chat={item} />
                        ))
                    }    
                <div id="bottom-div" key={"sdmsdlksd"} ref={messageListViewRef} />
            </Box>
        </>
    )
}

export default ListMessage