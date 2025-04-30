import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest){
    try {
        const data=await req.json();
        // console.log('New Data: ', data);
        await executeQuery('UPDATE admins SET name=?, contactNumber=?, password=? WHERE id=?',[data.name, data.contactNumber, data.password, data.id]);
        return NextResponse.json({status:200})
    } catch (error) {
        console.error('Unable to update user info', error);
        return NextResponse.json('Unable to change password')
    }
}