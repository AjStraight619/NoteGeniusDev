import { prisma } from "@/db";
import { NextResponse, NextRequest } from "next/server";
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

config();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse email and password from request body
    const { email, password } = JSON.parse(request.body as unknown as string);

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user in the database
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check password
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    // Generate JWT token using environment variable
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "fallbackSecret",
      { expiresIn: "1h" }
    );

    // Return token to client
    return NextResponse.json({ token: token });
  } catch (error) {
    console.error("Error in login: ", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
