'use client'
import { User } from "@/app/lib/element";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import SignOutBtn from "../signOutBtn";


export default function SideBar({User}:{User: User}){
    const [sideMenu,setSideMenu] = useState(

        User.role === 'administrator' ? [
            {link: '/portal', name: 'Home', active: true},
            {link: '/portal/job-seekers', name: 'Job seekers', active: false},
            {link: '/portal/employers', name: 'Employers', active: false},
            {link: '/portal/contact-messages', name: 'Contact messages', active: false},
            {link: '/portal/all-agents', name: 'All agents', active: false},
            {link: '/portal/add-new-agent', name: 'Add new agent', active: false},
        ]:[
            {link: '/portal', name: 'Home', active: true},
            {link: '/portal/job-seekers', name: 'Job seekers', active: false},
            {link: '/portal/employers', name: 'Employers', active: false},
            {link: '/portal/contact-messages', name: 'Contact messages', active: false},
        ]

    )
    const pathname = usePathname();

    useEffect(() => {
        setSideMenu((menuItem) => 
            menuItem.map(item => ({
                ...item,
                active: pathname === item.link ? true : false,
            }))
        )
    },[pathname])
    
    return(
        <div className="w-full lg:h-[87vh] 3xl:h-[800px] bg-gray-200 z-100 rounded-xl shadow-xl sticky top-10 p-8 flex flex-col justify-between">
            <div className="flex flex-col gap-3 w-full">
                {
                    sideMenu.map((item, index) => <Link className={`font-poppins text-sm font-[500] tracking-wide pb-1 hover:text-red-ghr transition-all ease-in-out duration-300 ${item.active ? 'border-b border-gray-900 text-red-ghr': 'text-gray-700' } ${index < sideMenu.length -1 ? 'border-b border-gray-400 ' : ''} cursor-pointer`} key={index} href={item.link}>{item.name}</Link>)
                }
            </div>
            <div className='flex flex-col gap-3 w-full overflow-hidden'>
                <h3 className="font-poppins text-sm font-[500] tracking-wide pb-1 border-b border-gray-400 text-gray-700">{User.name}</h3>
                <h3 className="font-poppins text-sm font-[500] tracking-wide pb-1 border-b border-gray-400 text-gray-700">{User.email}</h3>
                <h3 className="font-poppins text-sm font-[500] tracking-wide pb-1 border-b border-gray-400 text-gray-700">{User.role}</h3>
                <h3 className="font-poppins text-sm font-[500] tracking-wide pb-1 border-b border-gray-400 text-gray-700">{User.contactNumber}</h3>
                <Link className='text-sm text-blue-900 font-poppins font-semibold inline-flex items-center justify-between' href={`/portal/profile-edit/${User.id}`}>Edit profile <ArrowRightIcon className='w-4 h-auto'/></Link>
                <SignOutBtn />
            </div>
        </div>
    )
}