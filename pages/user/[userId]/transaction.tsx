import React from "react"
import {Typography,Box,useMediaQuery,useTheme,Avatar,Checkbox} from "@material-ui/core"
import {DashboardLayout} from "layouts"
import {TableCell,Table,TableRow} from "components/Table"

const Transaction = () => {

    const theme = useTheme()
    const mediaQuery = useMediaQuery(theme.breakpoints.up("sm"))

    const sizeStyles = mediaQuery ? {width:"2rem",height:"2rem"} : {width:"4rem",height:"4rem"}
    
    const defaultMemberReport = [
        <Checkbox/>,<Avatar alt="Dan Abrahmov" style={sizeStyles} src="https://bit.ly/dan-abramov" />,
        "Bismark Achodo","achodobismark@gmail.com","09072235895","21-5-2020","2000"
    ]
    const demoMemberReport: any[] = new Array(10).fill(defaultMemberReport)
    
    return(
        <DashboardLayout>
            <Typography>
                Show A list of all Available Transaction
            </Typography>
            <Table rowLength={demoMemberReport.length} heading={[null,null,"Name","Email","Phone","Date","Amount"]}>
                                    {demoMemberReport.map((item,idx) => (
                                        <TableRow key={idx} isLoaded={true} fields={item} />
                                    ))}
                                </Table>
        </DashboardLayout>
    )
}

export default Transaction