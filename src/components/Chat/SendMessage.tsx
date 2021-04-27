import React from "react"
import { Box, Collapse, Button } from "@material-ui/core"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { NormalInput, TextArea } from "components/Input"
import { FormikProps, Formik } from "formik"
import { AiOutlineSend } from "react-icons/ai"
import TouchRipple from "@material-ui/core/ButtonBase";
import { VscLoading } from "react-icons/vsc"
import { useAlertService } from "core/utils/Alert/AlertContext"
import { useFirestore, useFirebase } from "react-redux-firebase"
import { RiImageAddFill } from "react-icons/ri"
import { Dialog } from "components/Dialog"
import { AiFillIdcard } from "react-icons/ai"
import { BiCoinStack, BiImageAdd } from "react-icons/bi"
import { Button as MaterialButton } from "components/Button"
import { useAppSelector, useDispatch } from "store/hooks"
import {
    addTransaction
} from "store/chat/actions"
import { firebaseMessaging } from "firebaseUtils/webPush"
import * as Yup from "yup"

const useStyles = makeStyles((theme) => createStyles({
    root: {
        borderRadius: "2.5px",
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1),
        justifyContent: "space-evenly",
        [theme.breakpoints.up("sm")]:{
            width: "85%",
            padding: theme.spacing(2)
        },
        "& svg": {
            backgroundColor: theme.palette.primary.light,
            borderRadius: "50%",
            padding: ".25rem",
            fontSize: "2rem",
            [theme.breakpoints.up("sm")]:{
                padding: ".5rem",
                fontSize: "2.5rem"
            }
        },
        // "& svg:first-child":{
        //     color:"#B603C9"
        // },
        "& > nth-child(2)": {
            // margin: theme.spacing(0, 3),
            // margin:"auto",
            flex: 1,
            "& input": {
                borderWidth: "0",
                borderRadius: "0",
                borderBottomWidth: "1px",
                borderBottomColor: "black"
            }
        }
    },
    rotate: {
        animation: "rotation 2s infinite linear"
    },
    margin: {
        width: "75%"
    },
    tradeContainer: {
        overflowX: "clip",
        // [theme.breakpoints.up("md")]:{
        //     height: "35rem", 
        //     width: "35rem",
        // },
        "& svg": {
            padding: ".25rem",
            fontSize: "2rem",
            [theme.breakpoints.up("sm")]:{
                padding: ".5rem",
                fontSize: "2.5rem"
            }
        }
    }
}))


const initialValues = {
    message: ""
}
const initialTransactionValues = {
    comment: ""
}

type messageForm = typeof initialValues
type transactionMessageForm = typeof initialTransactionValues

interface IProps {
}

const defaultImageStorage = {
    base64: "",
    name: "",
    file: null
}

