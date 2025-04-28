import { executeQuery } from "@/app/lib/db";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/spreadsheets'],
});

const drive = google.drive({version: 'v3', auth});
const sheets = google.sheets({version: 'v4', auth});

export async function POST(req: NextRequest){
    let fileUrl = null;
    let downloadLink = '-'
    try{
        const formData = await req.formData();
        const file = formData.get('resume') as File
        console.log('Resume File: ', file);
        if(!file){
            return NextResponse.json({success: false, status: 400, error: 'No file uploaded'}, {status: 400});
        }
        if(file.name){
            const buffer = Buffer.from(await file.arrayBuffer());
            const stream = Readable.from(buffer);
            const fileMetaData = await drive.files.create({
                requestBody: {
                    name: file.name,
                    parents: process.env.GOOGLE_DRIVE_FOLDER_ID ? [process.env.GOOGLE_DRIVE_FOLDER_ID] : [],
                },media:{
                    mimeType: file.type,
                    body: stream,
                }
            })
            const fileId = file.name !== '' ? fileMetaData.data.id : '';
            fileUrl=`https://drive.goolge.com/uc?id=${fileId}`
            downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`
            // const downloadLink = file.name !== '' ? : '-';
        }

        await executeQuery(`INSERT INTO job_seekers(
        firstName,lastName,email,contactNumber,dateOfBirth,gender,address,city,state,residentialStatus,ethnicity,
        latestQualification,institute,startingYear,completionYear,
        experience,companyName_1,jobTitle_1,companyContact_1,startingDate_1,endingDate_1,reason_1,companyName_2,jobTitle_2,companyContact_2,startingDate_2,endingDate_2,reason_2, fullTime_partTime, resume)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
            formData.get('firstName'),
            formData.get('lastName'),
            formData.get('email'),
            formData.get('contactNumber'),
            formData.get('dateOfBirth'),
            formData.get('gender'),
            formData.get('address'),
            formData.get('city'),
            formData.get('state'),
            formData.get('residentialStatus'),
            formData.get('ethnicity'),
            formData.get('latestCompletedQualification'),
            formData.get('instituteName'),
            formData.get('startingYear'),
            formData.get('completionYear'),
            formData.get('experience'),
            formData.get('companyName1'),
            formData.get('jobTitle1'),
            formData.get('companyContact1'),
            formData.get('startingDate1'),
            formData.get('endingDate1'),
            formData.get('reasonForLeaving1'),
            formData.get('companyName2'),   
            formData.get('jobTitle2'),
            formData.get('companyContact2'),
            formData.get('startingDate2'),
            formData.get('endingDate2'),
            formData.get('reasonForLeaving2'),
            formData.get('fullTime_partTime'),
            fileUrl
        ]);

        const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
        const range = 'JobSeekers!A1';
        console.log("spreadsheetId:", spreadsheetId);
        console.log("sheet append range:", range);
        try {
            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range,
                valueInputOption: 'RAW',
                requestBody: {
                    values: [[
                        formData.get('firstName'),
                        formData.get('lastName'),
                        formData.get('email'),
                        formData.get('contactNumber'),
                        formData.get('dateOfBirth'),
                        formData.get('gender'),
                        formData.get('address'),
                        formData.get('city'),
                        formData.get('state'),
                        formData.get('residentialStatus'),
                        formData.get('ethnicity'),
                        formData.get('latestCompletedQualification'),
                        formData.get('instituteName'),
                        formData.get('startingYear'),
                        formData.get('completionYear'),
                        formData.get('experience'),
                        formData.get('companyName1') || '-',
                        formData.get('jobTitle1') || '-',
                        formData.get('companyContact1') || '-',
                        formData.get('startingDate1') || '-',
                        formData.get('endingDate1') || '-',
                        formData.get('reasonForLeaving1') || '-',
                        formData.get('companyName2') || '-',   
                        formData.get('jobTitle2') || '-',
                        formData.get('companyContact2') || '-',
                        formData.get('startingDate2') || '-',
                        formData.get('endingDate2') || '-',
                        formData.get('reasonForLeaving2') || '-',
                        formData.get('fullTime_partTime'),
                        downloadLink,
                        `Date: ${new Date().toISOString().split('T')[0]}, Time:${new Date().toTimeString().split(' ')[0]}`
                    ]]
                }
            });
        } catch (err) {
            console.error("Spreadsheet access error:", err);
            return NextResponse.json({success: false, status: 500, error: 'Failed to upload in sheets'}, {status: 500});
        }   
        return NextResponse.json({success: true, status: 200});;
    }catch(error){
        console.error('Error uploading application:', error);
        return NextResponse.json({success: false, status: 500, error: 'Failed to upload application'}, {status: 500});
    }
}