import React from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

const MONO_FONT = Platform.select({ ios: "Menlo", default: "monospace" });

const chips = [
  "Summarise data",
  "Ask questions",
  "Spot trends",
  "Raise alerts",
];

export default function AiCard() {
  return (
    <LinearGradient
      colors={["#16163A", "#0F1521"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
      style={styles.card}
    >
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          <LinearGradient
            colors={["#2A1F5C", "#1A1538"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconContainer}
          >
            <Image
              source={require("../../../assets/images/Icon.png")}
              style={styles.logo}
            />
          </LinearGradient>

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
        Your AI assistant that listens and understands your
        entire business in real time, connected directly to
        your ERP across Sales, Inventory, Finance, and HR.
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    alignSelf: "stretch",

    padding: 18,

    borderRadius: 20,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 16,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 40,
    height: 40,

    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "rgba(108,79,248,0.45)",
  },

  logo: {
    width: 22,
    height: 22,
  },

  titleContainer: {
    marginLeft: 12,
  },

  title: {
    color: "#FFFFFF",
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

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,

    backgroundColor: "rgba(0,212,180,0.10)",
    borderWidth: 1,
    borderColor: "rgba(0,212,180,0.25)",

    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 999,
  },

  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#00D4B4",
  },

  liveText: {
    color: "#00D4B4",
    fontSize: 10,
    fontFamily: MONO_FONT,
  },

  description: {
    color: "#C9D3E8",
    fontSize: 13,
    lineHeight: 21,
    fontFamily: "Inter_400Regular",
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,

    marginTop: 16,
  },

  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 8,

    backgroundColor: "#181F30",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },

  chipText: {
    color: "#7A8FAF",
    fontSize: 10,
    lineHeight: 14,
    fontFamily: MONO_FONT,
  },
});
