import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(req:NextRequest){
    try {
        const id = await req.json();
        await executeQuery('DELETE FROM contact_form WHERE id=?',[id[0]]);
        return NextResponse.json({status:200})
    } catch (error) {
        console.error('Unable to delete message', error)
        return NextResponse.json({status:404})
    }
}