import React from "react"
import {useRouter} from "next/router"
import { Typography, useMediaQuery, useTheme, IconButton, Checkbox } from "@material-ui/core"
import { DashboardLayout } from "layouts"
import { Table, TableRow } from "components/Table"
import { useFirestore } from "react-redux-firebase"
import { Transaction as TransactionModel } from "core/models/Transaction"
import {IoIosArrowForward} from "react-icons/io"
import { useAppSelector } from "store/hooks"


const Transaction = () => {
    const firestore = useFirestore()
    const router = useRouter()
    const currentUser = useAppSelector(state => state.firebase.profile)
    const [transactions,setTransactions] = React.useState<TransactionModel[]>([])
    const listeners:any[] = []

    const getAllTransactionList = React.useMemo(() => (
        async () => {
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
    ),[])

    const getAllUserTransaction = React.useMemo(() => (
        async () => {
            const responseListeners = firestore.collection("users").doc(currentUser.id)
            .collection("transactions").orderBy("createdAt").onSnapshot(snap => {
                if(!snap.empty){
                    const result:TransactionModel[] = []
                    snap.docs.map(item => {
                        result.push({
                            id:item.id,
                            ...item.data() as any
                        })
                    })
                    setTransactions(result)
                }
            })
            listeners.push(responseListeners)
        }
    ),[currentUser])

    React.useEffect(() => {
        if(currentUser.isLoaded){
            if(currentUser.role === "admin"){
                getAllTransactionList()
            }else{
                getAllUserTransaction()
            }
        }
        return () => {
            listeners.map(item => {
                item()
            })
        }
    },[currentUser])

    const theme = useTheme()
    const mediaQuery = useMediaQuery(theme.breakpoints.up("xs"))
    const goTo = (arg:string) => {
        router.push(arg)
    }

    console.log({mediaQuery})

    return (
        <DashboardLayout>
            <Typography>
                Show A list of all Available Transaction
            </Typography>
            <Table rowLength={transactions.length} heading={
                true ? ["Type", "Owner", "Status", "Date", "Amount"] : 
                ["","Type", "Owner", "Status", "Date", "Amount"]
                }>
                {transactions.map((item, idx) => (
                    <TableRow key={idx} isLoaded={true}
                    onClick={() => {goTo(`/transaction/${item.id}`)}}
                        fields={
                            [
                                ...(false ? [<Checkbox />] : []),
                                item.type, item.user.username || item.user.email, item.status,((item.createdAt as any)?.toDate() as Date).toLocaleTimeString(),
                                item.requestedAmount
                            ]
                        } />
                ))}
            </Table>
        </DashboardLayout>
    )
}

export default Transaction