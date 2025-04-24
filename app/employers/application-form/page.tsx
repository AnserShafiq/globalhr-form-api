import LeftDesc from "@/app/ui/applicationForms/left-description";
import LeftHeading from "@/app/ui/applicationForms/left-heading";
import EmployersForm from "../../ui/applicationForms/employers-form";



export default function ApplicationForm(){
    return(
        <div className='flex flex-col lg:grid lg:grid-cols-[50%_50%] py-8! lg:py-24! gap-5 container min-h-[90vh]'>
            <div className="">
                <LeftHeading>Employers Request</LeftHeading>
                <LeftDesc>
                {`Please share the details of the position you need to fill, and Global HR will assist you in finding the ideal candidate. Our team is dedicated to streamlining your hiring process with tailored recruitment solutions. Simply complete the form below, and we’ll promptly contact you to discuss your requirements and initiate the search for the right fit.`}
                </LeftDesc>
            </div>
            <EmployersForm />
        </div>
    )
}