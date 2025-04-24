import Link from "next/link";
import InnerFormHeading from "./ui/applicationForms/formsBody/inner-form-heading";

export default function Home() {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 pb-20 sm:p-20 font-poppins bg-[url('/images/login-bg.png')] bg-size-[65%] bg-no-repeat bg-bottom-right">
      <InnerFormHeading>{`Welcome to Global HR's portal`}</InnerFormHeading>
      <Link href='/login' className="relative inline-flex items-center gap-2 overflow-hidden mt-10 px-[25px] py-3 bg-red-ghr hover:bg-pink-ghr text-white font-poppins font-semibold tracking-wider text-lg rounded-md group">
          <span className="relative z-10">Login</span>
          {/* Static glow overlay */}
          <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          {/* Animated shine */}
          <span className="absolute top-0 left-[-100%] w-full h-full bg-[linear-gradient(to_right,#ffffff22_0%,#ffffff66_50%,#ffffff22_100%)] opacity-50 skew-x-[-10deg] animate-none group-hover:animate-shine"></span>
      </Link>
    </div>
  );
}
