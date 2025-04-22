import React from "react";



export default function LeftHeading({children, className}:{children: React.ReactNode, className?: string}){
    return(
        <div className="relative w-fit mb-4">
        <h1 className={`text-4xl font-bold font-poppins pb-1 tracking-wide text-black uppercase ${className}`}>
            {children}
        </h1>
        <div className="absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-red-ghr"></div>
        </div>
    )
}