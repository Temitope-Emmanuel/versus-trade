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
    email:"",
    password:""
}   

type FormType = typeof initialValues;

const Login = () => {
    const dialog = useAlertService()
    const router = useRouter()
    const firebase = useFirebase()
    
    const handleSubmit = async (values: FormType, { ...actions }: any) => {
        actions.setSubmitting(true)
        firebase.login({
            email:values.email,
            password:values.password,

        }).then((userResponse) => {
            console.log({userResponse})
            dialog({
                message:"Login Successful",
                type:"success",
                title:""
            })
            actions.setSubmitting(false)
            console.log({userResponse})
            router.push(`user/${(userResponse as any).user.user.uid}/chat`)
        }).catch(err => {
            dialog({
            message:`Errr:${err.message}`,
            type:"error",
            title:"Something while login in user"
            })
        })
      }
    return (
        <Box className="flex flex-col h-screen items-center justify-center">
            <Link href="/">
                <>
                    <span className="sr-only">Workflow</span>
                    {/* <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/> */}
                    <div className="flex items-center">
                        <Image width="30" height="30" layout="intrinsic" priority={true} className="h-8 w-auto sm:h-10" src="/logo.png" />
                        <p className="font-black text-lg">ersusTrade</p>
                    </div>
                </>
            </Link>
            <Box className="container bg-gray-200 flex flex-col justify-center my-3 items-center p-4 rounded-lg max-w-xl w-5/6 md:w-3/4">
                <h3 className="text-center font-medium text-xl">
                    This is the login page
                </h3>
                <Formik initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {(formikProps:FormikProps<FormType>) => (
                        <>
                        <Box className="flex md:w-3/4 flex-col space-y-3 max-w-md mx-auto">
                            <NormalInput className="w-full" variant="Standard" label="Email" name="email" />
                            <NormalInput className="w-full" variant="Standard" label="Password" name="password" />
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
                    Don't have an account ? Sign up&nbsp;
                    <Link href="/Signup" >
                        <span className="underline text-red-500 cursor-pointer">
                            here
                        </span>
                    </Link>
                </Typography>
            </Box>
        </Box>
    )
}

export default Login