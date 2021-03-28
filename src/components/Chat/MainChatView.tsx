import React from "react"
import { Box, Typography, Slide, useTheme,useMediaQuery, createStyles, Tab, Tabs, Theme, withStyles } from "@material-ui/core"
import { Badge } from "components/Badge"
import { RiMore2Fill } from "react-icons/ri"
import TouchRipple from "@material-ui/core/ButtonBase"
import SwipeableViews from "react-swipeable-views"
import { SendMessageToUser } from "core/models/Chat"
import ListChat from "./ListChat"
import SendChat from "./SendMessage"
import { IAccount } from "core/models/Account"
import { IChat } from "core/models/Chat"

const chatList: SendMessageToUser[] = [
    {
        text: "This is the text1", id: "23o23jkn23", personId: "sdnlsdklsndjans",
        chatId: "sdmkkmsdweqw", when: new Date(), ownerIsCurrentUser: true
    },
    {
        text: "This is the text2", id: "23o23jkn223we3", personId: "sdnlsdklsndjans",
        chatId: "sdmkkmsdweqw", when: new Date(), ownerIsCurrentUser: false
    },
    {
        text: "This is the text3", id: "23o23jkn223wesdsd3", personId: "sdnlsdklsndjans",
        chatId: "sdmkkmsdweqw", when: new Date(), ownerIsCurrentUser: true
    },
    {
        text: "This is the text4", id: "23o23jkn223wwwee3", personId: "sdnlsdklsndjans",
        chatId: "sdmkkmsdweqw", when: new Date(), ownerIsCurrentUser: false
    },
    {
        text: "This is the text5", id: "23o23jkn223wsdsdsds1", personId: "sdnlsdklsndjans",
        chatId: "sdmkkmsdweqw", when: new Date(), ownerIsCurrentUser: true
    },
    {
        text: "This is the text6", id: "23o23jkn256wsdsds", personId: "sdnlsdklsndjans",
        chatId: "sdmkkmsdweqw", when: new Date(), ownerIsCurrentUser: false
    },
    {
        text: "This is the text7", id: "23o23jkn223wsds", personId: "sdnlsdklsndjans",
        chatId: "sdmkkmsdweqw", when: new Date(), ownerIsCurrentUser: true
    },
    {
        text: "This is the text8", id: "23jkn223wsdsds", personId: "sdnlsdklsndjans",
        chatId: "sdmkkmsdweqw", when: new Date(), ownerIsCurrentUser: false
    },
    {
        text: "This is the text9", id: "23o23jkn22dsds", personId: "sdnlsdklsndjans",
        chatId: "sdmkkmsdweqw", when: new Date(), ownerIsCurrentUser: true
    },
    {
        text: "This is the text10", id: "23o23jkn223wsdsds", personId: "sdnlsdklsndjans",
        chatId: "sdmkkmsdweqw", when: new Date(), ownerIsCurrentUser: true
    },
]

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


const MainChatView = () => {
    const [open, setOpen] = React.useState(false)
    const theme = useTheme()
    const [currentChat, setCurrentChat] = React.useState(0)
    const mediaQuery = useMediaQuery(theme.breakpoints.up("sm"))
    const toggleOpen = () => {
        setOpen(!open)
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index: number) => {
        setValue(index);
      };

    React.useEffect(() => {
        if(mediaQuery){
            setOpen(true)
        }else{
            setOpen(false)
        }
    },[mediaQuery])

      console.log(mediaQuery)
    


    const handleCurrentChat = (arg: number) => () => {
        setCurrentChat(arg)
    }

    const currentChatAccount: IChat = {
        id: currentChat.toString(),
        message: chatList,
        receiverId: "skalkslasklas"
    }

    const defaultUser: IAccount = {
        email: "temitopeojo0@gmail.com",
        profileImage: "/profileImage.jpg",
        providerData: [],
        role: "admin",
        createdAt: new Date(),
        id: "sdnksodisldjl"

    }

    return (
        <Box className="rounded-2xl overflow-hidden mx-auto shadow-xl flex">
            <Slide direction="right" in={open} mountOnEnter unmountOnExit>
                <Box className="mainChatListView relative w-2/6 mr-1">
                    <Box className="bg-blue-900 pl-5 py-3 flex items-center">
                        <Box className="flex items-center space-x-3">
                            <Badge />
                            <Typography className="font-medium text-white">
                                John Doe
                            </Typography>
                        </Box>
                    </Box>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0}>
                            <Box className="chatListContainer">
                                {[1, 2, 3, 4, 5, 6].map((item, idx) => (
                                    <TouchRipple className="w-full">
                                        <Box key={idx} className={
                                            `flex p-5 ml-0 w-full justify-start items-center  space-x-3 cursor-pointer
                                    ${currentChat === idx ? 'bg-blue-300' : 'hover:bg-gray-200 '} 
                                    `
                                        } onClick={handleCurrentChat(idx)}>
                                            <Badge className="ml-0" />
                                            <Box>
                                                <p className="font-semibold mb-1 text-lg font-raleway">
                                                    Frank Powell
                                        </p>
                                                <span className="text-black text-opacity-75 text-sm mt-1">
                                                    {(new Date()).toDateString().split(" ").join("/")}
                                                </span>
                                            </Box>
                                        </Box>
                                    </TouchRipple>
                                ))}
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {[1, 2].map((item, idx) => (
                                <TouchRipple className="w-full">
                                    <Box key={idx} className={
                                        `flex p-5 ml-0 w-full justify-start items-center  space-x-3 cursor-pointer
                                    ${currentChat === idx ? 'bg-blue-300' : 'hover:bg-gray-200 '} 
                                    `
                                    } onClick={handleCurrentChat(idx)}>
                                        <Badge className="ml-0" />
                                        <Box>
                                            <p className="font-semibold mb-1 text-lg font-raleway">
                                                Frank Powell
                                        </p>
                                            <span className="text-black text-opacity-75 text-sm mt-1">
                                                {(new Date()).toDateString().split(" ").join("/")}
                                            </span>
                                        </Box>
                                    </Box>
                                </TouchRipple>
                            ))}
                        </TabPanel>

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
            <Box className="flex-1 chatMessageView bg-gray-100">
                <Box className="bg-blue-900 py-3 p-5 flex items-center">
                    <Box className="flex justify-between items-center w-full">
                        <Box className="flex items-center space-x-3">
                            <Badge />
                            <Typography className="font-medium text-white">
                                Frank Powell
                            </Typography>
                        </Box>
                        <TouchRipple>
                            <RiMore2Fill onClick={toggleOpen} className={
                                `text-2xl cursor-pointer text-gray-400 hover:text-gray-900`
                            } />
                        </TouchRipple>
                    </Box>
                </Box>
                <Box>
                    <ListChat currentChat={currentChatAccount} />
                    <SendChat currentChatAccount={defaultUser} />
                </Box>
            </Box>
        </Box>
    )
}



export default MainChatView