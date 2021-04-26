import { Box,Typography } from "@material-ui/core"
import { Badge } from "components/Badge"
import { IAccount } from "core/models/Account"
import TouchRipple from "@material-ui/core/ButtonBase"
import React from "react"


interface IProps {
    active: boolean;
    alert:number;
    online:boolean;
    userProfile: IAccount;
    updateChatProfile: (arg: IAccount) => () => void
}


const ProfileCard: React.FC<IProps> = ({
    active,alert,online, updateChatProfile, userProfile
}) => {
    return (
        <TouchRipple className="w-full">
            <Box className={
                `flex p-2 ml-0 w-full justify-start items-center  space-x-2 cursor-pointer
                                    ${active ? 'bg-blue-300' : 'hover:bg-gray-200 '} 
                                    `
            } onClick={updateChatProfile(userProfile)}>
                <Badge img={userProfile.profileImage} color="primary"
                 className="ml-0" badgeAlert={alert} badgePresence={online} />
                <Box>
                    <Typography className="font-semibold mb-1 font-raleway" noWrap>
                        {userProfile.email}
                    </Typography>
                </Box>
            </Box>
        </TouchRipple>
    )
}

export default React.memo(ProfileCard)