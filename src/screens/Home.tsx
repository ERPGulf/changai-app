import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function ChangAi() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ChangAI 🤖</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});interface FullResponse {
  Question?: string;
  Bot?: string | { answer?: string };
  [key: string]: any;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  fullResponse?: FullResponse;
}
const [messages, setMessages] = useState<Message[]>([]);
const [input, setInput] = useState<string>("");
const [loading, setLoading] = useState<boolean>(false);
const [activeTab, setActiveTab] = useState<"chat" | "debug" | "support">(
  "chat"
);

const scrollViewRef = useRef<ScrollView | null>(null);
const shouldScrollToBottom = useRef<boolean>(false);  
const handleSend = async (): Promise<void> => {
  if (!input.trim() || loading) return;

  const userText = input;

  const userMessage: Message = {
    id: Date.now().toString(),
    text: userText,
    sender: "user",
  };

  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);

  const typingId = `${Date.now()}_typing`;

  setMessages((prev) => [
    ...prev,
    {
      id: typingId,
      text: "Typing...",
      sender: "ai",
    },
  ]);

  try {
    const response = await sendChangAiMessage(userText, "mobile_user");

    const apiData: FullResponse | undefined = response?.message;

    const botText =
      typeof apiData?.Bot === "string"
        ? apiData.Bot
        : apiData?.Bot?.answer;

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === typingId
          ? {
              ...msg,
              text: botText ?? "No response received.",
              fullResponse: apiData,
            }
          : msg
      )
    );
  } catch (error) {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === typingId
          ? {
              ...msg,
              text: "Something went wrong. Please try again.",
            }
          : msg
      )
    );
  } finally {
    setLoading(false);
  }
};
const renderItem = ({ item }: { item: Message }) => (
  <View
    style={[
      styles.messageRow,
      item.sender === "user" ? styles.userRow : styles.botRow,
    ]}
  >
    <Text style={styles.messageText}>{item.text}</Text>
  </View>
);
const latestAIMessage: Message | undefined = [...messages]
  .reverse()
  .find((msg) => msg.sender === "ai" && msg.fullResponse);