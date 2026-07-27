import React, { useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { runText2SqlPipeline } from "../../services/changAiService";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export default function ChangAI() {
  const insets = useSafeAreaInsets();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

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

      console.log("Pipeline Response:", response);
      console.log("Answer:", response.answer);
      console.log("SQL:", response.sql);
      console.log("Result:", response.result);

      const aiMessage: Message = {
        id: `${Date.now()}-ai`,
        text: response.answer || "No response received",
        sender: "ai",
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
        text: error?.message || "Something went wrong.",
        sender: "ai",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
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
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/Icon.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <View>
            <Text style={styles.title}>changAI</Text>

            <View style={styles.statusRow}>
              <View style={styles.greenDot} />

              <Text style={styles.subtitle}>
                ERP AI · 4 modules connected
              </Text>
            </View>
          </View>
        </View>

        {/* Refresh Button should be INSIDE the header */}
        <TouchableOpacity style={styles.refreshButton}>
          <Ionicons
            name="refresh-outline"
            size={18}
            color="#8A96B6"
          />
        </TouchableOpacity>
      </View>

      {/* Chat */}
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 16,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.aiRow}>
          <View style={styles.smallLogo}>
            <Image
              source={require("../../../assets/images/Icon.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.aiBubble}>
            <Text style={styles.aiText}>
              Hello! I'm changAI, your ERP intelligence assistant. I have full access to your business data across Sales, Inventory, Finance, and HR. What would you like to explore today?
            </Text>
          </View>
        </View>

        <Text style={styles.timeLeft}>9:41 AM</Text>

        {messages.map((message) => (
          <View
            key={message.id}
            style={
              message.sender === "user"
                ? styles.userRow
                : styles.aiRow
            }
          >
            {message.sender === "ai" && (
              <View style={styles.smallLogo}>
                <Image
                  source={require("../../../assets/images/Icon.png")}
                  style={styles.logoImage}
                />
              </View>
            )}

            <View
              style={
                message.sender === "user"
                  ? styles.userBubble
                  : styles.aiBubble
              }
            >
              <Text
                style={
                  message.sender === "user"
                    ? styles.userText
                    : styles.aiText
                }
              >
                {message.text}
              </Text>
            </View>
          </View>
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
        />

        <TouchableOpacity style={styles.voiceButton}>
          <Ionicons
            name="mic-outline"
            size={18}
            color="#A0A9C0"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={loading}
        >
          <Ionicons
            name="paper-plane"
            size={16}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080C14",
  },

  // header: {
  //   paddingHorizontal: 16,
  //   paddingTop: 10,
  //   paddingBottom: 14,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  logoImage: {
    width: 32,
    height: 32,
  },

  title: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "outfit-semibold",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00D084",
    marginRight: 6,
  },

  subtitle: {
    color: "#7A8FAF",
    fontSize: 12,
    fontFamily: "outfit-regular",
  },

  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#151D2E",
    borderWidth: 1,
    borderColor: "#222B41",
    justifyContent: "center",
    alignItems: "center",
  },

  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 10,
    paddingHorizontal: 16,

    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.07)",
    backgroundColor: "#151D2E",
  },

  aiRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
  },

  smallLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },

  aiBubble: {
    maxWidth: 268,
    paddingVertical: 12,
    paddingHorizontal: 16,

    backgroundColor: "#0F1521",

    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.07)",

    borderTopLeftRadius: 12,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  aiText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 23,
    fontFamily: "outfit-regular",
  },
  timeLeft: {
    color: "#69758F",
    fontSize: 11,
    marginLeft: 40,
    marginTop: 8,
  },

  footer: {
    height: 52,

    marginHorizontal: 16,

    marginTop: 16,

    marginBottom: 20,

    borderRadius: 20,

    paddingHorizontal: 16,

    backgroundColor: "#151D2E",

    flexDirection: "row",

    alignItems: "center",
  },

  userRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },

  userBubble: {
    maxWidth: 268,
    backgroundColor: "#6C4FF8",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  userText: {
    color: "#FFF",
    fontSize: 15,
    lineHeight: 24,
    fontFamily: "outfit-regular",
  },

  input: {
    flex: 1,
    color: "#FFF",
    fontSize: 15,
    fontFamily: "outfit-regular",
  },

  voiceButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6C4FF8",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
});
