'use client'
import { JS_Details } from "@/app/lib/element";
import Link from "next/link";
import { useEffect, useState } from "react";


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
            <div>
                <h4>{`Loading Job Seeker's Data`}</h4>
            </div>
        )
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
        </div>
    )
}