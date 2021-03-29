import React from "react"
import {Box} from "@material-ui/core"
import {DashboardLayout} from "layouts"
import {MainChatView} from "components/Chat"


const Chat = () => {
    return(
        <DashboardLayout>
            <Box className="mx-auto max-w-4xl">
                <MainChatView/>
            </Box>
        </DashboardLayout>
    )
}


export default Chat