import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { runText2SqlPipeline } from "../../services/changAiService";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MONO_FONT = Platform.select({ ios: "Menlo", default: "monospace" });

const SUGGESTIONS = [
  "Show procurement delays",
  "Q2 cash flow summary",
  "Top selling products this month",
];

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  time: string;
}

function formatTime(date: Date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${suffix}`;
}

function AiAvatar({ size }: { size: number }) {
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Image
        source={require("../../../assets/images/Icon.png")}
        style={{ width: size * 0.55, height: size * 0.55 }}
        resizeMode="contain"
      />
    </View>
  );
}

export default function ChangAI() {
  const insets = useSafeAreaInsets();

  const [welcomeTime] = useState(() => formatTime(new Date()));
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  const sendQuestion = async (text: string) => {
    const question = text.trim();
    if (!question || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: "user",
      time: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      setLoading(true);

      const response = await runText2SqlPipeline(question);

      console.log("Pipeline Response:", response);
      console.log("Answer:", response.answer);
      console.log("SQL:", response.sql);
      console.log("Result:", response.result);

      const aiMessage: Message = {
        id: `${Date.now()}-ai`,
        text: response.answer || "No response received",
        sender: "ai",
        time: formatTime(new Date()),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.log("========== ERROR ==========");
      console.log("Error Object:", error);
      console.log("Response:", error?.response?.data);
      console.log("Status:", error?.response?.status);
      console.log("Message:", error?.message);

      const errorMessage: Message = {
        id: `${Date.now()}-error`,
        text:
          error?.response?.status === 401
            ? "Your session has expired. Please log in again."
            : error?.message || "Something went wrong.",
        sender: "ai",
        time: formatTime(new Date()),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => sendQuestion(input);

  const resetChat = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <StatusBar style="light" />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 10,
          },
        ]}
      >
        <View style={styles.headerLeft}>
          <View>
            <AiAvatar size={38} />
            <View style={styles.onlineDot} />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.title}>changAI</Text>
            <Text style={styles.subtitle}>
              ERP AI · 4 modules connected
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.refreshButton}
          onPress={resetChat}
        >
          <Feather
            name="refresh-cw"
            size={14}
            color="#8A96B6"
          />
        </TouchableOpacity>
      </View>

      {/* Chat */}
      <ScrollView
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({ animated: true })
        }
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.aiRow}>
          <AiAvatar size={24} />

          <View style={styles.aiColumn}>
            <View style={styles.aiBubble}>
              <Text style={styles.aiText}>
                Hello! I'm changAI, your ERP intelligence assistant. I have full access to your business data across Sales, Inventory, Finance, and HR. What would you like to explore today?
              </Text>
            </View>
            <Text style={styles.time}>{welcomeTime}</Text>
          </View>
        </View>

        {messages.map((message) =>
          message.sender === "user" ? (
            <View key={message.id} style={styles.userRow}>
              <LinearGradient
                colors={["#6C4FF8", "#5038E0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.userBubble}
              >
                <Text style={styles.userText}>{message.text}</Text>
              </LinearGradient>
              <Text style={[styles.time, styles.timeRight]}>
                {message.time}
              </Text>
            </View>
          ) : (
            <View key={message.id} style={styles.aiRow}>
              <AiAvatar size={24} />

              <View style={styles.aiColumn}>
                <View style={styles.aiBubble}>
                  <Text style={styles.aiText}>{message.text}</Text>
                </View>
                <Text style={styles.time}>{message.time}</Text>
              </View>
            </View>
          )
        )}

        {loading && (
          <View style={styles.aiRow}>
            <AiAvatar size={24} />
            <View style={[styles.aiBubble, styles.typingBubble]}>
              <ActivityIndicator size="small" color="#8B6FFF" />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Suggestions */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.suggestionScroll}
        contentContainerStyle={styles.suggestionContent}
      >
        {SUGGESTIONS.map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.suggestionChip}
            onPress={() => sendQuestion(item)}
            disabled={loading}
          >
            <Text style={styles.suggestionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Ask about your business data..."
          placeholderTextColor="#6D7895"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />

        <TouchableOpacity style={styles.voiceButton}>
          <Feather name="mic" size={13} color="#A0A9C0" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSend}
          disabled={loading}
          style={loading && styles.sendDisabled}
        >
          <LinearGradient
            colors={["#6C4FF8", "#5038E0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sendButton}
          >
            <Feather name="send" size={13} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080C14",
  },

  header: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerText: {
    marginLeft: 12,
  },

  avatar: {
    backgroundColor: "#1A1538",
    borderWidth: 1,
    borderColor: "rgba(108,79,248,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  onlineDot: {
    position: "absolute",
    right: -1,
    bottom: -1,

    width: 11,
    height: 11,
    borderRadius: 6,

    backgroundColor: "#00D4B4",
    borderWidth: 2,
    borderColor: "#080C14",
  },

  title: {
    color: "#FFF",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Outfit_600SemiBold",
  },

  subtitle: {
    marginTop: 2,
    color: "#7A8FAF",
    fontSize: 10,
    lineHeight: 14,
    fontFamily: MONO_FONT,
  },

  refreshButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#151D2E",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },

  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  chatContent: {
    flexGrow: 1,
    paddingTop: 4,
    paddingBottom: 16,
  },

  aiRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 16,
  },

  aiColumn: {
    flexShrink: 1,
    maxWidth: "82%",
  },

  aiBubble: {
    paddingVertical: 12,
    paddingHorizontal: 14,

    backgroundColor: "#121826",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",

    borderRadius: 16,
    borderTopLeftRadius: 4,
  },

  typingBubble: {
    paddingHorizontal: 18,
  },

  aiText: {
    color: "#E2E8F0",
    fontSize: 13,
    lineHeight: 21,
    fontFamily: "Inter_400Regular",
  },

  time: {
    marginTop: 6,
    color: "#5E6A85",
    fontSize: 9,
    fontFamily: MONO_FONT,
  },

  timeRight: {
    alignSelf: "flex-end",
  },

  userRow: {
    alignItems: "flex-end",
    marginTop: 16,
  },

  userBubble: {
    maxWidth: "78%",
    borderRadius: 16,
    borderTopRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  userText: {
    color: "#FFF",
    fontSize: 13,
    lineHeight: 21,
    fontFamily: "Inter_400Regular",
  },

  suggestionScroll: {
    flexGrow: 0,
  },

  suggestionContent: {
    paddingHorizontal: 16,
    gap: 8,
  },

  suggestionChip: {
    height: 34,
    paddingHorizontal: 14,
    justifyContent: "center",

    borderRadius: 999,
    backgroundColor: "#151D2E",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },

  suggestionText: {
    color: "#C9D3E8",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },

  footer: {
    height: 50,

    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,

    borderRadius: 16,

    paddingLeft: 16,
    paddingRight: 8,

    backgroundColor: "#151D2E",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",

    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  input: {
    flex: 1,
    color: "#FFF",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    paddingVertical: 0,
  },

  voiceButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1C2438",
    justifyContent: "center",
    alignItems: "center",
  },

  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 12px 0 rgba(108, 79, 248, 0.45)",
  },

  sendDisabled: {
    opacity: 0.5,
  },
});
