import React from "react";



export default function LeftHeading({children, className}:{children: React.ReactNode, className?: string}){
    return(
        <div className="relative w-fit mb-2 lg:mb-4">
        <h1 className={`text-2xl lg:text-3xl 2xl:text-4xl font-bold font-poppins pb-1 tracking-wide text-black uppercase ${className}`}>
            {children}
        </h1>
        <div className="absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-red-ghr"></div>
        </div>
    )
}