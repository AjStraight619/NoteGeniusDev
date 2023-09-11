import { prisma } from "@/db";
import styles from "./folders.module.css";
import Link from "next/link";
import AddFolder from "@/app/components/AddFolder";
import type { Folder } from "@prisma/client";

export const getFolders = async () => {
  const folders = await prisma.folder.findMany({
    include: {
      notes: true,
    },
  });
  return folders;
};

export default async function FolderPage() {
  const folders = await getFolders();

  return (
    <main className={styles.main}>
      <div className={styles.addIconContainer}>
        <AddFolder folderNames={folders.map((folder) => folder.name)} />
      </div>
      <div className={styles.grid}>
        {folders.map((folder) => (
          <Link key={folder.id} href={`/notes/${folder.id}`}>
            <div className={styles.card}>
              <p>{folder.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

//   folders.forEach((folder) => {
//     if (folder && folder.notes) {
//       console.log(`Notes in Folder: ${folder.id}`);
//       folder.notes.forEach((note) => {
//         console.log(`Note Title: ${note.title}`);
//         console.log(`Note Content: ${note.content}`);
//       });
//     }
//   });

//   folders.forEach((folder) => console.log(`Folder: ${folder.id}`));
