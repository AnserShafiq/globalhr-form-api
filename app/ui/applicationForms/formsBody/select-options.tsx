import { Label } from "./inputField";



export default function SelectOptions({children,name,label,required, className}:{children: React.ReactNode,name: string,label: string,required: boolean, className?: string}){
    return(
        <div className={`flex flex-col ${className}`}>
            <Label label={label} name={name} required={required} />
            <select name={name} id={name} className="bg-gray-200 rounded-xl p-2">
                {children}
            </select>
        </div>
    )
}