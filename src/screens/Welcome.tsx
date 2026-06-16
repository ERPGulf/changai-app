import React from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Welcome() {
  return (
    <>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#0F172A", "#1E293B", "#2563EB"]}
        style={styles.container}
      >
        {/* AI Icon */}
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="chat-processing-outline"
            size={90}
            color="#fff"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>ChangAI</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Your intelligent AI assistant for smarter conversations,
          productivity, and instant answers.
        </Text>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/QrScan")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          Powered by AI
        </Text>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 1,
  },

  subtitle: {
    marginTop: 16,
    fontSize: 17,
    color: "#E2E8F0",
    textAlign: "center",
    lineHeight: 26,
    maxWidth: 320,
    marginBottom: 50,
  },

  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 16,
    elevation: 5,
  },

  buttonText: {
    color: "#2563EB",
    fontSize: 18,
    fontWeight: "700",
  },

  footer: {
    position: "absolute",
    bottom: 40,
    color: "#CBD5E1",
    fontSize: 14,
  },
});