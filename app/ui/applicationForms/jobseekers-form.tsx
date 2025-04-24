'use client'
import { useState } from "react";
import InnerFormHeading from "./formsBody/inner-form-heading";
import { InputField, Label, ResumeInput } from "./formsBody/inputField";
import SelectOptions from "./formsBody/select-options";

export default function JobSeekersForms(){
    const [contactNumber, setContactNumber] = useState<string>("");
    const [companyContact1, setCompanyContact1] = useState<string>("");
    const [companyContact2, setCompanyContact2] = useState<string>("");
    const [experience, setExperience] = useState<string>("");
    const [resume, setResume] = useState<File | null>(null);
    const [submission, setSubmission] = useState<boolean>(false);
    const [termsCheck, setTermsCheck] = useState({
        one: false,
        two: false,
    })

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        console.log("Form submitted: ", data);
        try{
            const response = await fetch(`/api/job-seekers/application`, {
                method: 'POST',
                body: formData,
            });
            if(response.ok){
                setResume(null)
                setSubmission(true);

            }else{
                alert('Application submission failed');
            }
        }
        // eslint-disable-next-line
        catch(error:any){
            console.error('Error submitting application');
            alert('An error occurred while submitting the application. Please try again later.');
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0];
            setResume(file);
        }
    }

    
    return submission ? <div className="bg-gray-300 rounded-md p-6 flex flex-col items-center justify-center min-h-[80vh]">
        <h2 className="text-4xl font-normal font-poppins text-center">Application submitted successfully</h2>
    </div> : (
        <div className="bg-gray-300 rounded-md p-6 flex flex-col">
            <h2 className="text-lg font-normal font-poppins ">Fill the form given below, we will reach back to you shortly.</h2>
            <form className="mt-4" onSubmit={handleSubmit}>
                {/* Personal information */}
                <InnerFormHeading>Personal information</InnerFormHeading>
                <div className= 'grid grid-cols-2 gap-x-5 gap-y-3 mt-3'>
                    <InputField label="First Name" name="firstName" type="text" required />
                    <InputField label="Last Name" name="lastName" type="text"  />
                    <InputField label="E Mail" name="email" type="email" required />
                    <InputField label="Contact Number" name="contactNumber" type="tel" required targetValue={contactNumber} targetFunction={setContactNumber} />
                    <InputField label="Date of Birth" name="dateOfBirth" type="date" required />
                    <div className="flex flex-col gap-y-2">
                        <Label label="Gender" name="gender" required />
                        <div className="flex gap-x-3">
                            <label className="flex gap-x-2 items-center cursor-pointer"><input type="radio" name="gender" id="gender" value="male" required/> Male</label>
                            <label className="flex gap-x-2 items-center cursor-pointer"><input type="radio" name="gender" id="gender" value="female" required/> Female</label>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <InputField label="Address" name="address" type="text" required/>
                    </div>
                    <div className="col-span-2">
                        <SelectOptions name="residentialStatus" label="Residential Status" required>
                            <option value="">Select option</option>
                            <option value="Citizen">Citizen</option>
                            <option value="PR">PR</option>
                            <option value="International Student">International Student</option>
                            <option value="Refugee">Refugee</option>
                            <option value="Work Permit">Work Permit</option>
                        </SelectOptions>
                    </div>
                    <div className="col-span-2">
                        <SelectOptions name="ethnicity" label="Ethnicity" required>
                            <option value="">Select option</option>
                            <option value="East Asian(e.g., Chinese, Korean, Japanese)">East Asian(e.g., Chinese, Korean, Japanese)</option>
                            <option value="South Asian(e.g., Indian, Pakistani, Sri Lankan, Bangladeshi)">South Asian(e.g., Indian, Pakistani, Sri Lankan, Bangladeshi)</option>
                            <option value="Southeast Asian(e.g., Filipino, Vietnamese, Thai, Cambodian)">Southeast Asian(e.g., Filipino, Vietnamese, Thai, Cambodian)</option>
                            <option value="Middle Eastern / North African(e.g., Arab, Persian, Berber, Egyptian)">Middle Eastern / North African(e.g., Arab, Persian, Berber, Egyptian)</option>
                            <option value="Black(e.g., African descent, Caribbean descent)">Black(e.g., African descent, Caribbean descent)</option>
                            <option value="White(e.g., European descent, Australian, New Zealander)">White(e.g., European descent, Australian, New Zealander)</option>
                            <option value="Latin American or Hispanic">Latin American or Hispanic</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </SelectOptions>     
                    </div>
                   
                </div>
                {/* Education */}
                <InnerFormHeading className="mt-6">Education</InnerFormHeading>
                <div className= 'grid grid-cols-2 gap-x-5 gap-y-3 mt-3'>
                    <div className="col-span-2">
                        <InputField label="Latest Completed Qualification" name="latestCompletedQualification" type="text" required/>
                    </div>
                    <div className="col-span-2">
                        <InputField label="Institute's Name" name="instituteName" type="text" required/>
                    </div>
                    <InputField label="Starting year" name="startingYear" type="month" required/>
                    <InputField label="Completion year" name="completionYear" type="month" required/>
                 </div>
                 {/* Work Experience */}
                 <InnerFormHeading className="mt-6">Work Experience</InnerFormHeading>
                 <div className="grid grid-cols-2 gap-x-5 gap-y-3 mt-3">
                    <div className="col-span-2">
                        <Label label="Are you an experienced jobseeker or a fresher?" name="experience" required/>
                        <div className="flex gap-x-3">
                            <label className="flex gap-x-2 items-center cursor-pointer"><input type="radio" name="experience" id="experience" value="experienced" checked={experience === "experienced"} onChange={() => setExperience("experienced")} required/> Experienced</label>
                            <label className="flex gap-x-2 items-center cursor-pointer"><input type="radio" name="experience" id="experience" value="fresher" checked={experience === "fresher"} onChange={() => setExperience("fresher")} required/> Fresher</label>
                        </div>
                    </div>
                    {experience === "experienced" && (
                        <>
                        {/* Company 1 */}
                            <div className="col-span-2">
                                <InputField label='Company Name 1' name="companyName1" type="text" required/>
                            </div>
                            <InputField label='Job Title' name="jobTitle1" type="text" required/>
                            <InputField label={`Company's Contact Number`} name="companyContact1" type="tel" required targetValue={companyContact1} targetFunction={setCompanyContact1}/>
                            <InputField label='Starting Date' name="startingDate1" type="date" required/>
                            <InputField label='Ending Date' name="endingDate1" type="date" required/>
                            <div className="col-span-2">
                                <InputField label='Reason for Leaving' name="reasonForLeaving1" type="text" required/>
                            </div>
                            {/* Company 2 */}
                            <div className="col-span-2">
                                <InputField label='Company Name 2' name="companyName2" type="text"/>
                            </div>
                            <InputField label='Job Title' name="jobTitle2" type="text"/>
                            <InputField label={`Company's Contact Number`} name="companyContact2" type="tel" targetValue={companyContact2} targetFunction={setCompanyContact2}/>
                            <InputField label='Starting Date' name="startingDate2" type="date" />
                            <InputField label='Ending Date' name="endingDate2" type="date"/>
                            <div className="col-span-2">
                                <InputField label='Reason for Leaving' name="reasonForLeaving2" type="text"/>
                            </div>
                        </>
                    )}
                 </div>
                <div className="grid grid-cols-2 gap-x-5 gap-y-3 mt-3">
                    <div className="flex flex-col gap-y-2 col-span-2">
                        <Label label="Are you available for Full-time / Part-time?" name="fullTime_partTime" required/>
                        <div className="flex gap-x-3">
                            <label className="flex gap-x-2 items-center cursor-pointer"><input type="radio" name="fullTime_partTime" id="fullTime_partTime" value="Full-time" required/> Full time</label>
                            <label className="flex gap-x-2 items-center cursor-pointer"><input type="radio" name="fullTime_partTime" id="fullTime_partTime" value="Part-time" required/> Part time</label>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <ResumeInput label="Upload Resume" fileName={resume?.name || ''} handleFileChange={handleFileChange} />
                        <label className="block cursor-pointer font-[500] font-poppins text-md tracking-wide mt-4"><input type="checkbox" name="term-1" value={'Check'} checked={termsCheck.one === true} onChange={() => setTermsCheck({...termsCheck, one: !termsCheck.one})} required/> I acknowledge that the information provided is true and correct.</label>
                        <label className="block cursor-pointer font-[500] font-poppins text-md tracking-wide mt-2"><input type="checkbox" name="term-2" value={'Check'} checked={termsCheck.two === true} onChange={() => setTermsCheck({...termsCheck, two: !termsCheck.two})} required/> Yes, I would like to receive updates from Global HR regarding news, events, exclusive offers, and marketing initiatives, including the latest employment trends and early access to innovative tools.</label>
                    </div>
                </div>
                <div className="col-span-2 flex justify-center mt-8">
                    <button disabled={!termsCheck.one || !termsCheck.two} className="bg-blue-ghr text-white font-[500] text-lg tracking-wider font-poppins px-4 py-2 rounded-md bg-red-ghr cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}