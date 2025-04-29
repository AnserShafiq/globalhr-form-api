import JS_View from "@/app/ui/job-seekers/details-view";



export default async function Page(props: {params: Promise<{id:string}>}){
    const params= await props.params;
    const id = params.id.toString()
    return(
        <JS_View id={id} />
    )
}