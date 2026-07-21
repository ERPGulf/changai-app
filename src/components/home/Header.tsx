import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  name: string;
}

export default function Header({
  name,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>
          GOOD MORNING
        </Text>

        <Text style={styles.name}>
          {name}
        </Text>
      </View>

      <TouchableOpacity style={styles.notification}>
        <Ionicons
          name="notifications-outline"
          size={20}
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

  greeting: {
    color: "#7A8FAF",
    fontSize: 10,
    letterSpacing: 2,
    fontFamily: "outfit-medium",
  },

  name: {
    marginTop: 4,
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 34,
    fontFamily: "outfit-bold",
  },

  notification: {
    width: 44,
    height: 44,
    borderRadius: 16,

    backgroundColor: "#171D2E",

    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    position: "absolute",
    top: 11,
    right: 11,

    width: 8,
    height: 8,
    borderRadius: 4,

    backgroundColor: "#00D4B4",
  },
});