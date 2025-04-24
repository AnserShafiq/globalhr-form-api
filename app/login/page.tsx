'use client'

import { Eye, EyeOff } from "lucide-react";
import { authenticaion } from "../lib/authenication";
import { useState } from "react";
export default function Page() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = await authenticaion(formData);
        console.log('Result => ',result);
    }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 pb-20 sm:p-20 font-poppins bg-[url('/images/login-bg.png')] bg-size-[65%] bg-no-repeat bg-bottom-right">
        <div className="border border-gray-200 bg-white px-10 py-14 w-[500px] rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold mb-4">Login Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label className='font-[500] text-lg' htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className="bg-gray-200 py-1 px-4 rounded-xl"/>
                </div>
                <div className="flex flex-col gap-1 mt-3">
                    <label className='font-[500] text-lg' htmlFor="password">Password</label>
                    <div className='relative w-full'>
                        <input type={showPassword ? "text":"password"} id="password" name="password" className='bg-gray-200 py-1 px-4 rounded-xl w-full' />
                        <div className="absolute top-2 right-3">
                            {
                                showPassword ? <Eye className="w-4 h-auto text-gray-800 cursor-pointer" onClick={()=> setShowPassword(!showPassword)}/> 
                                : <EyeOff className="w-4 h-auto text-gray-500 cursor-pointer" onClick={()=> setShowPassword(!showPassword)}/> 
                            }
                        </div>
                    </div>
                </div>
                <button type="submit" className="bg-red-ghr text-white px-4 py-2 rounded-md mt-5">Login</button>
            </form>
        </div>
    </div>
  );
}
