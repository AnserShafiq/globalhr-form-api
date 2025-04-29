import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";




export async function DELETE(req: NextRequest){
    try {
        const id =await req.json()
        console.log('target from delete api: ', id[0])
        if(Array.isArray(id[0]) ){
            id[0].map(async(target:string) => 
            {                
                await executeQuery(`DELETE FROM employers WHERE id=?`,[target]);
            } );


        }else{
            await executeQuery('DELETE FROM employers WHERE id=?',[id[0]]);
        }
        return NextResponse.json({message: 'Data from EMP got deleted'},{status: 200});
    } catch (error) {
        console.error('Unable to delete from EMP table. ',error);
        return NextResponse.json({message: 'Unable to delete from EMP table.'},{status: 404});
    }
}