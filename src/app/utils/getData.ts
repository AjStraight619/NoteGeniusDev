import { prisma } from "@/db";

export const getFolders = async () => {
  const folders = await prisma.folder.findMany({
    include: {
      notes: true,
    },
  });
  return folders;
};

// import { prisma } from "@/db";

// export const getFolderNotes = async (folderId: string) => {
//   const folderWithNotes = await prisma.folder.findUnique({
//     where: { id: folderId },
//     include: {
//       notes: true,
//     },
//   });
//   return folderWithNotes ? folderWithNotes.notes : [];
// };

// export const getFolders = async () => {
//   const folders = await prisma.folder.findMany({
//     include: {
//       notes: true,
//     },
//   });
//   return folders;
// };

// "use client";
// import { useEffect, useState } from "react";
// import styles from "./page.module.css";

// type SpecificNoteParams = {
//   id: string;
// };

// type Note = {
//   id: string;
//   title: string;
//   content: string;
// };

// export default function ViewSpecificNote({
//   params,
// }: {
//   params: SpecificNoteParams;
// }) {
//   const [note, setNote] = useState<Note | null>(null);

//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         const res = await fetch(`/api/${params.id}`);
//         const data = await res.json();
//         setNote(data);
//       } catch (error) {
//         console.error("An error occurred while fetching the data: ", error);
//       }
//     };

//     fetchNote();
//   }, [params.id]);

//   return (
//     <main>
//       <h1>{note?.title}</h1>
//       <div className={styles.noteCardContainer}>
//         {note ? (
//           <div key={note.id} className={styles.noteCard}>
//             <h2 className={styles.noteTitle}>{note.title}</h2>
//             <p className={styles.noteContent}>{note.content}</p>
//           </div>
//         ) : (
//           "Loading..."
//         )}
//       </div>
//     </main>
//   );
// }
