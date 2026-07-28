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
import IconGlow from "../components/common/IconGlow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background from "../components/common/Background";
export default function Splash() {
  const iconOpacity = React.useRef(new Animated.Value(0)).current;
  const iconScale = React.useRef(new Animated.Value(0.85)).current;

  const titleOpacity = React.useRef(new Animated.Value(0)).current;
  const subtitleOpacity = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),

      Animated.spring(iconScale, {
        toValue: 1,
        friction: 6,
        tension: 70,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 500,
          delay: 150,
          useNativeDriver: true,
        }).start();
      });
    });

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
    <Background>
      <View style={styles.centerContainer}>

        <Animated.View
          style={{
            opacity: iconOpacity,
            transform: [{ scale: iconScale }],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconGlow
            color="#6C4FF8"
            size={380}
          />

          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/Icon.png")}
              style={styles.logo}
            />
          </View>
        </Animated.View>

        <Animated.View
          style={{
            opacity: titleOpacity,
            marginTop: 36,
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>
            changAI
          </Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: subtitleOpacity,
            marginTop: 4,
            alignItems: "center",
          }}
        >
          <Text style={styles.subtitle}>
            ERP INTELLIGENCE
          </Text>
        </Animated.View>

      </View>


      <View style={styles.footer}>
        <Text style={styles.powered}>Powered by</Text>
        <Text style={styles.company}>ERPGulf</Text>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080C14",
    justifyContent: "center",
    alignItems: "center",
  },


  centerContainer: {
    position: "absolute",
    top: "42%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    transform: [
      { translateY: -90 }, // Move the whole logo block upward
    ],
  },


  // glowLarge: {
  //   position: "absolute",
  //   width: 320,
  //   height: 320,
  //   borderRadius: 160,
  //   backgroundColor: "rgba(108,79,248,0.035)",
  // },
  // glowMedium: {
  //   position: "absolute",
  //   width: 250,
  //   height: 250,
  //   borderRadius: 125,
  //   backgroundColor: "rgba(108,79,248,0.055)",
  // },
  // glowSmall: {
  //   position: "absolute",
  //   width: 180,
  //   height: 180,
  //   borderRadius: 90,
  //   backgroundColor: "rgba(108,79,248,0.08)",
  // },
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
    marginTop: 0,

    color: "#FFF",

    fontFamily: "Outfit_700Bold",
    fontSize: 36,
    fontWeight: "700",

    lineHeight: 40,
    letterSpacing: -0.9,

    textAlign: "center",
  },

  subtitle: {
    marginTop: 0,
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