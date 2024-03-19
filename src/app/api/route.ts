import { NextResponse } from 'next/server';
export async function GET() {
  const API = "https://suited-hopefully-rhino.ngrok-free.app/";

  try {
    const res = await fetch(API);
    const data = await res.text(); 
    return NextResponse.json({ "message": data }); 
  } catch (e) {
    console.error(e);
    return NextResponse.json({ "error": "Failed to fetch data" });
  }
}