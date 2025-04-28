import { executeQuery } from "@/app/lib/db"
import { NextResponse } from "next/server"



export async function GET(){
    try{
        const JS = await executeQuery(`SELECT id,companyName,jobPosition,candidatesNeeded FROM employers ORDER BY submissionDate LIMIT 0, 5;`)
        return NextResponse.json(JS);
    }catch(error){
        console.error('Unable to get latest 5 Job seekers', error)
        return NextResponse.json('Unable to get latest 5 Job seekers')
    }
}