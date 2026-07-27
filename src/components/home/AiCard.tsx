import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
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
            <Image
              source={require("../../../assets/images/Icon.png")}
              style={styles.logo}
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
    marginTop: 20,
    alignSelf: "stretch",

    minHeight: 282,   // <-- instead of height: 282

    padding: 20,

    backgroundColor: "#0F1521",

    borderRadius: 24,

    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.07)",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",

    marginBottom: 20,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 44,
    height: 44,

    borderRadius: 16,

    backgroundColor: "#181F30",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#6D4FC2",
  },

  titleContainer: {
    marginLeft: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 16,
    fontFamily: "outfit-bold",
  },
  subtitle: {
    marginTop: 2,

    color: "#7A8FAF",

    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,

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
    fontWeight: 500,
  },

  description: {
    marginTop: 8,

    color: "#C9D3E8",

    fontSize: 14,
    lineHeight: 24,
    fontWeight: 400,

    fontFamily: "outfit-regular",
  },
  chipContainer: {
    minHeight: 59.175,
    alignSelf: "stretch",

    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",

    marginTop: 24,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,

    borderRadius: 16,

    backgroundColor: "#181F30",

    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.07)",

    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    color: "#7A8FAF",
    fontSize: 12,
    fontFamily: "outfit-medium",
    fontWeight: 500,
    lineHeight: 16,
  },
  logo: {
    width: 22,
    height: 22,
  },
});