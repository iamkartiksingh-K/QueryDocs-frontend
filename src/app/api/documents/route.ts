import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") ?? "1";
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/files/load-documents?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    );

    const data = await backendResponse.json();

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Error in documents route:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { document_id } = await req.json();
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/files/delete-documents/${document_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    );
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error in documents route:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
