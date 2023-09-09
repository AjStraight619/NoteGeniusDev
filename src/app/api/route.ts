import { prisma } from "@/db";
import { NextResponse } from "next/server";

// Define the shape of the expected request body for POST
interface PostRequestBody {
  title: string;
  content: string;
  folderId?: string; // Optional
}

export async function POST(request: Request) {
  const requestBody: PostRequestBody = await request.json();
  const { title, content, folderId } = requestBody;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  let finalFolderId = folderId;

  if (!finalFolderId) {
    // Fetch the last folder created
    const lastFolder = await prisma.folder.findFirst({
      orderBy: {
        createdAt: "desc", // Assuming 'createdAt' is a timestamp field on your folder model
      },
      select: {
        id: true,
      },
    });

    if (lastFolder) {
      finalFolderId = lastFolder.id;
    }
  }

  const noteDataToCreate = {
    title,
    content,
    folderId: finalFolderId,
  };

  try {
    const noteData = await prisma.note.create({
      data: noteDataToCreate,
    });
    return NextResponse.json(noteData);
  } catch (error) {
    console.error("An error occurred while creating the note:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID is required for getting a note" },
      { status: 400 }
    );
  }

  try {
    const noteData = await prisma.note.findUnique({
      where: {
        id: id,
      },
    });

    if (!noteData) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(noteData);
  } catch (error) {
    console.error("An error occurred while fetching the note:", error);
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
