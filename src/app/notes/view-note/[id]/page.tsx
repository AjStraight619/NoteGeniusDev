"use client";

import { useState, useEffect } from "react";
import { useGetProduct } from "../../../../../hooks/useGetProducts";
import styles from "./viewnote.module.css";

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function ViewNotePage({ params }: { params: Note }) {
  // For console logging
  console.log(params.id);

  // Fetching the note using custom hook
  const { data: note, isLoading, error } = useGetProduct(params.id);

  // Local state for title and content
  const [localTitle, setLocalTitle] = useState<string | null>(null);
  const [localContent, setLocalContent] = useState<string | null>(null);

  // Update local state when the fetched note changes
  useEffect(() => {
    if (note) {
      setLocalTitle(note.title);
      setLocalContent(note.content);
    }
  }, [note]);

  // Return JSX
  return (
    <div>
      <div className={`${styles.paperBackground} ${styles.movable}`}>
        <input
          type="text"
          className={styles.title}
          value={localTitle || ""}
          onChange={(e) => setLocalTitle(e.target.value)}
        />
        <textarea
          className={styles.content}
          value={localContent || ""}
          onChange={(e) => setLocalContent(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.saveButtonContainer}>
        <button className={styles.saveButton}>Save</button>
      </div>
    </div>
  );
}
