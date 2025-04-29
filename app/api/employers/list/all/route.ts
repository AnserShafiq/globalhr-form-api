

import { executeQuery } from "@/app/lib/db"
import { NextResponse } from "next/server"



export async function GET(){
    try{
        const JS = await executeQuery(`SELECT id,firstName,lastName,contactNumber,companyName,city,candidatesNeeded FROM employers ORDER BY submissionDate DESC;`)
        return NextResponse.json(JS);
    }catch(error){
        console.error('Unable to get Job seekers list', error)
        return NextResponse.json('Unable to get Job seekers list')
    }
}