import React from "react"
import Image from "next/image"
import {makeStyles,createStyles} from "@material-ui/core"

interface IProps {
    title:string;
    subtitle:string;
    imageSrc?:string;
    icon?:any
    [key:string]:any
}

const useStyles = makeStyles((theme) => createStyles({
    root:{
        "& svg":{
            fontSize:"5rem",
            opacity:.75
        }
    }
}))

const DetailCard:React.FC<IProps> = ({imageSrc,icon,subtitle,title,...props}) => {
    const classes = useStyles()
    return(
        <div className={`
            m-2 flex justify-center max-w-sm cursor-pointer ${classes.root}
            items-center flex-col p-4 rounded-md hover:shadow-lg
            `} {...props}>
            <div className="relative">
                {
                    imageSrc &&
                    <Image width="70" height="70" layout="intrinsic"
                    src={`/${imageSrc}`}
                        data-aos="fade-down" data-aos-delay={300}
                    />
                }
                {icon && 
                icon
                }
            </div>
            <h4 className="my-3 text-center font-semibold"
                data-aos="fade-down" data-aos-delay={600}
            >
                {title}
            </h4>
            <p className="text-center max-w-xs italic"
                data-aos="fade-down" data-aos-delay={800}
            >
                {subtitle}
            </p>
        </div>
    )
}


export default DetailCard