"use client";

import { useState, useEffect } from "react";
import styles from "./ChatPage.module.css";

type ChatMessage = {
  text: string;
  sender: "user" | "bot";
};

export default function ChatPage() {
  const [chatContent, setChatContent] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>("");

  const sendMessage = async () => {
    setChatContent([...chatContent, { text: inputText, sender: "user" }]);

    // Simulating API call. Replace with your actual API function
    const apiResponse = await callGPT3API(inputText);

    setChatContent([
      ...chatContent,
      { text: inputText, sender: "user" },
      { text: apiResponse, sender: "bot" },
    ]);
    setInputText("");
  };

  // Mock API call function, replace with actual API logic
  const callGPT3API = async (text: string) => {
    return "This is a mock response from the API.";
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBox}>
        {chatContent.map((message, index) => (
          <div key={index}>
            {message.sender === "user" ? "> " : "< "} {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className={styles.inputArea}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
}
