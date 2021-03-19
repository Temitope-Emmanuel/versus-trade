import React from "react"
import Link from "next/link"
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa"

const Footer = () => {

    return (
        <div className="text-white py-5 px-3 flex justify-center bg-gradient-to-br from-red-400 via-pink-500 to-red-500">
            <div className="my-5 mx-3 flex flex-col max-w-7xl justify-between md:flex-row border-t-2 border-white">
                <div className="m-2 max-w-md">
                    <div className="flex flex-col md:flex-row items-center">
                        <img className="w-10 h-10 object-cover m-2" src="/quoteImage.jpg" />
                        <p className="my-2 text-center md:text-left">
                            It is a long established fact that a reader will be distracted by the readable content
                            of a page when looking at its layout. The point of using Lorem Ipsum is that it.
                        </p>
                    </div>
                    <p className="my-2 text-center md:text-left">
                        1st Floor, Leasing House,C & I Leasing Drive, Off Bisola Durosinmi
                        Etti Drive, Off Admiralty Way, Lekki Phase 1, Lagos, Nigeria
                        </p>
                    <div className="flex flex-col md:flex-row my-2 text-center">
                        <p>
                            +234-1-342-9192
                            </p>
                        <p>
                            info@thefaithfuls.com
                            </p>
                    </div>
                    <div className="flex justify-between my-3 m-auto md:m-0 w-1/3">
                        <FaFacebookF />
                        <FaTwitter />
                        <FaLinkedinIn />
                    </div>
                </div>
                <div className="m-2 mt-4 flex flex-col items-center md:items-start justify-between h-32">
                    <p>Menu</p>
                    <Link href="/" >
                        Home
                    </Link>
                    <Link href="/">
                        Find Your Church
                    </Link>
                    <Link href="/" >
                        About Us
                    </Link>
                    <Link href="/">
                        Contact Us
                    </Link>
                </div>
                <div className="m-2 mt-4 flex flex-col justify-between h-32 items-center md:items-start">
                    <p>
                        Company
                    </p>
                    <Link href="/">
                        Terms of service
                    </Link>
                    <Link href="/">
                        Privacy Policy
                    </Link>
                    <Link href="/">
                        Blog
                    </Link>
                </div>
                <div className="m-2 mt-4 flex flex-col-reverse justify-between h-14 items-center md:items-start">
                    <p>
                        Subscribe
                    </p>
                    <p color="white">
                        For our Newletter and updates
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Footer