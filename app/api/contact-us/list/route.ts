

import { executeQuery } from "@/app/lib/db"
import { NextResponse } from "next/server"


export async function GET(){
    try{
        const JS = await executeQuery(`SELECT * FROM contact_form ORDER BY dated DESC;`)
        return NextResponse.json(JS);
    }catch(error){
        console.error('Unable to get messages list', error)
        return NextResponse.json('Unable to messages list')
    }
}