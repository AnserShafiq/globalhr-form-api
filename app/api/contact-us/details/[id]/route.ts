import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";


// eslint-disable-next-line
export async function GET(req:NextRequest, context:any){
    try{
        const {id} = await context.params;
        const data = await executeQuery('SELECT * FROM contact_form WHERE id=?',[id]);
        return NextResponse.json(data);
    }catch(error){
        console.error('Unable to get selected message.',error)
        return NextResponse.json('Unable to get selected message.')
    }
}