"use client";

import styles from "@/app/create-note/createnote.module.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";

interface Folder {
  id: string;
  name: string;
}

interface Option {
  value: string;
  label: string;
}

const CreateNotePage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedFolder, setSelectedFolder] = useState<Option | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    fetch("/api/fetch-folders", {
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((data: any[]) => {
        setFolders(data);
        if (data.length > 0) {
          setSelectedFolder({ value: data[0].id, label: data[0].name });
        }
      });
  }, []);

  const handleSave = async () => {
    if (!title || !content) {
      alert("Both title and content are required!");
      return;
    }

    const folderId = selectedFolder ? selectedFolder.value : null;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, folderId }),
    };

    try {
      const response = await fetch("/api", requestOptions);
      const data = await response.json();

      if (response.ok) {
        alert("Note successfully saved");
        console.log("Saved note:", data);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("An error occurred while saving the note.");
      console.error(error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.inputField}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textArea}
      />
      <div className={styles.actionContainer}>
        <Select
          value={selectedFolder}
          onChange={(option: Option | null) => setSelectedFolder(option)}
          options={folders.map((folder) => ({
            value: folder.id,
            label: folder.name,
          }))}
          className={styles.selectField}
        />
        <button
          type="button"
          onClick={handleSave}
          className={styles.submitButton}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateNotePage;

// const createNote = async (data: FormData) => {
//   "use server";

//   const title = data.get("title")?.valueOf();
//   const content = data.get("content")?.valueOf();
//   const folderId = data.get("folderId")?.valueOf();

//   if (typeof title !== "string" || title.length === 0) {
//     throw new Error("Title is required");
//   }

//   if (typeof content !== "string" || content.length === 0) {
//     throw new Error("Content is required");
//   }
//   if (typeof folderId !== "string" || folderId.length === 0) {
//     throw new Error("Folder ID is required");
//   }

//   const newNote = await prisma.note.create({
//     data: {
//       title,
//       content,
//       folderId,
//     },
//   });
//   return newNote;
// };

// type NoteDataType = {
//   title: string;
//   content: string;
// };

// const createNote = async (data: FormData) => {
//   "use server";

//   const title = data.get("title")?.valueOf();
//   const content = data.get("content")?.valueOf();

//   if (typeof title !== "string" || title.length === 0) {
//     throw new Error("Title is required");
//   }

//   if (typeof content !== "string" || content.length === 0) {
//     throw new Error("Content is required");
//   }

//   const noteData: NoteDataType = {
//     title,
//     content,
//   };

//   await prisma.note.create({
//     data: noteData,
//   });
// };

// export default async function CreateNotePage() {
//   const folders: any = await getFolders();

//   return (
//     <div className={styles.formContainer}>
//       <form action={createNote}>
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           className={styles.inputField}
//         />
//         <textarea
//           name="content"
//           placeholder="Content"
//           className={styles.textArea}
//         />
//         <div className={styles.linkContainer}>
//           <Link href=".."></Link>
//           <button type="submit" className={styles.submitButton}>
//             Create
//           </button>
//         </div>
//       </form>
//       <CreateNoteClient folders={folders} />
//     </div>
//   );
// }
