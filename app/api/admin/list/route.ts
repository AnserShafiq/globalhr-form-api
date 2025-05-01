import { executeQuery } from "@/app/lib/db";
import { NextResponse } from "next/server";



export async function GET(){
    try{
        const data = await executeQuery('SELECT * FROM admins;');
        return NextResponse.json(data);
    }catch{
        console.error('Unable to get list of agents');
        return NextResponse.json('Unable to get list of agents')
    }
}