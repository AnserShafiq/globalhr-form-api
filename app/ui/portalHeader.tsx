'use server'
import { auth } from "@/auth";
import Image from "next/image";

export default async function SectionThree () {
    const session= await auth()
    const user = await session?.user;
    return(
        <>
        <div className=" hidden lg:flex justify-between items-center py-2 bg-[#292929] ">
            <div className="flex items-center justify-start container">
                <h3 className="text-white font-poppins font-[300] tracking-wide text-sm">Welcome to <span className="font-poppins font-[700] text-red-ghr">Portal.</span></h3>
            </div>
        </div>
        <div className="flex justify-between items-center px-[15px] py-5 lg:py-4 lg:px-0 shadow-md">
            <div className="flex items-center justify-between gap-4 container">
                <Image src="/images/icon.png" alt="GlobalHR" className="w-full max-w-[242.3px] lg:max-w-[22%] h-header-icon" width={1000} height={1000} />
                <div className='hidden lg:flex items-center justify-center gap-8'>
                    <h3 className='text-sm font-poppins tracking-wide font-semibold border-b-2 border-black text-red-ghr'>Hello {user?.name}</h3>
                </div>
            </div>
        </div>
        </>
    )
}
