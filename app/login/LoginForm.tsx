"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    let newErrors = { username: "", password: "" };
    if (!username) newErrors.username = "Field is required";
    if (!password) newErrors.password = "Field is required";

    setErrors(newErrors);

    if (!username || !password) return;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      setIsLoading(false)

      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Email atau password salah");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan, silakan coba lagi");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-80 sm:w-96 p-6 rounded-lg shadow bg-white"
        autoComplete="off"
      >
        <h2 className="text-xl mb-4 font-bold text-center">Login</h2>

        {/* USERNAME */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            autoComplete=""
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled= {isLoading}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded w-full transition"
        >
            {isLoading? "Loading..": "Masuk"}
        </button>
      </form>
    </div>
  );
}
