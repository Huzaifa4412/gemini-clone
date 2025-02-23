"use client";
import { createContext, useContext, useState } from "react";

export interface chatType {
  chat: string[];
}
interface ChatContextType {
  chat: chatType[];
  setChat: (chat: chatType[]) => void;
}

const chatContext = createContext<ChatContextType | null>(null);

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chat, setChat] = useState<chatType[]>([]);
  return (
    <chatContext.Provider value={{ chat, setChat }}>
      {children}
    </chatContext.Provider>
  );
};

export const useChats = () => {
  const context = useContext(chatContext);
  if (!context) {
    throw new Error("useChats must be used within a ChatProvide");
  }
  return context;
};
export default ChatProvider;
