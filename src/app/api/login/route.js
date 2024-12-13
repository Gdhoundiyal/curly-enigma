import {  NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    console.log("Data from frontend:", data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}
