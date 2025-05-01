import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {
        const data = await req.json()
        await executeQuery('INSERT INTO admins(name,email,password,role,contactNumber) VALUES (?,?,?,?,?)',[data.name, data.email, data.password, data.role, data.contactNumber || null])
        return NextResponse.json('Agent created')
    } catch (error) {
        console.error('Unable to add new agent.', error);
        return NextResponse.json('Unable to add new agent.')
    }
}