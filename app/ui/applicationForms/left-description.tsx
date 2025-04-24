


export default function LeftDesc({children, className}:{children: React.ReactNode, className?: string}){
    return(
        <p className={`text-md 2xl:text-lg font-[500] font-poppins tracking-wide leading-normal text-black ${className}`}>
            {children}
        </p>
    )
}

