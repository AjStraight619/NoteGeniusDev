"use client";

import { useState, useEffect } from "react";
import { useGetProduct } from "../../../../../hooks/useGetProducts";
import styles from "./viewnote.module.css";
import EnhancedNoteView from "@/app/components/EnhancedNoteView";
import sharedStyles from "./sharedStyles.module.css";

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function ViewNotePage({ params }: { params: Note }) {
  console.log(params.id);

  const { data: note, isLoading, error } = useGetProduct(params.id);

  const [localTitle, setLocalTitle] = useState<string | null>(null);
  const [localContent, setLocalContent] = useState<string | null>(null);
  const [isEnhanced, setIsEnhanced] = useState<boolean>(false);
  const [refinedContent, setRefinedContent] = useState<string | null>(null);

  useEffect(() => {
    if (note) {
      setIsEnhanced(false);
      setLocalTitle(note.title);
      setLocalContent(note.content);
    }
  }, [note]);

  const toggleEnhancedView = () => {
    setIsEnhanced(!isEnhanced);
  };

  async function sendNoteToGPT3() {
    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: localContent }), // sending it as `message`
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Setting isEnhanced to true");
        setIsEnhanced(true); // this should cause a re-render
        console.log(data);
      } else {
        console.error("Failed to send note");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const originalNoteClasses: string[] = [styles.paperBackground];
  const enhancedNoteClasses: string[] = [
    styles.paperBackground,
    sharedStyles.initialOffScreen,
  ];

  if (isEnhanced) {
    originalNoteClasses.push(
      sharedStyles.slideLeft,
      styles["paperBackground--animate"]
    );
    enhancedNoteClasses.push(
      sharedStyles.slideRight,
      styles["paperBackground--animate"]
    );

    const index = enhancedNoteClasses.indexOf(sharedStyles.initialOffScreen);
    if (index > -1) enhancedNoteClasses.splice(index, 1);
  }

  return (
    <div>
      <div className={isEnhanced ? sharedStyles.splitContainer : ""}>
        <div className={originalNoteClasses.join(" ")}>
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
        {isEnhanced && (
          <div className={enhancedNoteClasses.join(" ")}>
            <EnhancedNoteView
              originalContent={localContent}
              refinedContent={refinedContent}
              title={localTitle}
            />
          </div>
        )}
      </div>
      <div className={styles.saveButtonContainer}>
        <button className={styles.saveButton}>Save</button>
        {!isEnhanced ? (
          <button
            className={styles.saveButton}
            onClick={() => sendNoteToGPT3()}
          >
            Enhance Note With AI
          </button>
        ) : (
          <button
            className={styles.saveButton}
            onClick={() => toggleEnhancedView()}
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
}
