import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";


// eslint-disable-next-line
export async function GET(request: NextRequest, context: any){
    try{
        const {email} = await context.params;
        // eslint-disable-next-line
        const resp:any = await executeQuery(`SELECT * FROM admins WHERE email=?;`, [email]);
        return NextResponse.json(resp[0]);
    }catch{
        console.error('API:Unable to get the admin details.')
        return NextResponse.json(null);
    }
}