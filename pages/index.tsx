import React from "react"
import { Transition } from "@headlessui/react"
import { DetailCard, QuoteCard } from "components/Cards"
import Image from "next/image"
import { useRouter } from "next/router"
import { GoogleMaps } from "components/GoogleMaps"
import { Footer } from "components/Footer"
import { Carousel } from 'components/Carousel'
import { Atlas } from "components/Atlas"
import { DialogTitle, DialogContent, Button as MaterialButton, Typography, DialogContentText, DialogActions } from "@material-ui/core"
import { Dialog } from "components/Dialog"
export { Dialog } from "components/Dialog"
import { FaFacebookSquare } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { AiOutlineMail } from "react-icons/ai"
import { useAppSelector } from "../src/store/hooks"
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase"
import { useSelector } from "react-redux"
import { useAlertService } from "core/utils/Alert/AlertContext"


const detailArray = [
  {
    title: "Best Rates",
    subtitle: "Our service, tools and simple trading process will get you trading happily from day one.",
    icon: "detailIcons/pen.svg"
  },
  {
    title: "24/7 Customer Support",
    subtitle: "Prestmit offers an intuitive, beginner-friendly interface and 24/7 customer support.",
    icon: "detailIcons/video.svg"
  },
  {
    title: "Extensive Network",
    subtitle: "Our service, tools and simple trading process will get you trading happily from day one.",
    icon: "detailIcons/intellectual.svg"
  },
  {
    title: "Convenient & Safe",
    subtitle: "Our service, tools and simple trading process will get you trading happily from day one.",
    icon: "detailIcons/intellectual.svg"
  },
  {
    title: "Instant Payment",
    subtitle: "Our service, tools and simple trading process will get you trading happily from day one.",
    icon: "detailIcons/intellectual.svg"
  },
  {
    title: "Secure & Private",
    subtitle: "Our service, tools and simple trading process will get you trading happily from day one.",
    icon: "detailIcons/intellectual.svg"
  },
]



const dashboardMenu = [
  { icon: "featureIcon/prayerHand.svg", title: "Always Available" },
  { icon: "featureIcon/Bible.svg", title: "Built With Love" },
  { icon: "featureIcon/Sermon.svg", title: "Trade Anywhere" },
  { icon: "featureIcon/Giving.svg", title: "Fast Transaction" },
  { icon: "featureIcon/Activity.svg", title: "Easy To Use" },
  { icon: "featureIcon/Reflection.svg", title: "Complete Privacy" },
  { icon: "featureIcon/Groups.svg", title: "Instant Payment" },
  { icon: "featureIcon/Announcement.svg", title: "Transparency" },
]


