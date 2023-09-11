"use client";
import React, { useState, useEffect } from "react";
import styles from "./addfolder.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddFolder = ({ folderNames }: { folderNames: string[] }) => {
  const [folderName, setFolderName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    console.log("folderName", folderName);
    // Check if folderName already exists in folderNames array
    const folderExists = folderNames.includes(folderName);
    if (folderExists) {
      alert("Folder name already exists!");
    }
    console.log("Folder exists:", folderExists);
  }, [folderName, folderNames]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("folderName", folderName);
    if (!folderName) {
      alert("Folder name is required!");
      return;
    }

    // Handle folder creation logic here
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folderName }),
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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={styles["add-folder"]}>
      <FontAwesomeIcon
        className={styles["add-icon"]}
        icon={faPlus}
        onClick={toggleDropdown}
      />
      {showDropdown && (
        <div className={styles.dropdown}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <button type="submit">Create</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddFolder;
