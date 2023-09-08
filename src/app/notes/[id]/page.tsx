// help me fetch the notes from a specific folder using nextjs13, not getServerSideProps, I am passing the folder id in the url
// need to use next/navigation instead of useRouter. Can't use useRouter because this is a server component and not a client component
// lets rewrite the function to use nextjs13
// create a type to match the params passed
import Link from "next/link";
import { prisma } from "@/db";
import styles from "../../page.module.css";
import cardstyles from "../../notecard.module.css";
type NoteParams = {
  id: string;
  title: string;
  content?: string;
};
export const getNotes = async (folderId: string) => {
  const notes = await prisma.note.findMany({
    where: {
      folderId: folderId,
    },
    include: {
      folder: true,
    },
  });
  return notes;
};

export default async function ViewNotes({ params }: { params: NoteParams }) {
  const notes = await getNotes(params.id);
  console.log(notes);
  return (
    <main className={styles.main}>
      <h1>Notes</h1>
      <div className={cardstyles.noteCardContainer}>
        {notes.map((note) => (
          <Link href={`/notes/view-note/${note.id}`} key={note.id}>
            <div className={cardstyles.noteCard}>
              <h2 className={cardstyles.noteTitle}>{note.title}</h2>
              <p className={cardstyles.noteContent}>{note.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
