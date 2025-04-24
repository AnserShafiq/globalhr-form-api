


export default function InnerFormHeading({children, className}:{children: React.ReactNode, className?: string}){
    return(
        <h1 className={`text-lg lg:text-xl 2xl:text-2xl font-semibold capitalize tracking-wide font-poppins ${className} border-b-2 border-red-ghr pb-0 lg:pb-1 w-fit`}>
            {children}
        </h1>
    )
}
