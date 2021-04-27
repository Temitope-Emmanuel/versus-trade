import React from "react"
import {
    makeStyles, createStyles, Box,
    Typography, Paper, Divider, Button,Grid
} from "@material-ui/core"
import { useRouter } from "next/router"
import TouchRipple from "@material-ui/core/ButtonBase";
import { Transaction } from "core/models/Transaction"
import clsx from "clsx"
import { useAlertService } from "core/utils/Alert/AlertContext"
import { useFirebase, useFirestoreConnect } from "react-redux-firebase"
import { useAppSelector } from "store/hooks"
import { DashboardLayout } from "layouts/DashboardLayout"
import { Dialog } from "components/Dialog"
import { NormalInput } from "components/Input";
import { Formik, FormikProps } from "formik";
import { firebaseMessaging } from "firebaseUtils/webPush";
import { IAccount } from "core/models/Account";


const useStyles = makeStyles(theme => createStyles({
    root: {
        [theme.breakpoints.up("md")]:{
            padding: theme.spacing(4),
        },
        "& > div":{
            margin:"auto"
        }
    },
    cardContainer: {
        // display: "flex",
        // [theme.breakpoints.down("sm")]: {
        //     flexDirection: "column"
        // },
        // "& > div": {
        //     flex: 1
        // }
    },
    previewContainer: {
        "& > div": {
            cursor: "pointer",
            "&:focus": {
                border: "2px solid blue"
            }
        }
    }
}))


const initialValue = {
    reason:""
}

type TypeForm = typeof initialValue

