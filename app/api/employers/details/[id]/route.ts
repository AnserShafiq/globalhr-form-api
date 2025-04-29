import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";


//eslint-disable-next-line
export async function GET(req:NextRequest, context:any){
    try{
        const {id}=await context.params;
        const data = await executeQuery('SELECT * FROM employers WHERE id=?',[id]);
        return NextResponse.json(data);
    }catch{
        console.error('Unable to get EMP Details')
        return NextResponse.json("Unable to get EMP Details")
    }
}