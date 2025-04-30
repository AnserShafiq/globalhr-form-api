'use client'
import { Emp_Details } from "@/app/lib/element";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Emp_View({id}:{id:string}){
    const [employer, setEmployer] = useState<Emp_Details>()
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async() => {
            try{
                const resp = await fetch(`/api/employers/details/${id}`).then((res) => res.json());
                // console.log(resp)
                setEmployer(resp[0])
                
            } catch(error){
                console.log('Unable to get EMP details.', error)
            } finally{
                setLoading(false);
            }
        }
        fetchData();
    },[id])

    if(loading){
        return(
            <div>
                <h4>{`Loading Employer's Data`}</h4>
            </div>
        )
    }
    const deleteIt = async() => {
        try{
            const response = await fetch('/api/employers/delete',{
                method:'DELETE',
                body: JSON.stringify([id])
            })
            if(response.ok){
                window.location.href='/portal/employers';
            }
        }catch(error){
            console.error('Unable to delete EMP data.',error)
        }
    }

    return(
        <div className="flex flex-col py-8 font-poppins">
            {/* Applicant's details */}
            <h1 className="text-lg font-bold underline tracking-wide mb-2">{`Employer's Application`}</h1>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Name:`}</span> {`${employer?.firstName} ${employer?.lastName}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Email:`}</span> {`${employer?.email}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Contact number:`}</span> {`${employer?.contactNumber}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Applicant's post:`}</span> {`${employer?.jobPosition}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Company name:`}</span> {`${employer?.companyName}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Company's contact:`}</span> {`${employer?.companyContact}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Address:`}</span> {`${employer?.address}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`City:`}</span> {`${employer?.city}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`State:`}</span> {`${employer?.state}`}</h3>
            {
                employer?.postalCode ?  <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Postal Code:`}</span> {`${employer?.postalCode}`}</h3> : null
            }
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Preferred contact source:`}</span> {`${employer?.contactSource}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Industry:`}</span> {`${employer?.industry}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Candidates Required:`}</span> {`${employer?.candidatesNeeded}`}</h3>
            {
                employer?.message ? <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Message:`}</span> {`${employer?.message}`}</h3> : null
            }
            <div className='mt-5 '>
                <h3 className=" inline-flex items-center gap-1 text-white px-3 py-2 bg-red-ghr rounded-xl hover:bg-pink-ghr transition-all ease-in-out duration-300 hover:scale-[1.05] cursor-pointer" onClick={() => deleteIt()}>Delete it<Trash2Icon className="w-auto h-4" /></h3>
            </div>
        </div>
    )
}