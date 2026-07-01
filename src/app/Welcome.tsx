import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

export default function Welcome() {
  return (
    <>
      <StatusBar barStyle="light-content" />

      <LinearGradient
       colors={["#05010D", "#5B21B6", "#6D4FC2", "#7B5BDB"]}
        style={styles.container}
      >
        {/* Top Section */}
        <View style={styles.topSection}>
          <Image
            source={require("../../assets/images/ChangAI1.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>ChangAI</Text>

        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/QrScan")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: "space-between",
  },

  topSection: {
    alignItems: "center",
    marginTop: 20,
  },

  bottomSection: {
    alignItems: "center",
    marginBottom: 10,
  },

  logo: {
    width: 180,
    height: 180,
  },

  title: {
  fontSize: 38,
  fontWeight: "700",
  color: "#FFFFFF",
  marginTop: 10,
  textShadowColor: "rgba(157, 78, 221, 0.7)",
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 12,
},

  subtitle: {
    marginTop: 12,
    textAlign: "center",
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 320,
  },

  button: {
    width: 240,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  buttonText: {
  fontSize: 18,
  fontWeight: "700",
  color: "#7C3AED",
},

  footer: {
    marginTop: 20,
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
  },
});