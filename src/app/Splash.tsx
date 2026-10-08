import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import IconGlow from "../components/common/IconGlow";
import BackgroundGlow from "../components/common/BackgroundGlow";
import Background from "../components/common/Background";

// Figma frame size. All positions below are in Figma (390 x 844) coordinates
// and are scaled to the device screen.
const FRAME_WIDTH = 390;
const FRAME_HEIGHT = 844;

const LOGO_SIZE = 96;
const LOGO_TOP = 306;
const TITLE_TOP = 426;
const SUBTITLE_TOP = 474;
const DOTS_CENTER_Y = 533;
const RINGS_CENTER_Y = 416;
const RING_SIZES = [350, 240, 160];
const FOOTER_TOP = 707;

const PURPLE_GLOW = { cx: 41, cy: 258, size: 260, opacity: 0.35 };
const TEAL_GLOW = { cx: 105, cy: 322, size: 180, opacity: 0.22 };

const MONO_FONT = Platform.select({ ios: "Menlo", default: "monospace" });

export default function Splash() {
  // Figma frame is the full screen (incl. status/nav bars), so scale against the screen, not the window
  const { width, height } = Dimensions.get("screen");
  const sx = width / FRAME_WIDTH;
  const sy = height / FRAME_HEIGHT;

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

    const timer = setTimeout(() => {
      router.replace("/Onboarding");
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const glow = (g: typeof PURPLE_GLOW, color: string) => (
    <BackgroundGlow
      color={color}
      size={g.size * sx}
      left={(g.cx - g.size / 2) * sx}
      top={g.cy * sy - (g.size * sx) / 2}
      opacity={g.opacity}
    />
  );

  return (
    <Background>
      {/* Ambient glows (top-left) */}
      {glow(PURPLE_GLOW, "#6C4FF8")}
      {glow(TEAL_GLOW, "#00D4B4")}

      {/* Concentric rings */}
      {RING_SIZES.map((size) => (
        <View
          key={size}
          pointerEvents="none"
          style={[
            styles.ring,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              left: width / 2 - size / 2,
              top: RINGS_CENTER_Y * sy - size / 2,
            },
          ]}
        />
      ))}

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoWrapper,
          {
            top: LOGO_TOP * sy,
            opacity: iconOpacity,
            transform: [{ scale: iconScale }],
          },
        ]}
      >
        <IconGlow color="#6C4FF8" size={220} />

        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/Icon.png")}
            style={styles.logo}
          />
        </View>
      </Animated.View>

      {/* Title */}
      <Animated.View
        style={[
          styles.row,
          { top: TITLE_TOP * sy, opacity: titleOpacity },
        ]}
      >
        <Text style={styles.title}>changAI</Text>
      </Animated.View>

      {/* Subtitle + loading dots */}
      <Animated.View
        style={[
          styles.row,
          { top: SUBTITLE_TOP * sy, opacity: subtitleOpacity },
        ]}
      >
        <Text style={styles.subtitle}>ERP INTELLIGENCE</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.row,
          styles.dots,
          { top: DOTS_CENTER_Y * sy - 2, opacity: subtitleOpacity },
        ]}
      >
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </Animated.View>

      {/* Footer */}
      <View style={[styles.row, { top: FOOTER_TOP * sy }]}>
        <Text style={styles.powered}>Powered by</Text>
        <Text style={styles.company}>ERPGulf</Text>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },

  ring: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  logoWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    height: LOGO_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
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
    color: "#FFF",

    fontFamily: "Outfit_700Bold",
    fontSize: 36,

    lineHeight: 40,
    letterSpacing: -0.9,

    textAlign: "center",
  },

  subtitle: {
    fontFamily: MONO_FONT,
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 2.4,
    color: "rgba(255,255,255,0.42)",
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  powered: {
    fontFamily: MONO_FONT,
    fontSize: 9,
    lineHeight: 12,
    color: "rgba(255,255,255,.25)",
  },

  company: {
    marginTop: 4,
    fontFamily: "Outfit_600SemiBold",
    fontSize: 10,
    lineHeight: 14,
    color: "rgba(255,255,255,.40)",
  },
});
