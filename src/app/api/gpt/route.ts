import { NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/db";
import { config } from "dotenv";

config();

// TODO: Add add the refined note to the data base

console.log(process.env.OPENAI_API_KEY);

// Initialize the OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the shape of the expected request body for POST
interface PostRequestBody {
  message: string;
}

// Define the POST function
export async function POST(request: Request) {
  const requestBody: PostRequestBody = await request.json();
  const { message } = requestBody;
  console.log(message);

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  try {
    // Make an API call to OpenAI GPT-3
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });

    const gpt3Response =
      chatCompletion?.choices[0]?.message.content ?? "No response from GPT-3";

    return NextResponse.json({ gpt3Response });
  } catch (error) {
    console.error("An error occurred while interacting with GPT-3:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Define the GET function
export async function GET(request: Request) {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

// Define the OPTIONS function
export function OPTIONS() {
  return NextResponse.next();
}

// Define the default method
export function defaultMethod() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
