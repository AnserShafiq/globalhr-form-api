'use client'
import Image from "next/image";
import { authenticaion } from "./lib/authenication";
export default function Home() {

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await authenticaion(formData);
    console.log('Result => ',result);
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-2 sm:p-20 font-poppins">
      <h1 className="text-4xl font-bold">Login Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit" className="bg-red-ghr text-white px-4 py-2 rounded-md mt-3">Login</button>
      </form>
    </div>
  );
}
