import { prisma } from "@/db";
import styles from "./page.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import "font-awesome/css/font-awesome.min.css";

export const getNotes = async () => {
  const notes = await prisma.note.findMany({
    include: {
      folder: true,
    },
  });
  return notes;
};

export const getFolders = async () => {
  const folders = await prisma.folder.findMany({
    include: {
      notes: true,
    },
  });
  return folders;
};

export default async function Home() {
  const folders = await getFolders();
  const notes = await getNotes();

  folders.forEach((folder) => {
    if (folder && folder.notes) {
      console.log(`Notes in Folder: ${folder.id}`);
      folder.notes.forEach((note) => {
        console.log(`Note Title: ${note.title}`);
        console.log(`Note Content: ${note.content}`);
      });
    }
  });

  folders.forEach((folder) => console.log(`Folder: ${folder.id}`));

  return (
    <main className={styles.main}>
      <ul className={styles.list}>
        {folders.map((folder) => (
          <li key={folder.id} className={styles.listItem}>
            <Link href={`/notes/${folder.id}`}>
              <div className={styles.listLink}>
                <FontAwesomeIcon icon={faFolder} size="2x" />
                {folder.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
