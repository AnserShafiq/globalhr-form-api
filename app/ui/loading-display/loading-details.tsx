'use client'
import { TailSpin } from "react-loader-spinner"

export default function Loading_Details(){
    return(
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <TailSpin visible={true} height={60} width={60} color="var(--red-ghr)" ariaLabel="tail-spin-loading" radius={2}/>
            <h4 className="font-poppins text-sm mt-3 font-[500] tracking-wide uppercase text-red-ghr">Loading...</h4>
        </div>
    )
}