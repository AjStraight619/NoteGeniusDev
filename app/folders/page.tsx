import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { type User } from '@prisma/client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FaFolder } from 'react-icons/fa';

// import NotesPage from '@/app/notes/page';

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
    <div className="m-4">
      <div>Folder Page</div>
      <div>These are the folders:</div>
      <div className="flex flex-wrap gap-4 mt-4">
        {folders ? (
          folders.map((folder) => (
            <div key={folder.id} className="p-2">
              <Link href={`/folders/notes/${folder.id}`}>
                <div className="text-center">
                  <FaFolder size={32} className="m-auto" />
                </div>
                <div className="text-center mt-2">{folder.name}</div>
              </Link>
            </div>
          ))
        ) : (
          <div>No folders available</div>
        )}
      </div>
    </div>
  );
};

export default FolderPage;
