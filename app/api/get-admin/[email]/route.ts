import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, context: any){
    try {
        console.log('Executing get-admin API');
        const {email} = await context.params;
        console.log('Email:', email);
        const admin = await executeQuery(`SELECT * FROM admins WHERE email = ?`, [email]);
        console.log(admin);
        if(!admin){
            return NextResponse.json({error: 'Admin not found'}, {status: 404});
        }
        return NextResponse.json(admin, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}