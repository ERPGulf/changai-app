import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Splash() {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    const checkAppState = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem(
          "onboardingCompleted"
        );

        setTimeout(() => {
          if (onboardingCompleted === "true") {
            router.replace("/Welcome");
          } else {
            router.replace("/Onboarding");
          }
        }, 2500);
      } catch (error) {
        console.log(error);

        setTimeout(() => {
          router.replace("/Onboarding");
        }, 2500);
      }
    };

    checkAppState();
  }, []);

  return (
    <LinearGradient
      colors={["#090D16", "#080C14", "#05070D"]}
      style={styles.container}
    >
      {/* Purple Glow */}
      <View style={styles.glowLarge} />
      <View style={styles.glowSmall} />

      <Animated.View
        style={[
          styles.centerContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >

        <View style={styles.glowLarge} />
        <View style={styles.glowSmall} />

        <View style={styles.ring4} />
        <View style={styles.ring3} />
        <View style={styles.ring2} />
        <View style={styles.ring1} />

        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>changAI</Text>
        <Text style={styles.subtitle}>ERP INTELLIGENCE</Text>

      </Animated.View>
      <View style={styles.footer}>
        <Text style={styles.powered}>Powered by</Text>
        <Text style={styles.company}>ERPGulf</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080C14",
    justifyContent: "center",
    alignItems: "center",
  },
  ring1: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  ring2: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
  },

  ring3: {
    position: "absolute",
    width: 290,
    height: 290,
    borderRadius: 145,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.02)",
  },

  ring4: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 180,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.015)",
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  glowLarge: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(108,79,248,0.12)",
  },

  glowSmall: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(108,79,248,0.22)",
  },


  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#0A0614",
    borderWidth: 1.6,
    borderColor: "rgba(108,79,248,0.55)",

    shadowColor: "#6C4FF8",
    shadowRadius: 30,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 20,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",

    shadowColor: "#8B5CF6",
    shadowOpacity: 0.8,
    shadowRadius: 25,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 15,
    borderWidth: 1,
    borderColor: "#5B3CC4",
  },

  logo: {
    width: 44,
    height: 44,
  },

  title: {
    marginTop: 28,
    color: "#FFF",
    fontSize: 36,
    fontWeight: "700",
    lineHeight: 40,
    letterSpacing: -0.9,
  },

  subtitle: {
    marginTop: 6,
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 1.4,
    textTransform: "uppercase",

  },

  footer: {
    position: "absolute",
    bottom: 55,
    alignItems: "center",
  },

  powered: {
    fontSize: 11,
    color: "rgba(255,255,255,0.25)"
  },

  company: {
    fontSize: 12,
    color: "rgba(255,255,255,0.45)"
  }
});