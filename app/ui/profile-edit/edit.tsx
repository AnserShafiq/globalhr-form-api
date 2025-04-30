'use client'
import { User } from "@/app/lib/element";
import React, { useEffect, useState } from "react";



export default function EditUser({id}:{id:string}){
    const [user, setUser] = useState<User>();
    const [currentPassword, setCurrentPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [repeatNewPassword, setRepeatNewPassword] = useState<string>('')
    const [error, setError] = useState<string>('');
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
            <div>
                Loading your profile...
            </div>
        )
    }

    const CheckCurrent = (password: string) => {
        if(user?.password?.includes(password) || user?.password === password ){
            setCurrentPassword(password);
            setError('');
        }else{
            setError('E1');
        }
    }
    const CheckNew = (password: string) => {
        if(currentPassword === password){
            setError('E2')
            setNewPassword('');
        }else {
            // Proper password complexity check
            const hasChar = /[A-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            
            if (password.length < 8 || !hasNumber || !hasSpecialChar || !hasChar) {
                setError('E3');
                setNewPassword('');
            } else {
                setError('');
                setNewPassword(password);
            }
        }
    }

    const RecheckNew = (password:string) => {
        if(newPassword.includes(password) || newPassword === password ){
            setError('')
            setRepeatNewPassword(password);
        }else{
            setError('E4');
        }
    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // eslint-disable-next-line
        let data:any;
        const formData = new FormData(e.currentTarget);
        if(repeatNewPassword){
            data = {
                id: user?.id,
                name: formData.get('name'),
                email: user?.email,
                contactNumber: formData.get('contactNumber'), 
                password: repeatNewPassword,
            }
            const resp = await fetch('/api/admin/edit/with-password',{
                method: "POST",
                body: JSON.stringify(data)
            })
            if(resp.ok){
                fetchData(id)
            }
        }else{
            data = {
                id: user?.id,
                name: formData.get('name'),
                email: user?.email,
                contactNumber: formData.get('contactNumber'), 
            }
            const resp = await fetch('/api/admin/edit/without-password',{
                method: "POST",
                body: JSON.stringify(data)
            })
            if(resp.ok){
                fetchData(id);
            }
        }
        console.log(formData)
    }

    return(
        <div className="flex flex-col py-18 font-poppins">
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <h1 className="text-lg font-bold underline tracking-wide mb-2">{`User Details`}</h1>
                <div className="flex flex-col">
                    <label htmlFor={'name'} className="text-md lg:text-lg font-medium font-poppins capitalize relative w-fit">
                        Full name
                    </label>
                    <input type={'text'} defaultValue={user?.name} name={'name'} id={'name'} className={`bg-gray-200 rounded-xl p-2 `} />
                </div>
                <div className="grid grid-cols-2 gap-7 mt-4">
                    <div className="flex flex-col">
                        <label htmlFor={'email'} className="text-md lg:text-lg font-medium font-poppins capitalize relative w-fit">
                            E-mail
                        </label>
                        <input type={'email'} disabled name={'email'} defaultValue={user?.email} id={'email'} className={`bg-gray-200 rounded-xl p-2 cursor-no-drop text-zinc-700`} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor={'contactNumber'} className="text-md lg:text-lg font-medium font-poppins capitalize relative w-fit">
                            Contact Number
                        </label>
                        <input type={'text'} name={'contactNumber'} defaultValue={user?.contactNumber} id={'contactNumber'} className={`bg-gray-200 rounded-xl p-2`} />
                    </div>
                </div>
                <h1 className="text-lg font-bold underline tracking-wide mb-2 mt-4">{`To Change Password`}</h1>
                <div className="grid grid-cols-3 gap-7 min-h-[150px]">
                    <div className="flex flex-col">
                        <label htmlFor={'current-password'} className="text-md lg:text-lg font-medium font-poppins capitalize relative w-fit">
                            Current password
                        </label>
                        <input type={'password'} onChange={(e) => CheckCurrent(e.target.value)} name={'current-password'} id={'current-password'} className={`bg-gray-200 rounded-xl p-2 `} />
                        {
                            error === 'E1' ? <h4 className="text-red-ghr font-bold uppercase text-xs mt-1">Incorrect password</h4>: null
                        }
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor={'new-password'} className="text-md lg:text-lg font-medium font-poppins capitalize relative w-fit">
                            New password
                        </label>
                        <input type={'password'} name={'new-password'} onChange={(e) => CheckNew(e.target.value)} id={'new-password'} className={`bg-gray-200 rounded-xl p-2 `} required={currentPassword.length > 8 ? true : false}/>
                        {
                            error === 'E2' ? <h4 className="text-red-ghr font-bold uppercase text-xs mt-1">New password should be different from current one</h4>
                            : error === 'E3' ? <h4 className="text-red-ghr font-bold uppercase text-xs mt-1">{`must have length >= 8 and atleast one character, one number and one special character[!@#$%^&*(),.?":]`}</h4>: null
                        }
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor={'re-new-password'} className="text-md lg:text-lg font-medium font-poppins capitalize relative w-fit">
                            Re-enter New password
                        </label>
                        <input type={'password'} name={'re-new-password'} onChange={(e) => RecheckNew(e.target.value)} id={'re-new-password'} className={`bg-gray-200 rounded-xl p-2 `} required={currentPassword.length > 8 ? true : false}/>
                        {
                            error === 'E4' ? <h4 className="text-red-ghr font-bold uppercase text-xs mt-1">{`New password doesn't match.`}</h4>: null
                        }
                    </div>

                </div>
                <button className="text-md px-4 py-2 rounded-xl bg-red-ghr text-gray-100 font-semibold tracking-wide w-fit mx-auto cursor-pointer" type='submit'>Update</button>
            </form>
        </div>
    )
}