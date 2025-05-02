import Link from "next/link";

interface JS{
    id:string,
    firstName: string,
    lastName: string,
    contactNumber: string,
    city: string,
    jobTitle_1:  string,
    residentialStatus: string
}

export default async function JS_Section(){
    
    const data:[JS] = await fetch(`${process.env.PUBLIC_URL}/api/job-seekers/list/latest`,{next: {revalidate: 60}}).then((res) => res.json());
    // console.log(data)
    return(
        <div className="w-full h-fit overflow-auto flex flex-col">
            <h1 className="text-lg font-semibold font-poppins w-fit mx-auto my-2 underline">Job Seekers</h1>
            <table className="rounded-xl border border-gray-200 w-full h-full overflow-auto flex flex-col">
                <thead className='w-full'>
                    <tr className="grid grid-cols-[20%_15%_15%_20%_20%_10%] font-poppins text-md font-[500] border-y border-gray-200 px-3 ">
                        <td className='border-r border-gray-200 py-1'>
                            Name
                        </td>
                        <td className='border-r border-gray-200 pl-2 py-1'>
                            Contact
                        </td>
                        <td className='border-r border-gray-200 pl-2 py-1'>
                            City
                        </td>
                        <td className='border-r border-gray-200 pl-2 py-1'>
                            Exp. Position
                        </td>
                        <td className='border-r border-gray-200 pl-2 py-1'>
                            Res. Status
                        </td>
                        <td className='pl-2 py-1 flex justify-center'>
                            -
                        </td>
                    </tr>
                </thead>
                <tbody>
                {
                    data.length>0 ? 
                        data.map((js) => 
                            <tr key={js?.id} className="grid grid-cols-[20%_15%_15%_20%_20%_10%] font-poppins text-md font-[300] p-3 border-b border-gray-200 ">
                                <td className='py-1'>
                                    {`${js?.firstName} ${js.lastName}`}
                                </td>
                                <td className='pl-2 py-1'>
                                    {js.contactNumber}
                                </td>
                                <td className='pl-2 py-1'>
                                    {js.city}
                                </td>
                                <td className='px-2 py-1 text-nowrap overflow-hidden'>
                                    {js.jobTitle_1 || '-'}
                                </td>
                                <td className='pl-2 py-1'>
                                    {js.residentialStatus}
                                </td>
                                <td className='pl-2 py-1 flex justify-center'>
                                    <Link className="mt-1 text-sm font-semibold font-poppins w-fit mx-auto" href={`/portal/job-seekers/${js.id}`}>View</Link>
                                </td>
                            </tr>
                        )
                : <tr className="text-md font-semibold tracking-wide font-poppins flex items-center justify-center h-[19rem]">
                    <td>No jobseeker</td>
                </tr>
                }
                </tbody>
            </table>
            <Link href='/portal/job-seekers' className={`${data.length > 0 ?'':'hidden'} mt-4 text-sm text-red-ghr border-b border-black font-poppins w-fit mx-auto`}>Veiw All</Link>
        </div>
    )
}