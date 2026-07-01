import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { runText2SqlPipeline } from "../services/changAiService";
import { Switch } from "react-native";
import { Linking } from "react-native";
interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export default function Home() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<
    "chat" | "support" | "settings"
  >("chat");

  const [autoRead, setAutoRead] = useState(true);
  const [usePolly, setUsePolly] = useState(true);
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    const question = input;
    setInput("");
    try {
      setLoading(true);

      const response = await runText2SqlPipeline(question);

      console.log("Answer:", response.answer);
      console.log("SQL:", response.sql);
      console.log("Result:", response.result);

      const aiMessage: Message = {
        id: `${Date.now()}-ai`,
        text: response.answer || "No response received",
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log("ERROR:", error);

      const errorMessage: Message = {
        id: `${Date.now()}-error`,
        text: "Something went wrong.",
        sender: "ai",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#7B5BDB" }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>ChangAI</Text>
            <View style={styles.tabs}>
              <TouchableOpacity
                style={activeTab === "chat" ? styles.activeTab : styles.tab}
                onPress={() => setActiveTab("chat")}
              >
                <Text style={styles.tabText}>Chats</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={activeTab === "support" ? styles.activeTab : styles.tab}
                onPress={() => setActiveTab("support")}
              >
                <Text style={styles.tabText}>Support</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={activeTab === "settings" ? styles.activeTab : styles.tab}
                onPress={() => setActiveTab("settings")}
              >
                <Text style={styles.tabText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Chat Area */}
        {activeTab === "settings" ? (
          <ScrollView style={styles.settingsContainer}>
            <View style={styles.settingCard}>
              <Text style={styles.settingTitle}>Speech Settings</Text>
              <Text style={styles.settingDescription}>
                These controls apply only inside this chatbot box.
              </Text>
            </View>

            <View style={styles.settingCard}>
              <Text style={styles.settingTitle}>Speech Settings</Text>
              <Text style={styles.settingDescription}>
                These controls apply only inside this chatbot box.
              </Text>
            </View>

            <View style={styles.settingCard}>
              <View style={styles.settingRow}>
                <View>
                  <Text style={styles.settingTitle}>Auto Read Replies</Text>
                  <Text style={styles.settingDescription}>
                    Automatically read bot replies aloud.
                  </Text>
                </View>

                <Switch
                  value={autoRead}
                  onValueChange={setAutoRead}
                  trackColor={{ false: "#ddd", true: "#22C55E" }}
                />
              </View>
            </View>

            <View style={styles.settingCard}>
              <View style={styles.settingRow}>
                <View>
                  <Text style={styles.settingTitle}>Use Amazon Polly</Text>
                  <Text style={styles.settingDescription}>
                    Use Polly when available.
                  </Text>
                </View>

                <Switch
                  value={usePolly}
                  onValueChange={setUsePolly}
                  trackColor={{ false: "#ddd", true: "#22C55E" }}
                />
              </View>
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            style={styles.chatArea}
            contentContainerStyle={styles.chatContent}
            keyboardShouldPersistTaps="handled"
          >
            {messages.length === 0 && (
              <View style={styles.botMessage}>
                <Text style={styles.botText}>
                  Hello there 👋{"\n\n"}
                  I am ChangAI from ERPGulf.com, your ERP assistant.{"\n\n"}
                  ChangAI Quick Start Guide -{" "}
                  <Text
                    style={{
                      color: "#7B5BDB",
                      textDecorationLine: "underline",
                      fontWeight: "600",
                    }}
                    onPress={() =>
                      Linking.openURL(
                        "https://app.erpgulf.com/articles/chang-ai-quick-start-guide"
                      )
                    }
                  >
                    Click here
                  </Text>
                </Text>
              </View>
            )}

            {messages.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.messageRow,
                  item.sender === "user"
                    ? styles.userRow
                    : styles.botRow,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    item.sender === "user"
                      ? styles.userBubble
                      : styles.botBubble,
                  ]}
                >
                  <Text
                    style={
                      item.sender === "user"
                        ? styles.userText
                        : styles.botText
                    }
                  >
                    {item.text}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}



        <View
          style={[
            styles.footer,
            {
              marginBottom: insets.bottom + 8,
            },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Message..."
            placeholderTextColor="#999"
            value={input}
            onChangeText={(text) => {
              console.log("TEXT:", text);
              setInput(text);
            }}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
            disabled={loading}
          >
            <Text style={styles.sendText}>
              {loading ? "..." : "↑"}
            </Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>

    </SafeAreaView >
  );
}

const PRIMARY = "#7B5BDB";
const LIGHT_BG = "#F3F0FF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFF",
  },

  header: {
    backgroundColor: "#7B5BDB",
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 16,
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    paddingHorizontal: 10,
  },

  activeTab: {
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },

  settingsContainer: {
    flex: 1,
    padding: 16,
  },

  settingCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },

  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },
  supportContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  supportMessages: {
    flex: 1,
  },

  supportBubble: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
  },

  supportText: {
    color: "#6B7280",
    fontSize: 14,
  },

  supportInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#fff",
  },

  supportInput: {
    flex: 1,
    height: 42,
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 10,
  },

  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#A78BFA",
    justifyContent: "center",
    alignItems: "center",
  },

  sendIcon: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  settingDescription: {
    fontSize: 14,
    color: "#777",
    lineHeight: 20,
  },

  tabText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  chatArea: {
    flex: 1,
    backgroundColor: "#FAFAFF",
  },

  chatContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexGrow: 1,
  },

  messageRow: {
    marginBottom: 12,
  },

  userRow: {
    alignItems: "flex-end",
  },

  botRow: {
    alignItems: "flex-start",
  },

  messageBubble: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
  },

  userBubble: {
    backgroundColor: PRIMARY,
    borderBottomRightRadius: 5,
    maxWidth: "80%",
    minWidth: 50,
  },

  botBubble: {
    backgroundColor: LIGHT_BG,
    borderBottomLeftRadius: 5,
    maxWidth: "90%",
  },

  userText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
  },

  botText: {
    color: "#444",
    fontSize: 15,
    lineHeight: 22,
  },

  botMessage: {
    backgroundColor: LIGHT_BG,
    padding: 16,
    borderRadius: 16,
    maxWidth: "92%",
    marginBottom: 16,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    // marginBottom: Platform.OS === "android" ? 16 : 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E4D9FF",
    paddingHorizontal: 12,
    height: 58,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },

  sendText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});