"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./FloatingChatIcon.module.css";

export default function FloatingChatIcon() {
  const router = useRouter();

  const handleChatClick = async () => {
    // Fetch chat data here
    const chatData = await fetch("/api/chat-data").then((res) => res.json());

    // Store chatData in global state or pass it to the chat page in some way

    // Navigate to the chat page
    router.push("/app/chat-with-ai");
  };

  return (
    <div className={styles.floatingChatIcon} onClick={handleChatClick}>
      🗨️
    </div>
  );
}
