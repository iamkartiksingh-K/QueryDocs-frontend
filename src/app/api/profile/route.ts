import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
  const cookieStore = await cookies();
  const response = await fetch(`http://localhost:8000/auth/profile`, {
    headers: {
      Authorization: `Bearer ${cookieStore.get("token")?.value}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return NextResponse.json(data);
}
