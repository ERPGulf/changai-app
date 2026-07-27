import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
                size={13}
                color="#7A8FAF"
              />
            </View>

            <Text
              style={styles.question}
              numberOfLines={2}
            >
              {item}
            </Text>
          </View>

          <MaterialCommunityIcons
            name="arrow-top-right"
            size={13}
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
    lineHeight: 28,
    fontFamily: "outfit-bold",
    marginBottom: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 16,
    paddingVertical: 12,

    minHeight: 59,

    borderRadius: 20,
    backgroundColor: "#151D2E",
    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.07)",

    marginBottom: 10,
  },

  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",

    marginRight: 12, // Figma gap between text and arrow
  },

  iconContainer: {
    width: 18,
    height: 18,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  question: {
    flex: 1,

    color: "#C9D3E8",

    fontSize: 14,
    lineHeight: 20,

    fontFamily: "outfit-regular",
  },
  arrow: {
    marginLeft: 12, 
    height: 13,
    width: 13,
    justifyContent: "center",
    alignItems: "center",
  },
});