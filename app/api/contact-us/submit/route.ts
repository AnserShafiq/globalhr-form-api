import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    try{
        const data = await req.json()
        console.log('Data from api: ', data);
        await executeQuery('INSERT INTO contact_form(name,email,contactNumber,reason,message) VALUES(?,?,?,?,?);',[data.fullName,data.email, data.contactNumber,data.contactReason,data.message]);
        return NextResponse.json({status:200})
    }catch(error){
        console.error('Unable to submit message in DB', error);
        return NextResponse.json({status: 404})
    }
}