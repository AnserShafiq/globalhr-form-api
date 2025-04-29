// import { auth } from "@/auth";

import Em_Section from "../ui/portal/employers-section";
import JS_Section from "../ui/portal/job-seekers-section";


export default async function Page(){
    // const session = await auth()
    // const user = session?.user

    // const resp = await fetch(`${process.env.PUBLIC_URL}/api/admin/details/${user?.email}`);
    // const data = await resp.json();

    return(
        <div className="max-h-[850px] overflow-none h-full flex flex-col justify-between">
            
            <div className="w-full h-[400px] max-h-[420px] ">
                <JS_Section />
            </div>

            <div className="w-full h-[400px] max-h-[420px]">
                <Em_Section />
            </div>
            
        </div>
    )
}