import React from "react";
import {
  View,
 Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const questions = [
  "Show today's sales performance",
  "What's the current inventory status?",
  "Generate monthly financial summary",
];

export default function RecentQuestions() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Recent Questions
      </Text>

      {questions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          activeOpacity={0.8}
        >
          <View style={styles.leftSection}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="time-outline"
                size={18}
                color="#8A96B6"
              />
            </View>

            <Text
              style={styles.question}
              numberOfLines={2}
            >
              {item}
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={18}
            color="#7A8FAF"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "outfit-bold",
    marginBottom: 18,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#151D2E",

    borderRadius: 18,

    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.07)",

    paddingVertical: 16,
    paddingHorizontal: 16,

    marginBottom: 14,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,

    backgroundColor: "#1D2438",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  question: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "outfit-medium",
    paddingRight: 12,
  },
});