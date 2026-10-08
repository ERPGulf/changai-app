import React from "react";
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const MONO_FONT = Platform.select({ ios: "Menlo", default: "monospace" });

interface HeaderProps {
  name: string;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "GOOD MORNING";
  if (hour < 17) return "GOOD AFTERNOON";
  return "GOOD EVENING";
}

export default function Header({
  name,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textBlock}>
        <Text style={styles.greeting}>
          {getGreeting()}
        </Text>

        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      </View>

      <TouchableOpacity style={styles.notification}>
        <Feather
          name="bell"
          size={15}
          color="#A5B3CE"
        />

        <View style={styles.dot} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textBlock: {
    flex: 1,
    marginRight: 12,
  },

  greeting: {
    color: "#7A8FAF",
    fontSize: 10,
    letterSpacing: 1.5,
    fontFamily: MONO_FONT,
    lineHeight: 14,
  },

  name: {
    marginTop: 4,
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 28,
    fontFamily: "Outfit_700Bold",
  },

  notification: {
    width: 38,
    height: 38,
    borderRadius: 12,

    backgroundColor: "#151D2E",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",

    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    position: "absolute",
    top: -2,
    right: -2,

    width: 9,
    height: 9,
    borderRadius: 5,

    backgroundColor: "#00D4B4",
    borderWidth: 2,
    borderColor: "#090B14",
  },
});
