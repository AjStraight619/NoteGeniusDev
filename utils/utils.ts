import { prisma } from "@/db";

export const getFolderNotes = async (folderId: string) => {
  const folderWithNotes = await prisma.folder.findUnique({
    where: { id: folderId },
    include: {
      notes: true,
    },
  });
  return folderWithNotes ? folderWithNotes.notes : [];
};

export const getFolders = async () => {
  const folders = await prisma.folder.findMany({
    include: {
      notes: true,
    },
  });
  return folders;
};
