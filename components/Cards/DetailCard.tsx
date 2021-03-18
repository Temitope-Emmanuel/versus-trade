import React from "react"


interface IProps {
    title:string;
    subtitle:string;
    imageSrc:string
}

const DetailCard:React.FC<IProps> = ({imageSrc,subtitle,title}) => {
    return(
        <div className={`
            m-2 flex justify-center max-w-sm cursor-pointer
            items-center flex-col p-4 rounded-md hover:shadow-lg
            `}>
            <div className="relative">
                {/* <div className="absolute-center w-10 h-10" /> */}
                <img className="object-cover w-16 h-16" src={imageSrc} />
            </div>
            <h4>
                {title}
            </h4>
            <p className="text-center max-w-xs">
                {subtitle}
            </p>
        </div>
    )
}


export default DetailCard