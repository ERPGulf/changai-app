import React from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ChangAI 🤖</Text>

      <Text style={styles.subtitle}>
        Your intelligent AI assistant
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/Login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F172A",
    paddingHorizontal: 24,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#CBD5E1",
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});