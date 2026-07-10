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
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
    const checkAppState = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem(
          "onboardingCompleted"
        );

        // setTimeout(() => {
        //   if (onboardingCompleted === "true") {
        //     router.replace("/Welcome");
        //   } else {
        //     router.replace("/Onboarding");
        //   }
        // }, 2500);
        router.replace("/Onboarding");
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
      colors={[
        "#140C2D",
        "#0B0E1B",
        "#071018",
        "#050A12",
      ]}
      locations={[0, 0.28, 0.65, 1]}
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
            source={require("../../assets/images/Icon.png")}
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
    width: 148,
    height: 148,
    borderRadius: 74,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },

  ring2: {
    position: "absolute",
    width: 208,
    height: 208,
    borderRadius: 104,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
  },

  ring3: {
    position: "absolute",
    width: 268,
    height: 268,
    borderRadius: 134,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.02)",
  },

  ring4: {
    position: "absolute",
    width: 330,
    height: 330,
    borderRadius: 165,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.015)",
  },
  centerContainer: {
    position: "absolute",
    top: "47%",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -120 }],
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
    shadowOpacity: 0.45,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 14,
  },


  logo: {
    width: 38,
    height: 38,
  },

  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  // subtitle: {
  //   marginTop: 6,
  //   color: "rgba(255,255,255,0.5)",
  //   fontSize: 14,
  //   fontWeight: "400",
  //   lineHeight: 20,
  //   letterSpacing: 1.4,Animated.spring(...)
  //   textTransform: "uppercase",

  // },
  subtitle: {
    marginTop: 2,
    fontSize: 10,
    letterSpacing: 2.2,
    color: "rgba(255,255,255,.42)",
  },

  footer: {
    position: "absolute",
    bottom: 36,
    alignItems: "center",
  },

  powered: {
    fontSize: 9,
    color: "rgba(255,255,255,.25)",
  },

  company: {
    marginTop: 2,
    fontSize: 10,
    color: "rgba(255,255,255,.40)",
  },
});