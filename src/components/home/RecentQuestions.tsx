import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const questions = [
  "Show inventory below reorder point",
  "Compare payroll vs last quarter",
  "Which suppliers have delayed orders?",
];

export default function RecentQuestions() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Recent Questions
      </Text>

      {questions.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.card}
          activeOpacity={0.8}
        >
          <Feather
            name="clock"
            size={13}
            color="#7A8FAF"
          />

          <Text
            style={styles.question}
            numberOfLines={1}
          >
            {item}
          </Text>

          <Feather
            name="arrow-up-right"
            size={12}
            color="#7A8FAF"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 36,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Outfit_600SemiBold",
    marginBottom: 12,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,

    paddingHorizontal: 16,
    height: 46,

    borderRadius: 14,
    backgroundColor: "#151D2E",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",

    marginBottom: 10,
  },

  question: {
    flex: 1,
    color: "#C9D3E8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "Inter_400Regular",
  },
});
