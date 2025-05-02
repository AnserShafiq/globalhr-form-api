import { auth } from "@/auth";
import SideBar from "../ui/portal/sideBar";
import { User } from "../lib/element";

export default async function Layout({children}:{children: React.ReactNode}){
    const session = await auth()
    const user = session?.user

    const resp = await fetch(`${process.env.PUBLIC_URL}/api/admin/details/${user?.email}`);
    const data = await resp.json();
    const userData: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
        contactNumber : data.contactNumber
    }



    return(
        <section className="grid grid-cols-[20%_80%] container min-h-[92.1vh] h-full gap-10 py-8">
            <SideBar User={userData}/>
            {children}
        </section>
    )
}