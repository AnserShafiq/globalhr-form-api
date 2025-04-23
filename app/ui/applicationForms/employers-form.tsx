'use client'

import { useState } from "react"
import InnerFormHeading from "./formsBody/inner-form-heading";
import { InputField, Label } from "./formsBody/inputField";

export default function EmployersForm(){
    const [contactNumber, setContactNumber] = useState<string>("");
    const [companyContact, setCompanyContact] = useState<string>("");
    const [submission, setSubmission] = useState<boolean>(false);
    // const [termsCheck, setTermsCheck] = useState({
    //     one: false,
    //     two: false,
    // })
    return submission ? 
    <div className="bg-gray-300 rounded-md p-6 flex flex-col items-center justify-center min-h-[80vh]">
        <h2 className="text-4xl font-normal font-poppins text-center">Thank you for submitting request, we will reach back to you shortly.</h2>
    </div>
    :
    <div className='bg-gray-300 rounded-md p-6 flex flex-col'>
        <h2 className="text-lg font-normal font-poppins ">Fill the form given below, we will reach back to you shortly.</h2>
        <form className="mt-4">
            {/* Personal Information */}
            <InnerFormHeading>Personal Information</InnerFormHeading>
            <div className='grid grid-cols-2 gap-x-5 gap-y-3 mt-3'>
                <InputField label='First Name' name="firstName" type='text' required />
                <InputField label='Last Name' name="lastName" type='text' required />
                <div className='col-span-2'>
                    <InputField label='Email' name="email" type='email' required />
                </div>
                <InputField label="Contact Number" name="contactNumber" type="tel" required targetValue={contactNumber} targetFunction={setContactNumber} />
                <InputField label='Job Position' name="jobPosition" type='text' required />
            </div>
            {/* Company Information */}
            <InnerFormHeading className='mt-6'>Company Details</InnerFormHeading>
            <div className='grid grid-cols-2 gap-x-5 gap-y-3 mt-3'>
                <InputField label='Company Name' name="companyName" type='text' required />
                <InputField label='Email' name="email" type='email' required />
                <InputField label="Contact Number" name="companyContact" type="tel" required targetValue={companyContact} targetFunction={setCompanyContact} />
                <InputField label='Postal Code' name="postalCode" type='text' required />
                <div className='col-span-2'>
                    <InputField label='Address' name="address" type='text' required />
                </div>
                <InputField label='City' name="city" type='text' required />
                <InputField label='State' name="state" type='text' required />
            </div>
            {/* Other Details */}
            <InnerFormHeading className='mt-6'>Requirement Details</InnerFormHeading>
            <div className='grid grid-cols-2 gap-x-5 gap-y-3 mt-3'>
                <div className="flex flex-col gap-y-2 col-span-2">
                    <Label label="What you prefer to contact you?" name="contactSource" required/>
                    <div className="flex gap-x-3">
                        <label className="flex gap-x-2 items-center cursor-pointer"><input type="radio" name="contactSource" id="contactSource" value="Call" required/> Call</label>
                        <label className="flex gap-x-2 items-center cursor-pointer"><input type="radio" name="contactSource" id="contactSource" value="Email" required/> E-Mail</label>
                    </div>
                </div>
                <InputField label='Email' name="email" type='email' required />
                <InputField label="Contact Number" name="companyContact" type="tel" required targetValue={companyContact} targetFunction={setCompanyContact} />
                <InputField label='Postal Code' name="postalCode" type='text' required />
                <div className='col-span-2'>
                    <InputField label='Address' name="address" type='text' required />
                </div>
                <InputField label='City' name="city" type='text' required />
                <InputField label='State' name="state" type='text' required />
            </div>
            
        </form>
    </div>
}