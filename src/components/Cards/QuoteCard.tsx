import React from "react"
import { FaQuoteLeft,FaQuoteRight } from 'react-icons/fa'
import Image from "next/image"


interface IProps {

}


const QuoteCard:React.FC<IProps> = ({...props}) => {
    return (
        <figure className="md:flex bg-gray-100 rounded-xl p-4 md:p-0 m-3 md:max-w-md" {...props}>
            {/* <Image className="w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/quoteImage.jpg" alt="" width="384" height="512"/> */}
            <div className="w-24 h-24 md:w-60 md:h-20 mx-auto relative ">
                <Image layout="fill" objectFit='cover' priority={true}
                    src="/quoteImage.jpg" alt="" className="md:rounded-none rounded-full " />
            </div>
                <div className="pt-3 md:p-4 text-center md:text-left">
                    <blockquote>
                        <FaQuoteLeft className="mx-auto text-red-600"/>
                        <p className="text-lg italic">
                            Tailwind CSS is the only framework that I've seen scale
                            on large teams. It’s easy to customize, adapts to any design,
                            and the build size is tiny.
                        </p>
                        <FaQuoteRight className="mx-auto text-red-600"/>
                    </blockquote>
                    <figcaption className="font-medium">
                        <div className="text-cyan-600">
                            Sarah Dayan
                        </div>
                        <div className="text-red-700">
                            Staff Engineer, Algolia
                        </div>
                    </figcaption>
                </div>
        </figure>
    )
}

export default QuoteCard