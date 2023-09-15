import { type Folder as FolderParams } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getNotesFromFolder = async (folderId: string) => {
  const notes = await prisma.folder.findUnique({
    where: {
      id: folderId,
    },
    include: {
      notes: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
  return notes;
};

export default async function NotesPage({ params }: { params: FolderParams }) {
  // const session = getServerSession(authOptions); do i still need the session?

  const { id } = params;

  const notes = await getNotesFromFolder(id);
  notes?.notes.forEach((note) => {
    console.log(note.title, note.createdAt);
  });

  return (
    <h1>
      Notes Page
      <div className="flex flex-wrap gap-4 p-4">
        {notes?.notes.map((note, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow-lg w-1/4"
            style={{ minHeight: '200px' }}
          >
            <h2 className="text-xl font-bold mb-2">{note.title}</h2>
            <p className="text-base">{note.content}</p>
          </div>
        ))}
      </div>
    </h1>
  );
}
