import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const folders = await prisma.folder.findMany();
    return NextResponse.json(folders);
  } catch (error) {
    console.error("An error occurred while fetching folders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.next();
}

export function defaultMethod() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
