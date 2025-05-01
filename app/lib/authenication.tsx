'use server'

import { signIn } from "@/auth"

export async function authenticaion(formData: FormData) {
    console.log('Auth')
    try {
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }
        console.log('Sending data for sign in.')
        const result = await signIn('credentials', {
            ...data,
            redirect: false
        });
        
        if (result?.error) {
            return { error: result.error };
        }
        
        return { success: true };
    } catch (error) {
        console.error('Authentication error:', error);
        return { error: "Authentication failed" };
    }
}