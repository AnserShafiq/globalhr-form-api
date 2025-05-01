

export default function Loading_JS(){
    return(
        <div className='w-full h-full overflow-auto flex flex-col relative font-poppins animate-loading'>
            
            <div className="rounded w-full bg-gray-200 mx-auto h-12 my-2" />
            <div className="rounded w-full h-[730px] bg-gray-200"/>
            <div className="flex w-fill items-center justify-center gap-3 mt-4">
                <div className="h-8 w-8 rounded-full bg-gray-300 "/>
                <div className="h-8 w-8 rounded-full bg-gray-300 "/>
                <div className="h-8 w-8 rounded-full bg-gray-300 "/>
            </div>
        </div>
    )
}