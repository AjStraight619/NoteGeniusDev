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
  // const [isEnhanced, setIsEnchanced] = useState<boolean>(false);

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
      const response = await fetch("/api/fetch-note", requestOptions);
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
          className={`${styles.selectField} ${styles.shortDropdown}`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateNotePage;
