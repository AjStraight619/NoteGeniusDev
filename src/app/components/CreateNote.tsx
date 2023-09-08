"use client";

import React from "react";

type CreateNoteClientProps = {
  folders: { id: string; name: string }[];
};

const CreateNote: React.FC<CreateNoteClientProps> = ({ folders }) => {
  // Your component logic here for interactivity
  const [selectedFolder, setSelectedFolder] = React.useState("");

  const handleSave = () => {};
  return (
    <div>
      {/* Folder selection dropdown */}
      <select
        name="folderId"
        value={selectedFolder}
        onChange={(e) => setSelectedFolder(e.target.value)}
      >
        <option value="">Select a Folder</option>
        {folders.map((folder) => (
          <option value={folder.id} key={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>

      {/* Save button with folder selection */}
      <button onClick={handleSave}>Save Note to {selectedFolder}</button>
    </div>
  );
};

export default CreateNote;
