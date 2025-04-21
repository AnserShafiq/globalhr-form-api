'use client'
import { signOut } from "next-auth/react";

export default function SignOutBtn() {
    return (
        <button className="btn btn-primary cursor-pointer bg-red-ghr hover:bg-pink-ghr" onClick={() => signOut({callbackUrl: '/'})}>Sign Out</button>
    )
}
