import React from "react"
import {ButtonProps} from "@material-ui/core/Button"
import {BaseModel} from "core/models/BaseModel"

interface IProps extends BaseModel,ButtonProps {
    // [key:string]:any
    style?:any;
}



const Button:React.FC<IProps> = ({children,className,style,...props}) => {
    return(
        <button className={`
        flex items-center justify-center px-4 py-1 border 
        border-transparent text-base font-medium rounded-md 
        text-red-700 bg-red-100 hover:bg-red-200 
        md:py-2 md:text-lg md:px-5 ${className}`}
         style={style ? style : undefined} {...props}>
            {children}
        </button>
    )
}

export default Button