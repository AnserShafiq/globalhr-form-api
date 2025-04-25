'use server'

import { signIn } from "@/auth"

export async function authenticaion(formData: FormData) {
    try {
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }
        
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