import { InputField, Label } from "./formsBody/inputField";
import SelectOptions from "./formsBody/select-options";
import LeftHeading from "./left-heading";


export default function ContactUsForm(){
    return <div className="w-full h-full bg-gray-100 flex flex-col justify-center p-10">
        <div className="flex flex-col items-center w-full">
            <LeftHeading>To Leave us a Message</LeftHeading>
        </div>
        <h2 className="text-md lg:text-lg font-normal font-poppins ">Fill the form given below, we will reach back to you shortly.</h2>  
        <form className="flex flex-col gap-5 font-poppins mt-2">
            <div className="grid grid-cols-2 w-full gap-6 min-w-[600px]">
                <InputField type="text" name="name" label="Full name" required/>
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
                    <textarea rows={3} name="message" id="message" className="w-full bg-gray-200 rounded-xl p-2" />
                </div>
                <div className="col-span-2 flex items-center justify-center">
                    <button className="text-gray-100 bg-red-ghr font-semibold tracking-wide px-3 py-2 rounded-xl cursor-pointer mx-auto w-fit transition-all ease-in-out duration-500 hover:scale-[1.05]">Submit</button>
                </div>
            </div>
        </form>

    </div>
}