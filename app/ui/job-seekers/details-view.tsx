'use client'
import { JS_Details } from "@/app/lib/element";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading_Details from "../loading-display/loading-details";


export default function JS_View({id}:{id:string}){
    const [jobseeker, setJobSeeker] = useState<JS_Details>()
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async() => {
            try{
                const resp = await fetch(`/api/job-seekers/details/${id}`).then((res) => res.json());
                // console.log(resp)
                setJobSeeker(resp[0])
                
            } catch(error){
                console.log('Unable to get JS details.', error)
            } finally{
                setLoading(false);
            }
        }
        fetchData();
    },[id])

    if(loading){
        return(
            <Loading_Details />
        )
    }
    const deleteIt = async() => {
        try{
            const response = await fetch('/api/job-seekers/delete',{
                method:'DELETE',
                body: JSON.stringify([id])
            })
            if(response.ok){
                window.location.href='/portal/job-seekers';
            }
        }catch(error){
            console.error('Unable to delete JS data.',error)
        }
    }

    return(
        <div className="flex flex-col py-8 font-poppins">
            {/* Applicant's details */}
            <h1 className="text-lg font-bold underline tracking-wide mb-2">{`Applicant's Details`}</h1>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Name:`}</span> {`${jobseeker?.firstName} ${jobseeker?.lastName}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Email:`}</span> {`${jobseeker?.email}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Contact number:`}</span> {`${jobseeker?.contactNumber}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Date-of-birth:`}</span> {`${jobseeker?.dateOfBirth}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Gender:`}</span> {`${jobseeker?.gender}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Address:`}</span> {`${jobseeker?.address}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`City:`}</span> {`${jobseeker?.city}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`State:`}</span> {`${jobseeker?.state}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Residential status:`}</span> {`${jobseeker?.residentialStatus}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Ethnicity:`}</span> {`${jobseeker?.ethnicity}`}</h3>
            {/* Education's details */}
            <h1 className="text-lg font-bold underline tracking-wide my-2">{`Education`}</h1>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Qualification:`}</span> {`${jobseeker?.latestQualification}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Institute:`}</span> {`${jobseeker?.institute}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Started:`}</span> {`${jobseeker?.startingYear}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Ended:`}</span> {`${jobseeker?.completionYear}`}</h3>
            {/* Experience's details */}
            <h1 className="text-lg font-bold underline tracking-wide my-2">{`Experience`}</h1>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Experience level:`}</span> {`${jobseeker?.experience}`}</h3>
            {
                jobseeker?.experience === 'experienced' ? <>
                    <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Company 1:`}</span> {`${jobseeker?.companyName_1}`}</h3>
                    <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Company's contact:`}</span> {`${jobseeker?.companyContact_1}`}</h3>
                    <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Job position:`}</span> {`${jobseeker?.jobTitle_1}`}</h3>
                    <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Joining date:`}</span> {`${jobseeker?.startingDate_1}`}</h3>
                    <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Ending date:`}</span> {`${jobseeker?.endingDate_1}`}</h3>
                    <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Reason of leaving:`}</span> {`${jobseeker?.reason_1}`}</h3>
                    {
                        jobseeker.companyName_2 ? <>
                        <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Company 2:`}</span> {`${jobseeker?.companyName_2}`}</h3>
                        <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Company's contact:`}</span> {`${jobseeker?.companyContact_2}`}</h3>
                        <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Job position:`}</span> {`${jobseeker?.jobTitle_2}`}</h3>
                        <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Joining date:`}</span> {`${jobseeker?.startingDate_2}`}</h3>
                        <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Ending date:`}</span> {`${jobseeker?.endingDate_2}`}</h3>
                        <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Reason of leaving:`}</span> {`${jobseeker?.reason_2}`}</h3>
                    </>:null
                }
                </>:null
            }

            {/* Other details */}
            <h1 className="text-lg font-bold underline tracking-wide my-2">{`Others`}</h1>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Shift selected:`}</span> {`${jobseeker?.fullTime_partTime}`}</h3>
            {
                jobseeker?.resume ? <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Resume:`}</span> <Link download={true} href={jobseeker?.resume} className="text-blue-800 underline">View</Link></h3> : null
            }
            <div className='mt-5 '>
                <h3 className=" inline-flex items-center gap-1 text-white px-3 py-2 bg-red-ghr rounded-xl hover:bg-pink-ghr transition-all ease-in-out duration-300 hover:scale-[1.05] cursor-pointer" onClick={() => deleteIt()}>Delete it<Trash2Icon className="w-auto h-4" /></h3>
            </div>
        </div>
    )
}