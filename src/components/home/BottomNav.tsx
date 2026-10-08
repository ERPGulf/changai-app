import React from "react";
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, usePathname, type Href } from "expo-router";

const MONO_FONT = Platform.select({ ios: "Menlo", default: "monospace" });

const TABS: {
  label: string;
  path: Href & string;
  icon: React.ComponentProps<typeof Feather>["name"];
}[] = [
  { label: "Home", path: "/main/Home", icon: "home" },
  { label: "changAI", path: "/main/changAI", icon: "message-square" },
  { label: "Settings", path: "/main/settings", icon: "settings" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const active = pathname === tab.path;

        return (
          <TouchableOpacity
            key={tab.path}
            style={styles.item}
            onPress={() => router.replace(tab.path)}
          >
            {active ? (
              <LinearGradient
                colors={["#6C4FF8", "#5038E0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.iconContainer, styles.activeIcon]}
              >
                <Feather name={tab.icon} size={17} color="#FFF" />
              </LinearGradient>
            ) : (
              <View style={styles.iconContainer}>
                <Feather name={tab.icon} size={17} color="#7A8FAF" />
              </View>
            )}

            <Text style={[styles.text, active && styles.activeText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
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

    paddingVertical: 10,

    borderRadius: 20,

    backgroundColor: "#101827",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },

  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  activeIcon: {
    boxShadow: "0 4px 14px 0 rgba(108, 79, 248, 0.45)",
  },

  text: {
    marginTop: 6,
    fontSize: 9,
    lineHeight: 12,
    color: "#7A8FAF",
    fontFamily: MONO_FONT,
  },

  activeText: {
    color: "#8B6FFF",
  },
});
