import React from "react"


interface IProps {
    title: string;
    subtitle: string;
    imageSrc: string;
    [key: string]: any
}

const DetailCard: React.FC<IProps> = ({ imageSrc, subtitle, title, ...props }) => {
    return (
        <div className={`
            m-2 flex justify-center max-w-sm cursor-pointer
            items-center flex-col p-4 rounded-md hover:shadow-lg
            `} {...props}>
            <div className="relative">
                {/* <div className="absolute-center w-10 h-10" /> */}
                <img className="object-cover w-20 h-20" src={imageSrc}
                />
            </div>
            <h4 className="my-3 text-center font-semibold"
            >
                {title}
            </h4>
            <p className="text-center max-w-xs italic"
            >
                {subtitle}
            </p>
        </div>
    )
}


export default DetailCard