const ViewTransaction = () => {
    const defaultImageObj = {
        fullPath: "",
        downloadURL: ""
    }
    const classes = useStyles()
    const [open,setOpen] = React.useState(false)
    const currentUser = useAppSelector(state => state.firebase.profile)
    const router = useRouter()
    const isAdmin = currentUser.role === "admin"
    const fcmMessaging = React.useRef<firebaseMessaging>()
    const [transactionCreator,setTransactionCreator] = React.useState<IAccount>()
    const [currentImage, setCurrentImage] = React.useState(defaultImageObj)
    const [currentTransaction, setCurrentTransaction] = React.useState<Transaction>({
        comment: "",
        file: [],
        requestedAmount: 0,
        status: "Pending",
        type: "cryptocurrency",
        user: {
            email: "",
            id: "",
            username: ""
        }
    })
    const dialog = useAlertService()
    const firebase = useFirebase()
    const listeners: Function[] = []
    const currentTransactionRef = React.useRef<firebase.default.firestore.DocumentReference<firebase.default.firestore.DocumentData>>();
    const handleCurrentLink = (e: typeof defaultImageObj) => () => {
        setCurrentImage(e)
    }
    const { transactionId } = router.query


    React.useEffect(() => {
        const transactionApiCall = async () => {
            const response = firebase.firestore().collectionGroup("transactions").where("id", "==", transactionId)
            const listener = response.onSnapshot(docs => {
                console.log({docs})
                if (!docs.empty) {
                    docs.forEach(item => {
                        currentTransactionRef.current = item.ref
                        const result = {
                            id: item.id,
                            ...item.data()
                        }
                        setCurrentTransaction(result as any)
                    })
                }
            })
            listeners.push(listener)
        }
        if (typeof transactionId != "undefined") {
            transactionApiCall()
        }
    }, [transactionId])

    React.useEffect(() => {
        const transactionOwnerCall = async () => {
            const response = await firebase.firestore().collection("users").doc(currentTransaction.user.id).get()
            if(response.exists){
                const userDetail = {
                    id:response.id,
                    ...response.data() as any
                }
                setTransactionCreator(userDetail)
            }
        }
        if(currentTransaction.user.id){
            transactionOwnerCall()
        }
    },[currentTransaction])

    React.useEffect(() => {
        if(transactionCreator?.id && !fcmMessaging.current){
            fcmMessaging.current = new firebaseMessaging(firebase,transactionCreator,dialog,false)
        }
    },[transactionCreator])

    React.useEffect(() => {
        if (currentTransaction.file?.length) {
            setCurrentImage(currentTransaction.file[0])
        }
    }, [currentTransaction])

    const updateTransaction = ({
        status,
        reason
    }:{
        status: "Successful" | "Rejected",
        reason?:string
    }) => () => {
        currentTransactionRef.current?.update({ status,...(reason && {reason}) }).then(() => {
            if(status === "Successful"){
                fcmMessaging.current.sendMessage({
                    body:"Transaction has been successfully accepted",
                    title:"Successfully transaction"
                })
            }else{
                fcmMessaging.current.sendMessage({
                    title:"Your Transaction has been rejected",
                    body:`Error:${reason}`
                })
            }
            dialog({
                message: "Successfully Updated Incidence",
                type: "success",
                title: ""
            })
        })
    }
    const handleToggle = () => {
        setOpen(!open)
    }

    const approveIncidence = updateTransaction({status:"Successful"})
    
    const handleSubmit = async (values:TypeForm,{...actions}:any) => {
        updateTransaction({status:"Rejected",reason:values.reason})()
        actions.setSubmitting(false)
        handleToggle()
    }

    return (
        <>
        <Dialog open={open} handleClose={handleToggle} title="Input The Reason for Rejecting Transaction">
            <Formik initialValues={initialValue} onSubmit={handleSubmit}  >
                {(formikProps:FormikProps<TypeForm>) => (
                    <>
                        <NormalInput name="reason" label="Reason for rejecting Transaction" />
                        <Button onClick={formikProps.handleSubmit as any} >
                            Submit
                        </Button>
                    </>
                ) }
            </Formik>
        </Dialog>
            <DashboardLayout>
                <Box className={classes.root}>
                    <Grid container spacing={3}
                     component={Paper} className={`p-3 max-w-2xl mx-auto`} elevation={5}>
                        <Grid item className="h-44">
                            <img className="h-full w-full object-contain"
                                src={currentImage.downloadURL ?? ""}
                            />
                        </Grid >
                        <Grid item component={Paper} elevation={10}
                         className={clsx(classes.previewContainer,
                            "flex p-2")
                        } >
                            {currentTransaction.file?.map((item, idx) => (
                                <TouchRipple key={idx} onClick={handleCurrentLink(item)} className="flex-grow-1" >
                                    <img 
                                    className={` transition transform scale-75 ${item.fullPath === currentImage.fullPath ? 'scale-100' : 'scale-75'}`}
                                        src={item.downloadURL ?? ""}
                                    />
                                </TouchRipple>
                            ))}
                        </Grid>
                        <Grid item className="flex flex-col w-full items-center justify-center">
                            <Typography className="mb-2" variant="h4">
                                {currentTransaction.status}
                            </Typography>
                            <Divider variant="middle" />
                            <Box className="mt-2" >
                                <small>
                                    Transaction Detail
                                </small>
                                {
                                    currentTransaction.reason && 
                                    <Typography>
                                        {currentTransaction.reason}
                                    </Typography>
                                }
                                <Typography>
                                    {currentTransaction.user.email}
                                </Typography>
                            </Box>
                            {
                                isAdmin && currentTransaction &&
                                <Box className="mt-4 w-fit space-x-3">
                                    <Button disabled={currentTransaction.status === "Successful"} className="mr-4" color="primary" onClick={approveIncidence} variant="outlined" >
                                        Approve
                                    </Button>
                                    <Button disabled={currentTransaction.status === "Rejected"}
                                     color="secondary" variant="outlined" onClick={handleToggle}>
                                        Reject
                                    </Button>
                                </Box>
                            }

                        </Grid>
                    </Grid>
                </Box>
            </DashboardLayout>
        </>
    )
}

export default ViewTransaction