export default function Home() {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const alert = useAlertService()
  const firebase = useFirebase()
  const handleToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const [open, setOpen] = React.useState(false);
  const handleDialogToggle = () => {
    setOpen(!open)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loginWithGoogle = async () => {
    try {
      const response = await firebase.login({ provider: 'google', type: "popup" })
      console.log(JSON.stringify(response, null, 2))
      if (response.additionalUserInfo.isNewUser) {
        alert({
          type: "success",
          title: "Sign Up successful",
          message: "Congratulation on joining versus trade"
        })
      } else {
        alert({
          type: "success",
          title: "Sign In successful",
          message: `Welcome back ${response.user.displayName}`
        })
      }
      router.push(`/user/${response.user.uid}/chat`)
    } catch (err) {
      console.log("this is terr", err)
      alert({
        type: "error",
        title: "Something went wrong, Unable to complete Request",
        message: `Error:${err}`
      })
    }
  }
  
  const loginWithFacebook = async () => {
    try {
      const response = await firebase.login({ provider: 'facebook', type: "popup" })
      console.log(JSON.stringify(response, null, 2))
      if (response.additionalUserInfo.isNewUser) {
        alert({
          type: "success",
          title: "Sign Up successful",
          message: "Congratulation on joining versus trade"
        })
      } else {
        alert({
          type: "success",
          title: "Sign In successful",
          message: `Welcome back ${response.user.displayName}`
        })
      }
      router.push(`/user/${response.user.uid}/chat`)
    } catch (err) {
      console.log("this is terr", err)
      alert({
        type: "error",
        title: "Something went wrong, Unable to complete Request",
        message: `Error:${err}`
      })
    }
  }



  return (
    <>
      <div>
        <div className="relative bg-white overflow-hidden">
          <div className="mx-auto h-75v">
            <div className="relative z-10 pb-8 h-full bg-white lg:max-w-2xl lg:w-full ">
              <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>

              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav data-aos="fade-down" className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div data-aos="fade-right" className="flex items-center justify-between w-full md:w-auto">
                      <a href="#">
                        <span className="sr-only">Workflow</span>
                        {/* <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/> */}
                        <div className="flex items-center">
                          <Image width="30" height="30" layout="intrinsic" priority={true} className="h-8 w-auto sm:h-10" src="/logo.png" />
                          <p className="font-black text-lg">ersusTrade</p>
                        </div>
                      </a>
                      <div className="-mr-2 flex items-center md:hidden">
                        <button onClick={handleToggle} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                          <span className="sr-only">Open main menu</span>
                          {/* <!-- Heroicon name: outline/menu --> */}
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                    <a data-aos="fade-up-left" href="#" className="font-medium text-gray-900 text-lg hover:text-red-500">Home</a>

                    <a data-aos="fade-up-left" href="#" className="font-medium text-gray-900 text-lg hover:text-red-500">Service</a>

                    <a data-aos="fade-up-left" href="#" className="font-medium text-gray-900 text-lg hover:text-red-500">Who we are</a>

                    <a data-aos="fade-up-left" href="#" className="font-medium text-gray-900 text-lg hover:text-red-500">Contact</a>
                  </div>
                </nav>
              </div>
              <Transition enter="duration-150 ease-out" enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100" leave="duration-100 ease-in" leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                show={mobileOpen}
              >
                {(ref) => (
                  <div ref={ref} className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                    <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="px-5 pt-4 flex items-center justify-between">
                        <div>
                          <Image width="0" height="0" layout="intrinsic" className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                        </div>
                        <div className="-mr-2">
                          <button type="button" onClick={handleToggle} className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close main menu</span>
                            {/* <!-- Heroicon name: outline/x --> */}
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="px-2 pt-2 pb-3 space-y-1">
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</a>

                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Services</a>

                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Who we are</a>

                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contacts</a>
                      </div>
                      <a href="#" className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100">
                        Log in
            </a>
                    </div>
                  </div>

                )}
              </Transition>

              <main data-aos="flip-up" className="mt-28 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Versus Trade, Hub Of</span>
                    <span className="block text-red-600 whitespace-nowrap">Crypto and Giftcards</span>
                  </h1>
                  <p data-aos="zoom-out-down" className="mt-3 text-base text-red-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Where better transactions are done
                </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div data-aos="zoom-in-right" onClick={handleDialogToggle} className="rounded-md shadow">
                      <a href="#" className={`
                      w-full flex items-center justify-center px-8 py-3 border 
                      border-transparent text-base font-medium rounded-md 
                      text-white bg-red-600 hover:bg-red-700 md:py-4 
                      md:text-lg md:px-10`}>
                        Get started
                  </a>
                    </div>
                    <div data-aos="zoom-in-left" className="mt-3 sm:mt-0 sm:ml-3">
                      <a href="https://wa.link/3df9ra" className={`
                      w-full flex items-center justify-center px-8 py-3 border 
                      border-transparent text-base font-medium rounded-md 
                      text-red-700 bg-red-100 hover:bg-red-200 
                      md:py-4 md:text-lg md:px-10`}>
                        Chat Now
                    </a>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className=" w-100 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img data-aos="fade"
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="/versustrade.png" alt="" />
          </div>
        </div>
        <section data-aos="fade-up">
          <h2 className="text-4xl text-center my-6 font-medium text-red-600">What Ever You Need we Have</h2>
          <div className="flex flex-col justify-around max-w-6xl mx-auto my-4 flex-wrap items-center md:flex-row">
            {detailArray.map((item, idx) => (
              <DetailCard key={idx} imageSrc={item.icon}
                data-aos="flip-right"
                subtitle={item.subtitle} title={item.title} />
            ))}
          </div>
        </section>
        {/* <section data-aos="fade-up" className="flex items-center flex-col-reverse justify-center md:flex-row md:px-5">
        <div className="flex-grow flex w-full min-w-max flex-col items-center md:items-start max-w-2xl">
          <h2 data-aos="fade-down" className="text-4xl my-6 font-medium text-red-600">
            Features
          </h2>
          <div className="grid grid-cols-2 gap-4 my-7">
            {dashboardMenu.map((item, idx) => (
              <div key={idx} data-aos="flip-down" className="flex flex-col md:flex-row items-center">
                <Image width="40" height="40" layout="intrinsic" src={`/${item.icon}`} />
                <div className="ml-2">
                  <p>
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button data-aos="zoom-in-up"
           className="md:self-start" >
            Contact Us Now
          </Button>
        </div>
        <div className="max-w-xl flex-shrink">
          <Image width="350" height="500" layout="intrinsic" src="/blackMan.jpg" className="rounded-tl-3xl rounded-br-3xl" />
        </div>
      </section> */}
        <section data-aos="fade-up" >
          <h2 data-aos="fade-down" className="text-4xl text-center my-6 font-medium text-red-600">From Anywhere 24/7 we are always here</h2>
          <Atlas />
        </section>
        <section data-aos="fade-up">
          <Carousel />
        </section>
        <section className="customer-view" data-aos="fade-up">
          <h3 className="text-4xl my-6 text-center font-medium text-red-600">What Our Happy Customers are Saying!</h3>
          <div className="flex flex-col justify-center md:flex-row flex-wrap">
            {[1, 2, 3, 4].map((item, idx) => (
              <QuoteCard data-aos="flip-right" key={idx} />
            ))}
          </div>
        </section>
        <div>
          <h3 className="text-4xl my-6 text-center font-medium text-red-600">Contact Us</h3>
          <GoogleMaps />
        </div>
        <Footer />
      </div>
      <Dialog open={open} handleClose={handleDialogToggle} >
        <DialogTitle id="alert-dialog-slide-title">
          Join VersusTrade
      </DialogTitle>
        <DialogContent className="flex flex-col">
          <MaterialButton onClick={loginWithGoogle} className="px-3 py-5">
            <FcGoogle className="mr-3" />
            <Typography>
              Sign up with Google
            </Typography>
          </MaterialButton>
          <MaterialButton onClick={loginWithFacebook} className="px-3 py-5">
            <FaFacebookSquare className="mr-3" />
            <Typography>
              Sign up with Facebook
            </Typography>
          </MaterialButton>
          <MaterialButton className="px-3 py-5">
            <AiOutlineMail className="mr-3" />
            <Typography>
              Email
              </Typography>
          </MaterialButton>
        </DialogContent>
        <DialogActions className="">
          <MaterialButton onClick={handleClose} color="primary">
            Disagree
          </MaterialButton>
          <MaterialButton onClick={handleClose} color="primary">
            Agree
          </MaterialButton>
        </DialogActions>
      </Dialog>
    </>
  )
}