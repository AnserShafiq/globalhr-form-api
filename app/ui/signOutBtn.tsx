'use client'
import { signOut } from "next-auth/react";

export default function SignOutBtn() {
    return (
        <button className="btn btn-primary cursor-pointer bg-red-ghr hover:bg-pink-ghr w-fit text-md mx-auto font-poppins text-gray-100 rounded-md px-3 py-1" onClick={() => signOut({callbackUrl: '/'})}>Sign Out</button>
    )
}
