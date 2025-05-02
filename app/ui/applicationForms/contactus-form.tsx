'use client'
import React, { useState } from "react";
import { InputField, Label } from "./formsBody/inputField";
import SelectOptions from "./formsBody/select-options";
import LeftHeading from "./left-heading";

export default function ContactUsForm(){
    const [submission, setSubmission] = useState<boolean>(false);

    const handleSubmission = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData)
        try {
            const response =await fetch('/api/contact-us/submit',{method:'POST',body: JSON.stringify(data)})
            if(response.ok){
                setSubmission(true);
                setTimeout(() => {
                    window.location.reload()
                },4000)
            }
        } catch (error) {
            console.log('Api not able to submit message: ', error)
            setSubmission(false);
        }
    }

    return submission ? (
        <div className="w-full h-[500px] bg-gray-100 flex flex-col justify-center justify-center text-center rounded-xl shadow-lg p-10">
            <h1 className="text-xl font-semibold tracking-wide font-poppins">Thank you for reaching us.</h1>
        </div>
    ):(
        <div className="w-full h-full bg-gray-100 flex flex-col justify-center rounded-xl shadow-lg p-10">
            <div className="flex flex-col items-center w-full mb-3">
                <LeftHeading>To Leave us a Message</LeftHeading>
            </div>
            <h2 className="text-md lg:text-lg font-normal font-poppins ">Fill the form given below, we will reach back to you shortly.</h2>  
            <form onSubmit={handleSubmission} className="flex flex-col gap-5 font-poppins mt-2">
                <div className="grid grid-cols-2 w-full gap-6 min-w-[600px]">
                    <InputField type="text" name="fullName" label="Full name" required/>
                    <InputField type="email" name="email" label="E-mail" required/>
                    <InputField type="tel" name="contactNumber" label="Contact Number" required/>
                    <SelectOptions name="contactReason" label="Reason" required={true} className='h-full'>
                        <option defaultChecked disabled className="py-2">Select reason</option>
                        <option value={'Looking for job options'}>Looking for job options</option>
                        <option value={'Needs the candidates'}>Needs the candidates</option>
                        <option value={'Other'}>Other</option>
                    </SelectOptions>
                    <div className="col-span-2">
                        <Label name="message" label="Message" required />
                        <textarea rows={3} name="message" id="message" className="w-full bg-gray-200 rounded-xl p-2" required/>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                        <button className="text-gray-100 bg-red-ghr font-semibold tracking-wide px-3 py-2 rounded-xl cursor-pointer mx-auto w-fit transition-all ease-in-out duration-500 hover:scale-[1.05]">Submit</button>
                    </div>
                </div>
            </form>
    
        </div>)
}