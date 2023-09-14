import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { type User } from '@prisma/client';

const getFolders = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  } else {
    const user = session.user as User;
    if (user && user.id) {
      const folders = await prisma.folder.findMany({
        where: {
          userId: user.id,
        },
      });

      return folders;
    }
  }
};

const FolderPage = async () => {
  const folders = await getFolders();

  return (
    <div>
      <div>Folder Page</div>
      <div>These are the folders: </div>
      <ul>
        {folders ? (
          folders.map((folder) => (
            <li key={folder.id}>
              Name: {folder.name}, Created At: {folder.createdAt.toString()},
              Updated At: {folder.updatedAt.toString()}
            </li>
          ))
        ) : (
          <li>No folders available</li>
        )}
      </ul>
    </div>
  );
};

export default FolderPage;
