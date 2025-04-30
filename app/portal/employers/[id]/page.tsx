import Emp_View from "@/app/ui/employers/details-view";


export default async function Page(props: {params: Promise<{id:string}>}){
    const params= await props.params;
    const id = params.id.toString()
    return(
        <Emp_View id={id} />
    )
}