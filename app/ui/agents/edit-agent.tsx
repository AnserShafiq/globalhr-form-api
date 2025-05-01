'use client'
import { User } from "@/app/lib/element";
import React, { useEffect, useState } from "react";
import Loading_Details from "../loading-display/loading-details";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";



export default function EditAgent({id}:{id:string}){
    const [user, setUser] = useState<User>();
    const [message, setMessage] = useState<string>('')
    // const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    
    const fetchData = async(id:string) => {
        setLoading(true)
        try{
            // eslint-disable-next-line
            const data:any = await fetch(`/api/admin/edit/${id}`).then(res => res.json());
            // console.log()
            setUser(data[0]);
        }catch{
            console.error('Unable to get Admin details')
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData(id)
    }, [id]);


    if(loading){
        return(
            <Loading_Details />
        )
    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        
        const data = {
            id: id,
            name: formData.get('name'),
            email: formData.get('email'),
            contactNumber: formData.get('contactNumber'),
            password: formData.get('password'),
            role: formData.get('role'),
        }
        const response = await fetch('/api/admin/edit/agent',{
            method: 'POST',
            body: JSON.stringify(data),
        })
        if(response.ok){
            setMessage('Agent got updated successfully.')
        }
        console.log(data)
    }
    return(
        <div className="flex flex-col py-18 font-poppins">
            <Link href='/portal/all-agents' className="flex items-center text-xs border-b w-fit mb-3"><ArrowLeft className='h-3 w-auto'/> back</Link>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="inline-flex items-end gap-3 mb-2">
                <h1 className="text-lg font-bold underline tracking-wide">{`Agent Details - Edit`} </h1>
                {
                    message ? <p className="text-xs font-[500] text-green-500 pb-1">{message}</p>:null
                }
                </div>
                <div className="flex flex-col">
                    <label htmlFor={'name'} className="text-md lg:text-lg font-medium font-poppins capitalize relative w-fit">
                        Name
                    </label>
                    <input type={'text'} defaultValue={user?.name} name={'name'} id={'name'} className={`bg-gray-200 rounded-xl p-2 `} />
                </div>
                <div className="grid grid-cols-2 gap-x-7 gap-y-4 mt-4">
                    <div className="flex flex-col">
                        <label htmlFor={'email'} className="text-md lg:text-lg font-medium font-poppins capitalize relative w-fit">
                            E-mail
                        </label>
                        <input type={'email'} name={'email'} defaultValue={user?.email} id={'email'} className={`bg-gray-200 rounded-xl p-2`} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor={'contactNumber'} className="text-md lg:text-lg font-medium font-poppins capitalize relative w-fit">
                            Contact Number
                        </label>
                        <input type={'text'} name={'contactNumber'} defaultValue={user?.contactNumber} id={'contactNumber'} className={`bg-gray-200 rounded-xl p-2`} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor={'password'} className="text-md lg:text-lg font-medium font-poppins capitalize relative w-fit">
                            Password
                        </label>
                        <input type={'password'} name={'password'} defaultValue={user?.password || ''} id={'password'} className={`bg-gray-200 rounded-xl p-2`} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor={'role'} className="text-md lg:text-lg font-medium font-poppins capitalize relative w-fit">
                            Role
                        </label>
                        <select defaultValue={user?.role} name='role' id='role' className="bg-gray-200 rounded-xl p-2">
                            <option value={'recruiter'}>Recruiter</option>
                            <option value={'administrator'}>Administrator</option>
                            <option value={'manager'}>Manager</option>
                        </select>
                    </div>
                </div>
                
                <button className="text-md mt-6 px-4 py-2 rounded-xl bg-red-ghr text-gray-100 font-semibold tracking-wide w-fit mx-auto cursor-pointer" type='submit'>Update</button>
            </form>
        </div>
    )
}