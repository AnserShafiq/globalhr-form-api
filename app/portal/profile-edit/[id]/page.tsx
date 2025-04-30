import EditUser from "@/app/ui/profile-edit/edit";



export default async function Page(props: {params: Promise<{id:string}>}){
    const params= await props.params
    const id = params.id.toString();
    return(
        <>
            {/* Edit {id} */}
            <EditUser id={id}/>
        </>
    )
}