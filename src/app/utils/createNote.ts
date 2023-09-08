import { prisma } from "@/db";
type NoteDataType = {
  title: string;
  content: string;
};
type FormData = {
  get: (name: string) => any;
};
export const createNote = async (data: FormData) => {
  "use server";

  const title = data.get("title")?.valueOf();
  const content = data.get("content")?.valueOf();

  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Title is required");
  }

  if (typeof content !== "string" || content.length === 0) {
    throw new Error("Content is required");
  }

  const noteData: NoteDataType = {
    title,
    content,
  };

  await prisma.note.create({
    data: noteData,
  });
};
