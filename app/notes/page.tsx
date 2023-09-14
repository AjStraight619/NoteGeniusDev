import { type Folder as FolderParams } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { type Note } from '@prisma/client';

export const getNotesFromFolder = async (folderId: string) => {
  const notes = await prisma.folder.findUnique({
    where: {
      id: folderId,
    },

    include: {
      notes: true,
    },
  });
  return notes;
};

export default async function NotesPage({ params }: { params: FolderParams }) {
  // const session = getServerSession(authOptions); do i still need the session?

  const { id } = params;

  const notes = await getNotesFromFolder(id);

  return (
    <h1>
      Notes Page
      <div>
        {notes?.notes.map((note, index) => (
          <div key={index}>{note.content}</div>
        ))}
      </div>
    </h1>
  );
}
