import { Copyright } from "lucide-react";


export default function Footer(){
    return(
        <div className="bg-black w-full">
            <div className="container flex flex-col justify-center items-center py-5">
                <h3 className="text-[14px] tracking-wide font-poppins font-[300] text-white inline-flex items-center">
                    <Copyright className='w-[12px] h-auto mr-1'/> Copyright 2022 
                    <span className='mx-1 text-pink-ghr font-[500]'>Global Hr.</span>
                    All right reserved.
                </h3>
                <h5 className='text-[8px] mt-2 text-white font-poppins font-[300]'>Design By: <span className="mx-1 text-pink-ghr">Web Designer Ajax</span> | <span className="mx-1 text-pink-ghr font-[500]">Web Designer in Pickering</span></h5>
            </div>
        </div>
    )
}
