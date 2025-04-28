import { auth } from "@/auth";

export default async function GetActiveUser(){
    try {
        const session = await auth();
        const user = session?.user
        return user;
    } catch (error) {
        console.error("Unable to get user from API.", error)
        return null;      
    }
}