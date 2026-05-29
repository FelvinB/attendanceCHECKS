"use client";

import { useRouter } from "next/navigation";

export default function LoginModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0f3f56]">

      {/* MAIN CONTAINER */}
      <div className="relative w-full max-w-4xl flex flex-col items-center px-4">

        {/* TITLE */}
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-8 tracking-wide">
          ATTENDANCE CHECKER
        </h1>

        {/* CARD */}
        <div className="relative bg-[#ffffff] w-full max-w-[520px] rounded-[32px] px-8 py-12 shadow-2xl">

          {/* LOGO */}
          <div className="absolute top-6 left-6">
            <img
              src="/img/cpclogo.jpg"
              alt="logo"
              className="w-14 h-14 object-contain"
            />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col items-center mt-2">

            {/* TEXT */}
            <p className="text-gray-600 text-sm sm:text-base mb-10">
              Log in as?
            </p>

            {/* INSTRUCTOR BUTTON */}
            <button
              onClick={() => router.push("/login")}
              className="w-full max-w-[280px] bg-gray-300 hover:bg-gray-400 transition-all duration-200 rounded-md py-4 mb-8 text-black font-medium shadow"
            >
              Instructor
            </button>

            {/* STUDENT BUTTON */}
            <button
              onClick={() => router.push("/student-attendance")}
              className="w-full max-w-[280px] bg-gray-300 hover:bg-gray-400 transition-all duration-200 rounded-md py-4 text-black font-medium shadow"
            >
              Student
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}