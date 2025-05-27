import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
