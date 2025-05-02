import CM_View from "@/app/ui/contact-messages/detail-view"


export default async function Page(props: {params: Promise<{id:string}>}){
    const params = await props.params
    const id = params.id.toString()
    return <CM_View id={id}/>
}