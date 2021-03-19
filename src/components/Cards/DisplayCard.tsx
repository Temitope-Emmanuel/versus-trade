import React from "react"
import {FaRegLightbulb} from "react-icons/fa"



const DisplayCard = () => {

    return(
        <div className={
            `m-3 max-w-xs md:max-w-sm flex-auto p-3 md:py-7 rounded-md flex text-white items-center background-gradient
            justify-between w-full md:w-auto`
        }>
            <div>
                <p>
                    New Accounts
                </p>
                <p>
                    586,356
                </p>
            </div>
            <FaRegLightbulb className=" bg-gray-200 m-3 w-20 h-20 p-5 rounded-full text-blue-500" />
        </div>
    )
}

export default DisplayCard