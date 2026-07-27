import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function BottomNav() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>

      {/* Home */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.replace("/main/Home")}
      >
        <View
          style={[
            styles.iconContainer,
            pathname === "/main/Home" && styles.activeIcon,
          ]}
        >
          <Ionicons
            name="home-outline"
            size={20}
            color={pathname === "/main/Home" ? "#FFF" : "#7A8FAF"}
          />
        </View>

        <Text
          style={[
            styles.text,
            pathname === "/main/Home" && styles.activeText,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* changAI */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.replace("/main/changAI")}
      >
        <View
          style={[
            styles.iconContainer,
            pathname === "/main/changAI" && styles.activeIcon,
          ]}
        >
          <Ionicons
            name="chatbubble-outline"
            size={20}
            color={pathname === "/main/changAI" ? "#FFF" : "#7A8FAF"}
          />
        </View>

        <Text
          style={[
            styles.text,
            pathname === "/main/changAI" && styles.activeText,
          ]}
        >
          changAI
        </Text>
      </TouchableOpacity>

      {/* Settings */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.replace("/main/settings")}
      >
        <View
          style={[
            styles.iconContainer,
            pathname === "/main/settings" && styles.activeIcon,
          ]}
        >
          <Ionicons
            name="settings-outline"
            size={20}
            color={pathname === "/main/settings" ? "#FFF" : "#7A8FAF"}
          />
        </View>

        <Text
          style={[
            styles.text,
            pathname === "/main/settings" && styles.activeText,
          ]}
        >
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
    marginHorizontal: 16,

    marginBottom: 16,

    paddingTop: 10,

    paddingBottom: 10,

    borderRadius: 20,

    backgroundColor: "#101827",


    borderTopWidth: 0.8,
    borderColor: "rgba(255,255,255,0.07)",

  },

  item: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,

  },

  activeIcon: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: "#6C4FF8",
    justifyContent: "center",
    alignItems: "center",

  },

  text: {
    marginTop: 4, // same as Figma gap
    fontSize: 9,
    lineHeight: 12,
    color: "#7A8FAF",
    fontFamily: "outfit-medium",
  },

  activeText: {
    marginTop: 4,
    fontSize: 9,
    lineHeight: 12,
    color: "#6C4FF8",
    fontFamily: "outfit-medium",
  },
});