
export interface User{
    id: string,
    name: string,
    email:string,
    role: string,
    password: string | null,
    contactNumber: string
}

export interface JS_List{
    id: string,
    firstName: string,
    lastName: string,
    contactNumber: string,
    city: string,
    jobTitle_1: string,
    residentialStatus: string,
} 

export interface JS_Details{
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    contactNumber: string,
    dateOfBirth: string,
    gender: string,
    address: string,
    city:string,
    state: string,
    residentialStatus: string,
    ethnicity: string,
    latestQualification: string,
    institute: string,
    startingYear: string,
    completionYear: string,
    experience: string,
    companyName_1: string | null,
    jobTitle_1:string | null,
    companyContact_1:  string | null,
    startingDate_1:string | null,
    endingDate_1:string | null,
    reason_1:string | null,
    companyName_2: string | null,
    jobTitle_2:string | null,
    companyContact_2:  string | null,
    startingDate_2:string | null,
    endingDate_2:string | null,
    reason_2:string | null,
    fullTime_partTime: string,
    resume: string | null,
    submission_date: string,
}

export interface Emp_List{
    id:string,
    firstName:string,
    lastName: string,
    contactNumber:string,
    companyName:string,
    city:string,
    candidatesNeeded:string,
}
export interface Emp_Details{
    id:string,
    firstName:string,
    lastName: string,
    email:string,
    contactNumber:string,
    jobPosition: string,
    companyName:string,
    companyContact:string,
    companyEmail: string,
    address: string,
    city:string,
    state: string,
    postalCode: string,
    contactSource: string,
    industry: string,
    candidatesNeeded:string,
    message: string,
    submissionDate: string
}


export interface ContactMessage{
    id: string,
    name:string,
    email:string,
    contactNumber: string,
    reason:string,
    message: string,
    dated: string,
}