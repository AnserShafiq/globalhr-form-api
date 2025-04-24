'use client'

import { useState } from "react"
import InnerFormHeading from "./formsBody/inner-form-heading";
import { InputField, Label } from "./formsBody/inputField";
import SelectOptions from "./formsBody/select-options";

export default function EmployersForm(){
    const [contactNumber, setContactNumber] = useState<string>("");
    const [companyContact, setCompanyContact] = useState<string>("");
    const [submission, setSubmission] = useState<boolean>(false);
    const [termsCheck, setTermsCheck] = useState({
        one: false,
        two: false,
    })

    const handleSubmission = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData= new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)
        console.log('Form submitted: ',data)
        try {
            const response = await fetch('/api/employers/application', {
                method: 'POST',
                body: formData,
            })
            if(response.ok){
                setSubmission(true)
            }else{
                alert('Failed to submit application, Try again later.')
            }
        } 
        // eslint-disable-next-line
        catch (error:any) {
            console.error('Error submitting application');
            alert('An error occurred while submitting the application. Please try again later.');
        }
    }

    return submission ? 
    <div className="bg-gray-300 rounded-md p-6 flex flex-col items-center justify-center min-h-[80vh]">
        <h2 className="text-4xl font-normal font-poppins text-center">Thank you for submitting request, we will reach back to you shortly.</h2>
    </div>
    :
    <div className='bg-gray-300 rounded-md p-6 flex flex-col'>
        <h2 className="text-lg font-normal font-poppins ">Fill the form given below, we will reach back to you shortly.</h2>
        <form className="mt-4" onSubmit={handleSubmission}>
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
                <InputField label="Contact Number" name="companyContact" type="tel" required targetValue={companyContact} targetFunction={setCompanyContact} />
                <div className="col-span-2">
                <InputField label='Email' name="companyEmail" type='email' required />
                </div>
                <div className='col-span-2'>
                    <InputField label='Address' name="address" type='text' required />
                </div>
                <InputField label='City' name="city" type='text' required />
                <InputField label='State' name="state" type='text' required />
                <InputField label='Postal Code' name="postalCode" type='text' />
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
                    <SelectOptions label="Target industry" name="industry" required>
                        <option value={''}>Select industry</option>
                        <option value={'Information Technology'}>Information Technology</option>
                        <option value={'Healthcare'}>Healthcare</option>
                        <option value={'Accounting & Finance'}>Accounting & Finance</option>
                        <option value={'Manufacturing'}>Manufacturing</option>
                        <option value={'Retail'}>Retail</option>
                        <option value={'Engineering'}>Engineering</option>
                        <option value={'Construction'}>Construction</option>
                        <option value={'Marketing'}>Marketing</option>
                    </SelectOptions>
                    <InputField label='No. of Candidates Required' name="candidatesNeeded" type='number' required />
                    <Label label="Any additional info you like to share?" name="message"/>
                    <textarea rows={3} className="bg-gray-200 rounded-xl p-2" name='message' id="message" />
                
                    <label className="block cursor-pointer font-[500] font-poppins text-md tracking-wide mt-4"><input type="checkbox" name="term-1" value={'Check'} checked={termsCheck.one === true} onChange={() => setTermsCheck({...termsCheck, one: !termsCheck.one})} required/> I acknowledge that the information provided is true and correct.</label>
                    <label className="block cursor-pointer font-[500] font-poppins text-md tracking-wide mt-2"><input type="checkbox" name="term-2" value={'Check'} checked={termsCheck.two === true} onChange={() => setTermsCheck({...termsCheck, two: !termsCheck.two})} required/> Yes, I would like to receive updates from Global HR regarding news, events, exclusive offers, and marketing initiatives, including the latest employment trends and early access to innovative tools.</label>
                    
                </div>
            </div>
            <div className="col-span-2 flex justify-center mt-8">
                <button disabled={!termsCheck.one || !termsCheck.two} className="bg-blue-ghr text-white font-[500] text-lg tracking-wider font-poppins px-4 py-2 rounded-md bg-red-ghr cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105" type="submit">Submit</button>
            </div>
        </form>
    </div>
}