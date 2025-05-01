import EditAgent from "@/app/ui/agents/edit-agent";



export default async function Page(props:{params: {id:string}}){
    const {id} = await props.params;
    return <EditAgent id={id}/>
}