import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Box, Typography } from "@material-ui/core"
import {Button} from "components/Button"
import {NormalInput} from "components/Input"
import {Formik, FormikProps} from "formik"
import { useAlertService } from "core/utils/Alert/AlertContext"
import { useFirebase } from "react-redux-firebase"
import { useRouter } from "next/router"


const initialValues = {
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    phoneNumber:""
}   

type FormType = typeof initialValues;

export default function Signup() {
    const dialog = useAlertService()
    const router = useRouter()
    const firebase = useFirebase()
    
    const handleSubmit = async (values: FormType, { ...actions }: any) => {
        actions.setSubmitting(true)
        firebase.createUser({
          email:values.email,
          password:values.password
        },{
          firstName:values.firstName,
          lastName:values.lastName,
          phoneNumber:values.phoneNumber,
          email:values.email
        }).then((userResponse) => {
          console.log({userResponse})
          dialog({
            message:"Registered Successful",
            type:"success",
            title:""
          })
          actions.setSubmitting(false)
          router.push(`user/${(userResponse as any).id}/chat`)
        }).catch(err => {
          dialog({
            message:`Errr:${err.message}`,
            type:"error",
            title:"Something while creating new user"
          })
        })
      }
    return (
        <Box className="flex flex-col h-screen items-center justify-center">
                    <span className="sr-only">Workflow</span>
                    {/* <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/> */}
            <Link href="/">
                <>
                    <div className="flex items-center cursor-pointer">
                        <Image width="30" height="30" layout="intrinsic" priority={true} className="h-8 w-auto sm:h-10" src="/logo.png" />
                        <p className="font-black text-lg">ersusTrade</p>
                    </div>
                </>
            </Link>
            <Box className="container bg-gray-200 p-4 rounded-lg h-3/5 max-w-xl">
                <h3 className="text-center font-medium text-xl">
                    This is the signup page
                </h3>
                <Formik initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {(formikProps:FormikProps<FormType>) => (
                        <>
                        <Box className="inputContainer m-10 space-y-5">
                            <Box className="flex justify-between">
                                <NormalInput variant="Standard" label="First Name" name="firstName" />
                                <NormalInput variant="Standard" label="Last Name" name="lastName" />
                            </Box>
                                <NormalInput className="w-full" variant="Standard" label="Email" name="email" />
                            <Box className="flex justify-between">
                                <NormalInput variant="Standard" label="Phone Number" name="phoneNumber" />
                                <NormalInput variant="Standard" label="Password" type="password" name="password" />
                            </Box>
                        </Box>
                        <Button className="mx-auto my-5" onClick={formikProps.handleSubmit as any}
                            disabled={!formikProps.dirty || !formikProps.isValid || formikProps.isSubmitting}
                        >
                            Submit
                        </Button>
                        </>
                    )}
                </Formik>
                <Typography className="mt-16 text-center">
                    Already have an account ? login&nbsp;
                    <Link href="/Login" >
                        <span className="underline text-red-500 cursor-pointer">
                            here
                        </span>
                    </Link>
                </Typography>
            </Box>
        </Box>
    )
}