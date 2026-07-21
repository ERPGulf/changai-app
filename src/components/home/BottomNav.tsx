import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BottomNav() {
  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.activeIcon}>
          <Ionicons name="home-outline" size={18} color="#FFFFFF" />
        </View>

        <Text style={styles.activeText}>Home</Text>
      </TouchableOpacity>

      {/* Chat */}
      <TouchableOpacity style={styles.item}>
        <Ionicons
          name="chatbubble-outline"
          size={18}
          color="#8A96B6"
        />

        <Text style={styles.text}>changAI</Text>
      </TouchableOpacity>

      {/* Settings */}
      <TouchableOpacity style={styles.item}>
        <Ionicons
          name="settings-outline"
          size={18}
          color="#8A96B6"
        />

        <Text style={styles.text}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 24,

    height: 68,

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: "#151D2E",

    borderRadius: 22,

    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.07)",
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
  },

  activeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,

    backgroundColor: "#6C4FF8",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 6,
  },

  activeText: {
    fontSize: 10,
    color: "#6C4FF8",
    fontFamily: "outfit-medium",
  },

  text: {
    marginTop: 6,
    fontSize: 10,
    color: "#7A8FAF",
    fontFamily: "outfit-medium",
  },
});