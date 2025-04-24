'use server'
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import SignOutBtn from "./signOutBtn";
import MobileMenuIcon from "./applicationForms/mobile-menu-icon";

const SectionOne = () => {
    return(
        <div className=" hidden lg:flex justify-between items-center p-4 bg-[#292929] ">
            <div className="flex items-center justify-between gap-4 container">
                <h3 className="text-white font-poppins font-[300] tracking-wide text-sm">Welcome to <span className="font-poppins font-[700] text-red-ghr">Global HR</span></h3>
                <div className="flex items-center justify-end gap-6">
                    <Link href={'tel:+16479015000'} className="text-white inline-flex items-center gap-1 font-poppins font-[300] tracking-wide text-sm hover:text-pink-ghr"><Image src="/icons/call-2.png" alt="Phone" className="w-[15px] h-auto" width={1000} height={1000} />647-901-5000</Link>
                    <Link href={'mailto:info@hrglobal.ca'} className="text-white inline-flex items-center gap-1 font-poppins font-[300] tracking-wide text-sm hover:text-pink-ghr"><Image src="/icons/mail.png" alt="Email" className="w-[15px] h-auto" width={1000} height={1000} />info@hrglobal.ca</Link>
                </div>
            </div>
        </div>
    )
}

const SectionTwo = async() => {
    const session = await auth()
    const user = session?.user;
    return(
        <div className="flex justify-between items-center px-[15px] py-5 lg:p-4 shadow-md">
            <div className="flex items-center justify-between gap-4 container">
                <Image src="/images/icon.png" alt="GlobalHR" className="w-full max-w-[242.3px] lg:max-w-[22%] h-header-icon" width={1000} height={1000} />
                <div className='hidden lg:flex items-center justify-center gap-8'>
                    <Link className='font-poppins font-semibold tracking-normal h-full text-[16px]' href='https://www.hrglobal.ca/'>Home</Link>
                    <Link className='font-poppins font-semibold tracking-normal h-full text-[16px]' href='https://www.hrglobal.ca/about-us/'>About Us</Link>
                    <Link className='font-poppins font-semibold tracking-normal h-full text-[16px]' href='https://www.hrglobal.ca/candidates/'>Candidates</Link>
                    <Link className='font-poppins font-semibold tracking-normal h-full text-[16px]' href='https://www.hrglobal.ca/employers/'>Employers</Link>
                    <Link className='font-poppins font-semibold tracking-normal h-full text-[16px]' href='https://www.hrglobal.ca/contact/'>Contact</Link>
                </div>
                <div className="hidden lg:flex items-center justify-end gap-4 w-[22%]">       
                    <h3>{user?.name}</h3>             
                    {
                        user?.name ? <SignOutBtn /> : null
                    }
                    <Link href='https://www.hrglobal.ca/contact/' className="relative inline-flex items-center gap-2 overflow-hidden px-[25px] py-3 bg-red-ghr hover:bg-pink-ghr text-white font-poppins font-bold tracking-wide text-[15px] rounded-xs group">
                        <Image src="/icons/call.png" alt="Call" className="w-6 h-6" width={1000} height={1000} />
                        <span className="relative z-10">Contact us</span>
                        {/* Static glow overlay */}
                        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                        {/* Animated shine */}
                        <span className="absolute top-0 left-[-100%] w-full h-full bg-[linear-gradient(to_right,#ffffff22_0%,#ffffff66_50%,#ffffff22_100%)] opacity-50 skew-x-[-10deg] animate-none group-hover:animate-shine"></span>
                    </Link>

                </div>
                <div className="flex lg:hidden items-center justify-end">
                    <MobileMenuIcon />
                </div>
            </div>
        </div>
    )
}
 
export default async function Header() {

    return(
        <>
            <SectionOne />
            <SectionTwo />
        </>
    )
}
