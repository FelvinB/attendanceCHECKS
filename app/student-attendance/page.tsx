"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const timeIn = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/time-in",
        {
          student_id: studentId,
        }
      );

      console.log(res.data);

      setMessage(res.data.message);
    } catch (error: any) {
      console.log(error);

      setMessage("Incorrect or Input ID");
    }
  };

  const timeOut = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/time-out",
        {
          student_id: studentId,
        }
      );

      console.log(res.data);

      setMessage(res.data.message);
    } catch (error: any) {
      console.log(error);

      setMessage("Incorrect or Input ID");
    }
  };
  

  return (
    <div className="min-h-screen bg-[#0f3f56] flex items-center justify-center p-4 sm:p-6">

      <div className="relative w-full flex flex-col items-center">

        {/* TITLE */}
        <h1 className="text-center text-white text-2xl sm:text-3xl font-bold mb-6">
          ATTENDANCE
        </h1>

        {/* CARD */}
        <div className="bg-white w-full max-w-[500px] px-6 sm:px-10 py-8 sm:py-10 shadow-xl relative rounded-md">

          {/* ARROW INSIDE CARD */}
          <button
            onClick={() => router.push("/")}
            className="absolute top-4 left-4 text-black hover:scale-110 transition"
          >
            <ArrowLeft size={28} />
          </button>

          {/* CENTER CONTENT */}
          <div className="flex flex-col items-center">

            {/* LOGO */}
            <img
              src="/img/cpclogo.jpg"
              alt="logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-10"
            />

            {/* INPUT */}
            <label className="text-xs sm:text-sm mb-3 text-black font-bold">
              Input ID no.
            </label>

            <input
              type="text"
              className="w-full max-w-[300px] border border-gray-400 text-black rounded px-4 py-2 mb-10"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />

            {/* PRESENT BUTTON */}
            <button
              onClick={timeIn}
              className="bg-black hover:bg-gray-500 px-12 py-3 rounded-lg text-sm sm:text-base mt-10"
            >
              Time In
            </button>
            <button
              onClick={timeOut}
              className="bg-black hover:bg-gray-500 px-12 py-3 rounded-lg text-sm sm:text-base mt-10"
            >
              Time Out
            </button>
            <p className="text-black font-bold">{message}</p>

          </div>
        </div>
      </div>
    </div>
  );
}