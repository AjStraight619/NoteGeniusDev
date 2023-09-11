import { prisma } from "@/db";
import { NextResponse, NextRequest } from "next/server";

// create a post request for a user creating an account with prisma
// TODO: Test and fix this route

export async function POST(request: NextRequest) {
  const { email, password, username } = JSON.parse(
    request.body as unknown as string
  );

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("An error occurred while creating the user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
