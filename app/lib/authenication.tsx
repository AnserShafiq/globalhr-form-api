'use server'

import { signIn } from "@/auth"


export async function authenticaion(formData: FormData) {
    try {
        const data: Record<string, string> = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }
        const result = await signIn('credentials', {
            redirect:false,
            ...data,
        })
        console.log('Result => ',result?.error);
        if(result?.error){
            return {error: 'Invalid credentials'}
        }
        return {success: 'Logged in successfully'}
    } catch (error: any) {
        console.error('Authentication error On Authentication.tsx');
        return { error: error?.message || 'Authentication failed' };
    }
}
