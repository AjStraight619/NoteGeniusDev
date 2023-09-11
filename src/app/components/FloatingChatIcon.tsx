"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./FloatingChatIcon.module.css";

// TODO: implement this component where it is needed

export default function FloatingChatIcon() {
  const router = useRouter();

  const handleChatClick = async () => {
    const chatData = await fetch("/api/chat-data").then((res) => res.json());

    router.push("/app/chat-with-ai");
  };

  return (
    <div className={styles.floatingChatIcon} onClick={handleChatClick}>
      🗨️
    </div>
  );
}
