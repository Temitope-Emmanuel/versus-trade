import React from "react"
import { FaQuoteLeft,FaQuoteRight } from 'react-icons/fa'


const QuoteCard = () => {
    return (
        <figure className="md:flex bg-gray-100 rounded-xl p-4 md:p-0 m-3 md:max-w-md">
            {/* <img className="w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/quoteImage.jpg" alt="" width="384" height="512"/> */}
            <img className=" w-32 h-32 md:rounded-none rounded-full mx-auto object-cover" src="/quoteImage.jpg" alt=""/>
                <div className="pt-3 md:p-4 text-center md:text-left">
                    <blockquote>
                        <FaQuoteLeft className="mx-auto"/>
                        <p className="text-lg font-semibold">
                            Tailwind CSS is the only framework that I've seen scale
                            on large teams. It’s easy to customize, adapts to any design,
                            and the build size is tiny.
                        </p>
                        <FaQuoteRight className="mx-auto"/>
                    </blockquote>
                    <figcaption className="font-medium">
                        <div className="text-cyan-600">
                            Sarah Dayan
                        </div>
                        <div className="text-gray-500">
                            Staff Engineer, Algolia
                        </div>
                    </figcaption>
                </div>
        </figure>
    )
}


export default QuoteCard