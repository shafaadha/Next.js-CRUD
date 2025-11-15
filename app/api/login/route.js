import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "admin123") {
    const res = NextResponse.json({ message: "Login success" });

    res.cookies.set("token", "example-token", {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return res;
  }

  return NextResponse.json({ message: "Password atau email salah" }, { status: 401 });
}
