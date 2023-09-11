import { prisma } from "@/db";
import styles from "./folders.module.css";
import Link from "next/link";
import AddFolder from "@/app/components/AddFolder";

// TODO: Add delete/edit buttons to each folder

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
