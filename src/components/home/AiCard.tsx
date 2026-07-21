import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AiCard() {
  const chips = [
    "Summarise data",
    "Ask questions",
    "Spot trends",
    "Raise alerts",
  ];

  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="briefcase-outline"
              size={18}
              color="#8B5CF6"
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              changAI
            </Text>

            <Text style={styles.subtitle}>
              ERP Intelligence
            </Text>
          </View>
        </View>

        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />

          <Text style={styles.liveText}>
            Live
          </Text>
        </View>
      </View>

      {/* Description */}

      <Text style={styles.description}>
        Your AI assistant that listens and
        understands your entire business in
        real time, connected directly to your
        ERP across Sales, Inventory,
        Finance, and HR.
      </Text>

      {/* Chips */}

      <View style={styles.chipContainer}>
        {chips.map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.chip}
          >
            <Text style={styles.chipText}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 18,

    backgroundColor: "#151D2E",

    borderRadius: 24,

    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.06)",

    padding: 16,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,

    backgroundColor: "#0E1020",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#6C4FF8",
  },

  titleContainer: {
    marginLeft: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "outfit-bold",
  },

  subtitle: {
    marginTop: 2,
    color: "#8A96B6",
    fontSize: 11,
    fontFamily: "outfit-regular",
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#103A37",

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 20,
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,

    backgroundColor: "#00D4B4",

    marginRight: 6,
  },

  liveText: {
    color: "#00D4B4",
    fontSize: 11,
    fontFamily: "outfit-medium",
  },

  description: {
    marginTop: 18,

    color: "#C5CBDD",

    fontSize: 15,
    lineHeight: 27,

    fontFamily: "outfit-regular",
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",

    marginTop: 18,
  },

  chip: {
    backgroundColor: "#1B2438",

    borderRadius: 16,

    borderWidth: 1,
    borderColor: "#2A3552",

    paddingHorizontal: 12,
    paddingVertical: 6,

    marginRight: 8,
    marginBottom: 8,
  },

  chipText: {
    color: "#8FA2C8",
    fontSize: 11,
    fontFamily: "outfit-medium",
  },
});