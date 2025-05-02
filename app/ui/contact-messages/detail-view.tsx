'use client'
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import Loading_Details from "../loading-display/loading-details";
import { ContactMessage } from "@/app/lib/element";

export default function CM_View({id}:{id:string}){
    const [message, setMessage] = useState<ContactMessage>()
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async() => {
            try{
                const resp = await fetch(`/api/contact-us/details/${id}`).then((res) => res.json());
                // console.log(resp)
                setMessage(resp[0])
                
            } catch(error){
                console.log('Unable to get message details.', error)
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
            const response = await fetch('/api/contact-us/delete',{
                method:'DELETE',
                body: JSON.stringify([id])
            })
            if(response.ok){
                window.location.href='/portal/contact-messages';
            }
        }catch(error){
            console.error('Unable to delete message data.',error)
        }
    }

    return(
        <div className="flex flex-col py-8 font-poppins">
            {/* Message's details */}
            <h1 className="text-lg font-bold underline tracking-wide mb-2">{`Message's Details`}</h1>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Sender's Name:`}</span> {`${message?.name}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Email:`}</span> {`${message?.email}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Contact number:`}</span> {`${message?.contactNumber}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Reason:`}</span> {`${message?.reason}`}</h3>
            <h3 className="grid grid-cols-[20%_80%] text-md py-1"><span className="font-semibold tracking-wide">{`Message:`}</span> {`${message?.message}`}</h3>
            <div className='mt-5 '>
                <h3 className=" inline-flex items-center gap-1 text-white px-3 py-2 bg-red-ghr rounded-xl hover:bg-pink-ghr transition-all ease-in-out duration-300 hover:scale-[1.05] cursor-pointer" onClick={() => deleteIt()}>Delete it<Trash2Icon className="w-auto h-4" /></h3>
            </div>
        </div>
    )
}