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

    // const checkAppState = async () => {
    //   try {
    //     const onboardingCompleted = await AsyncStorage.getItem(
    //       "onboardingCompleted"
    //     );

    //     setTimeout(() => {
    //       if (onboardingCompleted === "true") {
    //         router.replace("/Welcome");
    //       } else {
    //         router.replace("/Onboarding");
    //       }
    //     }, 2500);
    //     router.replace("/Onboarding");
    //   } catch (error) {
    //     console.log(error);

    //     setTimeout(() => {
    //       router.replace("/Onboarding");
    //     }, 2500);
    //   }
    // };
    const checkAppState = async () => {
      setTimeout(() => {
        router.replace("/Onboarding");
      }, 5000); // 5 seconds
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
      <Animated.View
        style={[
          styles.centerContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >

        <View style={styles.glowLarge} />
        <View style={styles.glowMedium} />
        <View style={styles.glowSmall} />
        {/* <View style={styles.ring4} />
        <View style={styles.ring3} />
        <View style={styles.ring2} />
        <View style={styles.ring1} /> */}

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
  // ring4: {
  //   position: "absolute",
  //   width: 320,
  //   height: 320,
  //   borderRadius: 160,

  //   borderWidth: .8,
  //   borderColor: "rgba(255,255,255,.05)",
  // },

  // ring3: {
  //   position: "absolute",
  //   width: 260,
  //   height: 260,
  //   borderRadius: 130,

  //   borderWidth: .8,
  //   borderColor: "rgba(255,255,255,.04)",
  // },

  // ring2: {
  //   position: "absolute",
  //   width: 200,
  //   height: 200,
  //   borderRadius: 100,

  //   borderWidth: .8,
  //   borderColor: "rgba(255,255,255,.03)",
  // },

  // ring1: {
  //   position: "absolute",
  //   width: 140,
  //   height: 140,
  //   borderRadius: 70,

  //   borderWidth: .8,
  //   borderColor: "rgba(255,255,255,.02)",
  // },

  centerContainer: {
    position: "absolute",
    top: "39%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },


  glowLarge: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(108,79,248,0.035)",
  },
  glowMedium: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(108,79,248,0.055)",
  },
  glowSmall: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(108,79,248,0.08)",
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 32,

    backgroundColor: "#090613",

    borderWidth: 1.6,
    borderColor: "rgba(108,79,248,0.55)",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#6C4FF8",
    shadowOpacity: 0.22,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 10,
  },

  logo: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },

  title: {
    marginTop: 18,
    fontSize: 26,
    fontWeight: "700",
    color: "#FFF",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 9,
    letterSpacing: 2.4,
    color: "rgba(255,255,255,0.42)",
  },

  footer: {
    position: "absolute",
    bottom: 90,
    left: 0,
    right: 0,
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