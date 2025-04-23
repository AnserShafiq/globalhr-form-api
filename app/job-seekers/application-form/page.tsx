import JobSeekersForms from "@/app/ui/applicationForms/jobseekers-form";
import LeftDesc from "@/app/ui/applicationForms/left-description";
import LeftHeading from "@/app/ui/applicationForms/left-heading";


export default function ApplicationForm() {

  return (
    <div className="grid grid-cols-[50%_50%] py-24! gap-5 container ">
      <div className="">
        <LeftHeading>Job Application</LeftHeading>
        <LeftDesc>
        We sincerely appreciate your interest in pursuing a career opportunity with Global HR. To help us better understand your background and qualifications, please complete the information requested below and upload your most recent resume. Our team will carefully review your application and reach out to you should your profile align with our current or future opportunities.
        </LeftDesc>
      </div>
      <JobSeekersForms />
    </div>
  )
}

