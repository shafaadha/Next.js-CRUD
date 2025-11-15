"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    body: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newErrors = { name: "", email: "", body: "" };
    if (!name) newErrors.name = "Field is required";
    if (!email) newErrors.email = "Field is required";
    if (!body) newErrors.body = "Field is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email))
      newErrors.email = "Invalid email format";

    setErrors(newErrors);
    if (newErrors.name || newErrors.email || newErrors.body) return;

    const saved = JSON.parse(localStorage.getItem("newComments") || "[]");

    const lastId = parseInt(localStorage.getItem("lastCommentId") ?? "500");
    const newId = lastId + 1;

    const newComment = { id: newId, name, email, body };

    saved.push(newComment);
    localStorage.setItem("newComments", JSON.stringify(saved));
    localStorage.setItem("lastCommentId", newId.toString());

    alert("Comment berhasil dibuat");
    router.push("/dashboard");
  };

  return (
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="border p-2 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Body</label>
          <textarea
            className="border p-2 w-full rounded"
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {errors.body && <p className="text-red-500 text-sm">{errors.body}</p>}
        </div>

        <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded w-full">
          Submit
        </button>
      </form>
  );
}
