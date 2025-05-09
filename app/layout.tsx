import type { Metadata } from "next";
import { Geist, Poppins } from "next/font/google";
import "./globals.css";
import Header from "./ui/header";
import Footer from "./ui/footer";
import { auth } from "@/auth";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Job Application Form - GlobalHR",
  description: "A job application form for job seekers provided by GlobalHR",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  const name = session?.user?.name;
  

   
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${poppins.variable} antialiased`}
      >

        <Header username={name} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
