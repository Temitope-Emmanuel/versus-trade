import React from "react"
import Link from "next/link"
import {useRouter} from "next/router"
import { Typography, useMediaQuery, useTheme, IconButton, Checkbox } from "@material-ui/core"
import { DashboardLayout } from "layouts"
import { Table, TableRow } from "components/Table"
import { useFirestore } from "react-redux-firebase"
import { Transaction as TransactionModel } from "core/models/Transaction"
import {IoIosArrowForward} from "react-icons/io"


const Transaction = () => {
    const firestore = useFirestore()
    const router = useRouter()
    const [transactions,setTransactions] = React.useState<TransactionModel[]>([])
    const listeners:any[] = []

    React.useEffect(() => {
        const getTransactionList = async () => {
            const responseListeners = firestore.collectionGroup("transactions").orderBy("createdAt").onSnapshot(snap => {
                if(!snap.empty){
                    const result:any[] = []
                    snap.docs.map(item => {
                        result.push({
                            id:item.id,
                            ...item.data()
                        })
                    })
                    setTransactions(result)
                }
            })
            listeners.push(responseListeners)
        }
        getTransactionList()
        return () => {
            listeners.map(item => {
                item()
            })
        }
    },[])

    console.log({transactions})


    const theme = useTheme()
    const mediaQuery = useMediaQuery(theme.breakpoints.up("sm"))

    const sizeStyles = mediaQuery ? { width: "2rem", height: "2rem" } : { width: "4rem", height: "4rem" }
    



    return (
        <DashboardLayout>
            <Typography>
                Show A list of all Available Transaction
            </Typography>
            <Table rowLength={transactions.length} heading={[null, "Type", "Owner", "Status", "Date", "Amount",""]}>
                {transactions.map((item, idx) => (
                    <TableRow key={idx} isLoaded={true}
                        fields={
                            [
                                <Checkbox />,
                                item.type, item.user.username || item.user.email, item.status,((item.createdAt as any)?.toDate() as Date).toLocaleTimeString(),
                                item.requestedAmount,
                                <Link href={`/transaction/${item.id}`}>
                                    <IconButton aria-label="personal transaction">
                                        <IoIosArrowForward/>
                                    </IconButton>
                                </Link>
                            ]
                        } />
                ))}
            </Table>
        </DashboardLayout>
    )
}

export default Transaction