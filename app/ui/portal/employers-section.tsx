import { Emp_List } from "@/app/lib/element";
import Link from "next/link";

export default async function Em_Section(){
    const data:Emp_List[] = await fetch(`${process.env.PUBLIC_URL}/api/employers/list/latest`,{cache: "no-store"}).then((res) => res.json());
    return(
        <div className="w-full h-fit overflow-auto flex flex-col">
            <h1 className="text-lg font-semibold font-poppins w-fit mx-auto my-2 underline">Employers</h1>
            <table className="rounded-xl border border-gray-200 w-full h-full overflow-auto flex flex-col">
                <thead className='w-full'>
                    <tr className="grid grid-cols-[20%_15%_20%_15%_20%_10%] font-poppins text-md font-[500] border-y border-gray-200 px-3 ">
                    <td className="border-r border-gray-200 py-1">Agent name</td>
                    <td className="border-r border-gray-200 pl-2 py-1">Contact</td>
                    <td className="border-r border-gray-200 pl-2 py-1">Company name</td>
                    <td className="border-r border-gray-200 pl-2 py-1">City</td>
                    <td className="border-r border-gray-200 pl-2 py-1">Cand. Required</td>
                        <td className='pl-2 py-1 flex justify-center'>
                            -
                        </td>
                    </tr>
                </thead>
                <tbody className="w-full">
                {
                    data.length > 0 ?                 
                    
                        data.map((Em) => 
                            <tr key={Em?.id} className="grid grid-cols-[20%_15%_20%_15%_20%_10%] font-poppins text-md font-[300] p-3 border-b border-gray-200 ">
                                <td className='py-1'>
                                    {Em.companyName}
                                </td>
                                <td className='pl-2 py-1'>
                                    {Em.contactNumber || '-'}
                                </td>
                                <td className='pl-2 py-1'>
                                    {Em.companyName}
                                </td>
                                <td className='pl-2 py-1'>
                                    {Em.city}
                                </td>
                                <td className='pl-2 py-1'>
                                    {Em.candidatesNeeded}
                                </td>
                                <td className='pl-2 py-1 flex justify-center'>
                                    <Link className="mt-1 text-sm font-semibold font-poppins w-fit mx-auto" href={`/portal/employers/${Em?.id}`}>View</Link>
                                </td>
                            </tr>
                        )
                    
                 : <tr className="text-md font-semibold tracking-wide font-poppins flex items-center justify-center h-[19rem]">
                    <td>No employer</td>
                </tr>
                }
                </tbody>
            </table>
            <Link href={'/portal/employers'} className={`${data.length > 4 ?'':'hidden'} mt-4 text-sm text-red-ghr border-b border-black font-poppins w-fit mx-auto`}>Veiw All</Link>
        </div>
    )
}