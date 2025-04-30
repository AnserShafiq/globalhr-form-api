import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line
export async function GET(req:NextRequest, context: any){
    try {
        const {id} = await context.params;
        console.log('Id received by route: ', id);
        const details = await executeQuery('SELECT * FROM admins WHERE id=?',[id]);
        return NextResponse.json(details)
    } catch (error) {
        console.error(`Didn't received id for delete.`, error)
        return NextResponse.json(null)
    }
}