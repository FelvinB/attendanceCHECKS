"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const endpoint = isLogin ? 'login' : 'register';

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/auth/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(
                    isLogin
                        ? {
                            email: formData.email,
                            password: formData.password
                        }
                        : formData
                ),
            });

            const data = await response.json();

            console.log("API RESPONSE:", data); // 🔥 DEBUG (IMPORTANT)

            // ================================
            // 🔐 LOGIN FLOW (FIXED)
            // ================================
            if (response.ok && isLogin) {

                // ✅ TRY ALL POSSIBLE TOKEN STRUCTURES
                const token =
                    data.access_token ||
                    data.token ||
                    data.data?.access_token ||
                    data.data?.token;

                if (token) {
                    localStorage.setItem('token', token);
                    router.push('/dashboard');
                } else {
                    setError("Login failed");
                }

            }
            // ================================
            // 📝 REGISTER FLOW
            // ================================
            else if (response.ok && !isLogin) {

                alert("Successfully registered! Please log in.");

                setIsLogin(true);
                setFormData({ name: '', email: '', password: '' });

            }
            // ================================
            // ❌ ERROR HANDLING
            // ================================
            else {

                if (data.errors) {
                    const errors = data.errors as Record<string, string[]>;
                    const firstError = Object.values(errors)[0];
                    setError(firstError[0]);
                } else {
                    setError(data.message || "Invalid email or password");
                }
            }

        } catch (err) {
            console.error(err);
            setError("Cannot connect to server");
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ name: '', email: '', password: '' });
        setError("");
    };

  return (
    <div className="min-h-screen bg-[#0f3f56] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[400px]">

      

        {/* Title */}
        <h1 className="text-center text-white text-2xl sm:text-3xl font-bold mb-6">
          ATTENDANCE CHECKER
        </h1>

        {/* Card */}
        <div className="relative bg-white w-full px-6 sm:px-10 py-10 sm:py-12 shadow-xl rounded-md">

          {/* Back Arrow */}
          <button
            onClick={() => router.push("/")}
            className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowLeft size={24} className="text-black" />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/img/cpclogo.jpg"
              alt="logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
          </div>

          {/* Login Title */}
          <h2 className="text-center text-2xl sm:text-3xl mb-6 sm:mb-8 text-black    font-bold">
            LOG IN
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

{!isLogin && (
    <input
        type="text"
        placeholder="Name"
        className="w-full p-3 border rounded-lg text-black"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
    />
)}

<input
    type="email"
    placeholder="Email"
    className="w-full p-3 border rounded-lg text-black"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    required
/>

<input
    type="password"
    placeholder="Password"
    className="w-full p-3 border rounded-lg text-black"
    value={formData.password}
    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    required
/>

{error && (
    <p className="text-red-500 text-sm">{error}</p>
)}

<button
    type="submit"
    className="w-full py-3 text-white bg-[#0095FF] rounded-lg font-bold"
>
    {isLogin ? 'Log in' : 'Sign up'}
</button>
</form>

          {/* Signup */}
          <div className="mt-6 text-center text-sm text-gray-500">
                    <button onClick={toggleMode} className="text-blue-500 hover:underline">
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                    </button>
                </div>

        </div>
      </div>
      
    </div>
  );
}