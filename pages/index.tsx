import React from "react"
import {Transition} from "@headlessui/react"
import {DetailCard,DisplayCard,QuoteCard} from "../components/Cards"
import {GoogleMaps} from "../components/GoogleMaps"
import {Footer} from "../components/Footer"


const detailArray = [
  {
    title:"Delightful Experience",
    subtitle:"Our service, tools and simple trading process will get you trading happily from day one.",
    icon:"detailIcons/pen.svg"
  },
  {
    title:"Beginner Friendly",
    subtitle:"Prestmit offers an intuitive, beginner-friendly interface and 24/7 customer support.",
    icon:"detailIcons/video.svg"
  },
  {
    title:"Delightful Experience",
    subtitle:"Our service, tools and simple trading process will get you trading happily from day one.",
    icon:"detailIcons/intellectual.svg"
  }
]

const dashboardMenu = [
  {icon:"featureIcon/prayerHand.svg",title:"Prayer Wall"},
  {icon:"featureIcon/Bible.svg",title:"Bible"},
  {icon:"featureIcon/Sermon.svg",title:"Sermon"},
  {icon:"featureIcon/Giving.svg",title:"Giving"},
  {icon:"featureIcon/Activity.svg",title:"Church Activity"},
  {icon:"featureIcon/Reflection.svg",title:"Daily Reflection"},
  {icon:"featureIcon/Groups.svg",title:"Groups"},
  {icon:"featureIcon/Announcement.svg",title:"Announcement"},
]


// <!-- This example requires Tailwind CSS v2.0+ -->
export default function Home() {
  const [mobileOpen,setMobileOpen] = React.useState(false)
  const handleToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  return (
    <>
<div className="relative bg-white overflow-hidden">
  <div className="mx-auto h-75v">
    <div className="relative z-10 pb-8 h-full bg-white lg:max-w-2xl lg:w-full ">
      <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
       fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="50,0 100,0 50,100 0,100" />
      </svg>

      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href="#">
                <span className="sr-only">Workflow</span>
                {/* <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/> */}
                <div className="flex align-bottom" >
                  <img className="h-8 w-auto sm:h-10" src="logo.png"/>
                  <p>ersus</p>
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
            <a href="#" className="font-medium text-gray-500 hover:text-gray-900">Product</a>

            <a href="#" className="font-medium text-gray-500 hover:text-gray-900">Features</a>

            <a href="#" className="font-medium text-gray-500 hover:text-gray-900">Marketplace</a>

            <a href="#" className="font-medium text-gray-500 hover:text-gray-900">Company</a>

            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</a>
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
                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt=""/>
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
      
      <main className="mt-28 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Versus Trade, Hub Of</span>
            <span className="block text-indigo-600 whitespace-nowrap">Crypto and Giftcards</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Where better transactions are done
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Get started
              </a>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                Live demo
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt=""/>
  </div>
</div>
  <div>
    <h2 className="text-3xl text-center my-6">What Ever You Need we Have</h2>
  <div className="flex flex-col justify-around max-w-6xl mx-auto my-4 items-center md:flex-row">
    {detailArray.map((item,idx) => (
      <DetailCard key={idx} imageSrc={item.icon}
       subtitle={item.subtitle} title={item.title}  />
    ))}
  </div>
  </div>
 <div className="flex flex-col-reverse justify-center md:flex-row md:px-5">
   <div className="flex-grow flex w-full min-w-max flex-col items-center max-w- max-w-2xl">
     <h3 className="text-3xl my-6">
       Features
     </h3>
     <div className="grid grid-cols-2 gap-4">
       {dashboardMenu.map((item,idx) => (
         <div className="flex flex-col md:flex-row items-center">
           <img src={item.icon} />
           <div className="ml-2">
             <p>
               {item.title}
             </p>
           </div>
         </div>
       ))}
     </div>
   <button>
     Contact Us Now
   </button>
   </div>
    <div className="max-w-2xl flex-shrink">
      <img src="featureIcon/feature.png" />
    </div>
 </div>
 <div className="flex flex-col md:flex-row items-center justify-center mx-auto">
   {[1,2,3,4].map((item,idx) => (
     <DisplayCard/>
   ))}
 </div>
 <div className="customer-view">
   <h3 className="uppercase text-center ">What Our Happy Customers are Saying!</h3>
   <div className="flex flex-col justify-center md:flex-row flex-wrap">
     {[1,2,3,4].map((item,idx) => (
       <QuoteCard/>
     ))}
   </div>
 </div>
 <div>
   <h3>
     Contact Us
   </h3>
     <GoogleMaps/>
     <Footer/>
 </div>
  </>
  )
}