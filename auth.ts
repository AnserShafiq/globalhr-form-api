import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";


const getEmail = async(email: string) => {
    try {
        const response = await fetch(`${process.env.PUBLIC_URL}/api/get-admin/${email}`)
        if(!response.ok){
            throw new Error('Failed to fetch admin');
        }
        const [data] = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials){
            const parsedCredentials = z.object({
                email: z.string(), 
                password: z.string()}).safeParse(credentials);
                if(!parsedCredentials.success){
                    throw new Error('Invalid credentials');
                }
                const {email, password} = parsedCredentials.data;    
                try{
                    const user = await getEmail(email);
                    if(!user){
                        console.log('User not found');
                        throw new Error( 'User not found');
                    }
                    if(password !== user.password){
                        console.log('Invalid password');
                        throw new Error('Invalid password');
                    }
                    return {
                        status: 'success',
                        id:user.id,
                        email: user.email,
                        name: user.name,
                    };
                }catch(error){
                    console.log(error);
                    return {message: 'Invalid credentials'}
                }
            }
        })
    ],
});