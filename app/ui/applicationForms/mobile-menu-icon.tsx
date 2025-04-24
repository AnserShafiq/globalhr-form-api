'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"

function SideMenu({left}:{left:string}){
    return(
        <div className={`fixed top-0 ${left} shadow-xl shadow-gray-400 transition-all duration-700 w-[65vw] h-screen bg-gray-100 z-1000 py-[58px] px-[16px] flex flex-col items-center`}>
            <Link href='https://www.hrglobal.ca' className="mb-[20px]"><Image className="max-w-[190px] max-h-[70px] object-fit" src='/images/icon.png' width={1000} height={1000} alt="Global HR - Mobile Side Menu Icon"/></Link>
            <div className="flex flex-col w-full">
                <Link className="text-[15px] font-semibold font-poppins leading-[50px] border-b border-[#ebebeb]" href={'https://www.hrglobal.ca'}>Home</Link>
                <Link className="text-[15px] font-semibold font-poppins leading-[50px] border-b border-[#ebebeb]" href={'https://www.hrglobal.ca/about-us/'}>About Us</Link>
                <Link className="text-[15px] font-semibold font-poppins leading-[50px] border-b border-[#ebebeb]" href={'https://www.hrglobal.ca/candidates/'}>Candidates</Link>
                <Link className="text-[15px] font-semibold font-poppins leading-[50px] border-b border-[#ebebeb]" href={'https://www.hrglobal.ca/employers/'}>Employers</Link>
                <Link className="text-[15px] font-semibold font-poppins leading-[50px] border-b border-[#ebebeb]" href={'https://www.hrglobal.ca/contact/'}>Contact</Link>
            </div>
            <div className='flex flex-col items-center mt-[32px] gap-4'>
                <Link href='https://www.hrglobal.ca/contact/' className="relative inline-flex items-center gap-2 overflow-hidden px-[25px] py-3 bg-pink-ghr text-black font-poppins font-bold tracking-wide text-[13px] rounded-xs group">
                    <Image src="/icons/apply.png" alt="Apply Now - Global HR" className="w-4 h-4" width={1000} height={1000} />
                    <span className="relative z-10">Apply Now</span>
                    {/* Static glow overlay */}
                    <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    {/* Animated shine */}
                    <span className="absolute top-0 left-[-100%] w-full h-full bg-[linear-gradient(to_right,#ffffff22_0%,#ffffff66_50%,#ffffff22_100%)] opacity-50 skew-x-[-10deg] animate-none group-hover:animate-shine"></span>
                </Link>
                <Link href='https://www.hrglobal.ca/contact/' className="relative inline-flex items-center gap-2 overflow-hidden px-[25px] py-3 bg-red-ghr hover:bg-pink-ghr text-white font-poppins font-bold tracking-wide text-[13px] rounded-xs group">
                    <Image src="/icons/call.png" alt="Contact us - Global HR" className="w-4 h-4" width={1000} height={1000} />
                    <span className="relative z-10">Contact us</span>
                    {/* Static glow overlay */}
                    <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    {/* Animated shine */}
                    <span className="absolute top-0 left-[-100%] w-full h-full bg-[linear-gradient(to_right,#ffffff22_0%,#ffffff66_50%,#ffffff22_100%)] opacity-50 skew-x-[-10deg] animate-none group-hover:animate-shine"></span>
                </Link>
            </div>
        </div>
    )
}

export default function MobileMenuIcon(){
    const [openMenu, setOpenMenu] = useState<boolean>(false);


    return(
        <>
            <div className={`flex flex-col justify-center gap-[5.5px] w-[30px] cursor-pointer relative`} onClick={() => setOpenMenu(!openMenu)}>
                <div className={`h-[2px] w-full border border-black transition-rotation duration-700 ${openMenu ? 'rotate-45 relative':''}`}/>
                <div className={`h-[2px] w-full border border-black transition-rotation duration-700 ${openMenu ? 'hidden': ''} `}/>
                <div className={`h-[2px] w-full border border-black transition-rotation duration-700 ${openMenu ?  '-rotate-45 absolute top-0': ''}`}/>
            </div>
            <SideMenu left={openMenu ? 'left-0': '-left-100'}/>
        </>
    )
}