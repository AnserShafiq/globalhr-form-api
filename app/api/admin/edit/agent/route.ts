import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest){
    try {
        const data = await req.json()
        await executeQuery("UPDATE admins SET name=?, email=?,password=?, role=?, contactNumber=? WHERE id=?",[data.name, data.email, data.password, data.role, data.contactNumber, data.id]);
        return NextResponse.json({status: 200})
    } catch (error) {
        console.error('Unable to update agent.', error)
        return NextResponse.json({status: 404})
    }
}