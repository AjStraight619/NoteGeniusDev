"use client";

import styles from "./EnhancedNoteView.module.css";

type EnhancedNoteViewProps = {
  refinedContent: string | null;
  title: string | null;
};

// TODO: display AI's response here

const EnhancedNoteView: React.FC<EnhancedNoteViewProps> = ({
  refinedContent,
  title,
}) => {
  return (
    <div className={styles.paperBackground}>
      <div>
        <input
          type="text"
          className={styles.title}
          value={`GPT-Refined: ${title}`}
          readOnly
        />

        <textarea
          className={styles.content}
          value={refinedContent || ""}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default EnhancedNoteView;
