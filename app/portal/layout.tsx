import SideBar from "../ui/portal/sideBar";



export default function Layout({children}:{children: React.ReactNode}){
    return(
        <section className="grid grid-cols-[20%_80%] container min-h-[92.1vh] h-full gap-10 pt-8">
            <SideBar />
            {children}
        </section>
    )
}