const SendMessage: React.FC<IProps> = ({ }) => {
    const classes = useStyles()
    const dialog = useAlertService()
    const firestore = useFirestore()
    const firebase = useFirebase()
    const dispatch = useDispatch()
    const fcmMessaging = React.useRef<firebaseMessaging>()
    const currentChatProfile = useAppSelector(state => state.chat.currentChatProfile)
    const currentUser = useAppSelector((state) => state.firebase.profile)
    const [open, setOpen] = React.useState(false)
    const [selectedTransfer, setSelectedTransfer] = React.useState(null)
    const [image, setImage] = React.useState(defaultImageStorage)
    // const [count,setCount] = React.useState(0)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [totalTransactionImage, setTotalTransactionImage] = React.useState<typeof defaultImageStorage[]>([])
    const newMessageRef = React.useRef<firebase.default.firestore.CollectionReference<firebase.default.firestore.DocumentData> | null>(null)

    const sendMessage = () => {
        return fcmMessaging.current.sendMessage({
            title: "Successfully sent transaction",
            body: "A new transaction has been successfully registered on your account"
        })
    }

    const handleTransactionSubmit = async (values: transactionMessageForm, { ...actions }: any) => {
        try {
            const allTransactionImage = [...totalTransactionImage, image.base64 ? image : undefined]
            actions.setSubmitting(true)
            new Promise((resolve,reject) => {
                resolve(dispatch(addTransaction({
                    comment: values.comment,
                    file: allTransactionImage.map(item => item.file),
                    status: "Pending",
                    type: selectedTransfer,
                    requestedAmount: 0,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    user: {
                        id: currentUser.id || "",
                        email: currentUser.email || "",
                        username: currentUser.username || "",
                    }
                }, dialog)))
            }).then(() => {
                setTotalTransactionImage([])
                setImage(defaultImageStorage)
                setOpen(false)
                actions.setSubmitting(false)
                actions.resetForm()
                dialog({
                    type: "info",
                    message: "Transaction created",
                    title: "Request successful"
                })
                sendMessage().then(() => {
                })
            })


        } catch (err) {
            actions.setSubmitting(false)
            dialog({
                type: "error",
                title: "Something went wrong while Sending Message",
                message: `Error:${err}`
            })
        }
    }

    const handleToggle = () => {
        setOpen(!open)
    }

    const handleSelectedTransfer = (arg: "gift" | "crypto") => () => {
        setSelectedTransfer(arg)
    }
    React.useEffect(() => {
        newMessageRef.current = firestore.collection("users").doc(currentChatProfile.id).collection("chatMessages")
    }, [currentChatProfile])

    React.useEffect(() => {
        if (!currentUser.isEmpty) {
            fcmMessaging.current = new firebaseMessaging(firebase, currentUser as any, dialog,true)

        }
    }, [currentUser])
    const handleChatSubmit = async (values: messageForm, { ...action }: any) => {
        const chatMessageRef = firestore.collection("users").doc(currentChatProfile.id).collection("chatMessages").doc()
        await chatMessageRef.set({
            author: {
                id: currentUser.id,
                photoURL: currentUser.profileImage,
                username: currentUser.email,
            },
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            message: values.message
        }).then(() => {
            inputRef.current?.focus()
        }).catch(err => {

        })
        if (currentUser.role !== "admin" && !currentUser.hasChat) {
            firebase.updateProfile({ hasChat: true })
        }
        action.setSubmitting(false)
        action.resetForm()
    }

    const handleImageTransformation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        const { name } = e.currentTarget
        if (image.file) {
            setTotalTransactionImage([...totalTransactionImage, image])
            setImage(defaultImageStorage)
        }
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = function () {
                setImage({
                    base64: (reader.result as string),
                    name: file.name,
                    file: file as any
                })
            }
        }
    }
    const validationSchema = Yup.object({
        comment: Yup.string().required()
    })

    const selectStyles = `flex flex-col p-4 shadow-md items-center space-y-3`
    const containerStyles = selectedTransfer !== null ? { height: "35rem", width: "35rem" } : {}
    const isAdmin = currentUser.role === "admin"

    return (
        <>
            <Dialog open={open} handleClose={handleToggle} title="Create a New Transaction"
                dialogAction={
                    <>
                        <MaterialButton onClick={handleToggle} color="primary">
                            Cancel
                        </MaterialButton>
                    </>
                }
            >
                <Box className={`flex-col space-y-3 ${classes.tradeContainer}`}>
                    <Box className={`flex ${selectedTransfer === null ? "justify-between" : "justify-center"}`}>
                        {
                            selectedTransfer !== "crypto" &&
                            <TouchRipple onClick={handleSelectedTransfer("gift")} className={selectStyles}>
                                <AiFillIdcard />
                                <p className="mx-2">
                                    Gift Card
                                </p>
                            </TouchRipple>
                        }
                        {
                            selectedTransfer !== "gift" &&
                            <TouchRipple onClick={handleSelectedTransfer("crypto")} className={selectStyles}>
                                <BiCoinStack />
                                <p className="mx-2">
                                    Cryptocurrency
                                </p>
                            </TouchRipple>
                        }
                    </Box>
                    <Collapse mountOnEnter unmountOnExit in={selectedTransfer !== null} >
                        <Formik onSubmit={handleTransactionSubmit}
                            //  validationSchema={validationSchema}
                            initialValues={initialTransactionValues}
                        >
                            {(formikProps: FormikProps<transactionMessageForm>) => {
                                console.log({ formikProps })
                                return (
                                    <div className="flex flex-col justify-center">
                                        <div className="md:w-2/4 md:mx-auto">
                                            <label className="block text-sm font-medium md:text-center text-gray-700">
                                                Transaction Image
                                            </label>
                                            <div className={`
                                                            mt-1 flex h-48 justify-center px-6 my-10
                                                            pt-5 pb-6 border-2 border-gray-300 border-dashed
                                                            rounded-md`}
                                                style={{
                                                    backgroundImage: `url(${image.base64})`,
                                                    backgroundPosition: "center",
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundSize: "contain"
                                                }}
                                            >
                                                <div className="space-y-1 text-center my-auto flex flex-col items-center">
                                                    <BiImageAdd className="mx-auto h-12 w-12 text-gray-400" />
                                                    <div className="flex text-sm text-gray-600">
                                                        <label htmlFor="file-upload3" className="relative cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 text-center">
                                                            <span>Upload a file</span>
                                                            <input id="file-upload3" accept="image/jpeg;image/png" onChange={handleImageTransformation}
                                                                name="file-upload3" type="file" className="sr-only" />
                                                        </label>
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        PNG, JPG, GIF up to 10MB
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <Box className="transactionImageContainer flex w-11/12 m-3 h-28 overflow-auto">
                                            <>
                                                {
                                                    totalTransactionImage.map((item, idx) => (
                                                        <div key={idx} className="md:w-1/4 mx-1 h-100">
                                                            <img className="w-100 h-100 object-contain" src={item.base64} />
                                                            <span />
                                                        </div>
                                                    ))}
                                                {image.base64 &&
                                                    <div key={`personal-unadded-image`} className="w-1/4 mx-1 h-100">
                                                        <img className="w-100 h-100 object-contain" src={image.base64} />
                                                        <span />
                                                    </div>
                                                }
                                            </>
                                        </Box>
                                        <TextArea label="Input Comment" rows={5}
                                            name="comment" className="w-100"
                                        />
                                        <Button role="submit" type="submit" variant="contained"
                                        color="primary"
                                            disabled={
                                                !formikProps.dirty ||
                                                !formikProps.isValid ||
                                                formikProps.isSubmitting
                                                //  ||  totalTransactionImage.length <= 1 || 
                                                // formikProps.values.comment.length <= 1
                                            }
                                            onClick={formikProps.handleSubmit as any}>
                                            Submit
                                        </Button>
                                    </div>
                                )
                            }}
                        </Formik>
                    </Collapse>
                </Box>
            </Dialog>
            <Box className={classes.root}>
                <Formik initialValues={initialValues}
                    onSubmit={handleChatSubmit}>
                    {(formikProps: FormikProps<messageForm>) => (
                        <>
                            {!isAdmin && currentUser.hasChat &&
                                <TouchRipple onClick={handleToggle} className="cursor-pointer"
                                    disabled={formikProps.isSubmitting}
                                >
                                    <RiImageAddFill />
                                </TouchRipple>
                            }
                            <NormalInput name="message" placeholder="Write a message"
                                ref={inputRef} className={`mx-5 ${classes.margin}`}
                            />
                            <TouchRipple
                                disabled={formikProps.isSubmitting || !formikProps.dirty || !formikProps.isValid}
                                onClick={formikProps.handleSubmit as any}>
                                {formikProps.isSubmitting ? <VscLoading className={classes.rotate} /> : <AiOutlineSend />}
                            </TouchRipple>
                        </>
                    )}
                </Formik>
            </Box>
        </>
    )
}

export default SendMessage