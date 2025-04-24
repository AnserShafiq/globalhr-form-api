import { executeQuery } from "@/app/lib/db";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";


const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

const sheets = google.sheets({version:'v4', auth});

export async function POST(req: NextRequest){
    try{
        const formData = await req.formData()
        await executeQuery(`INSERT INTO employers(
            firstName,lastName,email,contactNumber,jobPosition,companyName,
            companyContact,companyEmail,address,city,state,postalCode,
            contactSource,industry,candidatesNeeded,message
            ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                formData.get('firstName'),formData.get('lastName'),formData.get('email'),
                formData.get('contactNumber'),formData.get('jobPosition'),formData.get('companyName'),
                formData.get('companyContact'),formData.get('companyEmail'),formData.get('address'),
                formData.get('city'),formData.get('state'),formData.get('postalCode'),
                formData.get('contactSource'),formData.get('industry'),formData.get('candidatesNeeded'),
                formData.get('message'),
            ])
        const spreadsheetId = process.env.GOOGLE_SHEET_ID
        const range= 'Employers!A1'
        try{
            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range,
                valueInputOption: 'RAW',
                requestBody: {
                    values: [[
                        formData.get('firstName'),formData.get('lastName'),formData.get('email'),
                        formData.get('contactNumber'),formData.get('jobPosition'),formData.get('companyName'),
                        formData.get('companyContact'),formData.get('companyEmail'),formData.get('address'),
                        formData.get('city'),formData.get('state'),formData.get('postalCode') || '-',
                        formData.get('contactSource'),formData.get('industry'),formData.get('candidatesNeeded'),
                        formData.get('message') || '-', `Date: ${new Date().toISOString().split('T')[0]}, Time:${new Date().toTimeString().split(' ')[0]}`
                    ]]
                }
            })
        }
        //eslint-disable-next-line
        catch(error:any){
            console.error('Unable to post in SHEETS', error);
        }
        return NextResponse.json({success: true, status: 200});
    }
    //eslint-disable-next-line
    catch(error:any){
        console.error('Error uploading application form', error)
        return NextResponse.json({success: false, status: 500, error: 'Failed to upload application'})
    }
}