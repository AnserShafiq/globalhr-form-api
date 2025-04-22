'use client'
import { Asterisk } from "lucide-react";

export function Label({label ,name, className, required}:{label: string, name: string, className?: string, required?: boolean}){
    return(
        <label htmlFor={name} className={`text-lg font-medium font-poppins capitalize relative w-fit ${className}`}>
            {label}
            {required && <Asterisk  className="w-3 h-auto text-red-ghr absolute top-0 -right-4"/>}
        </label>
    )
}

export function ResumeInput({label, handleFileChange, fileName}:{label: string, handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void, fileName: string}){
    
    return(
        <div className="flex flex-col gap-2">
            <label htmlFor={'resume'} className="text-lg font-medium font-poppins capitalize relative w-fit">
                {label}
                <Asterisk  className="w-3 h-auto text-red-ghr absolute top-0 -right-4"/>
            </label>
            <div className="flex gap-2 items-center">
                {/* Hidden file input */}
                <input type="file" id="resumeUpload" name="resume" required accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange}/>
                <label htmlFor="resumeUpload" className="cursor-pointer bg-gray-100 text-gray-900 px-4 py-2 rounded-md w-fit text-sm">
                    Choose File
                </label>

                {/* File name display */}
                <span className="text-gray-700 text-sm">{fileName || "No file chosen"}</span>
            </div>
        </div>

    )
}

export function InputField({label, name, type, placeholder, className, required, targetValue, targetFunction}:{label: string, name: string, type: string, placeholder?: string, className?: string, required?: boolean, targetValue?: string, targetFunction?: (value: string) => void }){
    // const [contactNumber, setContactNumber] = useState<string>('');
    const handleContactNumber = (value: string): void => {
        let receivedEntry = value.replace(/\D/g, ''); // Remove non-digits
    
        if (receivedEntry.length === 10) {
            // Format as (123) 456 7890
            receivedEntry = receivedEntry.slice(0, 10);
            receivedEntry = receivedEntry.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 $3');
        } else if (receivedEntry.length > 10 || receivedEntry.length === 11) {
            // If more than 11 digits, limit to 11
            receivedEntry = receivedEntry.slice(0, 11);
            receivedEntry = receivedEntry.replace(/(\d{4})(\d{7})/, '$1 $2');
        }
        targetFunction?.(receivedEntry);
      };
    
    return(
        <div className="flex flex-col">
            <label htmlFor={name} className="text-lg font-medium font-poppins capitalize relative w-fit">
                {label}
                {required && <Asterisk  className="w-3 h-auto text-red-ghr absolute top-0 -right-4"/>}
            </label>
            {
                type === 'tel' ? (
                    <input type={type} name={name} id={name} placeholder={placeholder} value={targetValue} className={`bg-gray-200 rounded-xl p-2 ${className}`} onChange={(e) => handleContactNumber(e.target.value)} required={required}/>
                ) : (
                    <input type={type} name={name} id={name} placeholder={placeholder} className={`bg-gray-200 rounded-xl p-2 ${className}`}  required={required}/>
                )
            }
        </div>
    )
}

