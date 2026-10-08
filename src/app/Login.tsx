import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientButton from "../components/common/GradientButton";
import { router } from "expo-router";
import { generateToken } from "../services/authService";

const MONO_FONT = Platform.select({ ios: "Menlo", default: "monospace" });

// Pixel-grid header from the Figma frame
const CELL = 12;
const GAP = 6;
const GRID_ROWS = 7;

// Deterministic pseudo-random so the pattern doesn't change between renders
function noise(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function PixelGrid() {
  const { width } = useWindowDimensions();
  const cols = Math.ceil(width / (CELL + GAP));

  const cells = useMemo(() => {
    const out: { key: string; left: number; top: number; opacity: number }[] = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      // fade out towards the bottom of the header
      const rowFade = 1 - r / GRID_ROWS;
      for (let c = 0; c < cols; c++) {
        const n = noise(r * cols + c + 1);
        if (n < 0.45) continue;
        out.push({
          key: `${r}-${c}`,
          left: c * (CELL + GAP),
          top: r * (CELL + GAP),
          opacity: n * 0.2 * rowFade,
        });
      }
    }
    return out;
  }, [cols]);

  return (
    <View style={styles.gridWrap} pointerEvents="none">
      <LinearGradient
        colors={["#1A1240", "rgba(9,11,20,0)"]}
        style={StyleSheet.absoluteFill}
      />
      {cells.map((cell) => (
        <View
          key={cell.key}
          style={[
            styles.cell,
            { left: cell.left, top: cell.top, opacity: cell.opacity },
          ]}
        />
      ))}
    </View>
  );
}

export default function Login() {
  const [password, setPassword] = useState("");
  const [employee, setEmployee] = useState({
    fullName: "",
    employeeCode: "",
    company: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const fullName =
      (await AsyncStorage.getItem("full_name")) || "";

    const employeeCode =
      (await AsyncStorage.getItem("employee_code")) || "";

    const company =
      (await AsyncStorage.getItem("company")) || "";

    setEmployee({
      fullName,
      employeeCode,
      company,
    });
  };
  const handleLogin = async () => {
    if (!password.trim()) {
      Alert.alert("Error", "Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      await generateToken(password);
      router.replace("/main/Home");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const firstName = employee.fullName.split(" ")[0] || "User";

  const initials = employee.fullName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const subtitle = [employee.employeeCode, employee.company]
    .filter(Boolean)
    .join(" · ");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <PixelGrid />

      {/* QR Verified Badge */}
      <View style={styles.badge}>
        <Ionicons name="checkmark" size={11} color="#00D4B4" />
        <Text style={styles.badgeText}>QR Verified</Text>
      </View>

      {/* Greeting */}
      <View style={styles.header}>
        <Text style={styles.loginLabel}>LOGIN</Text>

        <Text style={styles.title}>
          {getGreeting()}, {firstName}!
        </Text>
      </View>

      {/* Employee Card */}
      <View style={styles.employeeCard}>
        <LinearGradient
          colors={["#4B6BFF", "#6C4FF8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>{initials}</Text>
        </LinearGradient>

        <View style={styles.employeeInfo}>
          <Text style={styles.name} numberOfLines={1}>
            {employee.fullName}
          </Text>
          {!!subtitle && (
            <Text style={styles.role} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>SAP Live</Text>
        </View>
      </View>

      {/* Password */}
      <View style={styles.passwordSection}>
        <View style={styles.passwordHeader}>
          <Text style={styles.passwordLabel}>PASSWORD</Text>

          <TouchableOpacity hitSlop={8}>
            <Text style={styles.forgot}>Forgot?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={14} color="#7A8FAF" />

          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#7A8FAF"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={handleLogin}
            returnKeyType="go"
            style={styles.input}
          />

          <TouchableOpacity
            hitSlop={8}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={14}
              color="#7A8FAF"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      {/* Login Button */}
      <GradientButton
        title={loading ? "Logging in..." : "Login"}
        rightIcon={loading ? undefined : "arrow-right"}
        onPress={handleLogin}
        disabled={loading}
      />

      {/* Rescan */}
      <TouchableOpacity
        style={styles.rescanButton}
        onPress={() => router.replace("/QrScan")}
      >
        <Feather name="refresh-cw" size={14} color="#FFFFFF" />

        <Text style={styles.rescanText}>Rescan QR</Text>
      </TouchableOpacity>

      {/* Dev builds only: lets us reach Home without a working login */}
      {__DEV__ && (
        <TouchableOpacity
          style={styles.devSkip}
          onPress={() => router.replace("/main/Home")}
        >
          <Text style={styles.devSkipText}>Skip login (dev only)</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090B14",
    paddingHorizontal: 24,
  },

  gridWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: GRID_ROWS * (CELL + GAP) + 40,
    overflow: "hidden",
  },

  cell: {
    position: "absolute",
    width: CELL,
    height: CELL,
    borderRadius: 2,
    backgroundColor: "#7A64FF",
  },

  badge: {
    alignSelf: "flex-end",
    marginTop: 12,

    flexDirection: "row",
    alignItems: "center",
    gap: 5,

    backgroundColor: "rgba(0,212,180,0.10)",
    borderWidth: 1,
    borderColor: "rgba(0,212,180,0.25)",

    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 999,
  },

  badgeText: {
    color: "#00D4B4",
    fontSize: 10,
    fontFamily: MONO_FONT,
  },

  header: {
    marginTop: 64,
  },

  loginLabel: {
    color: "#7A8FAF",
    fontSize: 10,
    fontFamily: MONO_FONT,
    letterSpacing: 1.5,
  },

  title: {
    marginTop: 6,
    color: "#FFF",
    fontSize: 24,
    fontFamily: "Outfit_700Bold",
    lineHeight: 32,
  },

  employeeCard: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#0F1521",
    borderRadius: 16,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",

    paddingVertical: 14,
    paddingHorizontal: 14,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Outfit_600SemiBold",
  },

  employeeInfo: {
    flex: 1,
    justifyContent: "center",
  },

  name: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Outfit_600SemiBold",
    lineHeight: 20,
  },

  role: {
    marginTop: 3,
    color: "#7A8FAF",
    fontSize: 11,
    lineHeight: 15,
    fontFamily: MONO_FONT,
  },

  liveBadge: {
    marginLeft: 10,

    flexDirection: "row",
    alignItems: "center",
    gap: 5,

    backgroundColor: "rgba(0,212,180,0.10)",
    borderWidth: 1,
    borderColor: "rgba(0,212,180,0.25)",
    borderRadius: 999,

    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#00D4B4",
  },

  liveText: {
    color: "#00D4B4",
    fontSize: 10,
    fontFamily: MONO_FONT,
  },

  passwordSection: {
    marginTop: 24,
  },

  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  passwordLabel: {
    color: "#7A8FAF",
    fontSize: 10,
    fontFamily: MONO_FONT,
    letterSpacing: 1.5,
  },

  forgot: {
    color: "#8B6FFF",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },

  inputContainer: {
    marginTop: 8,

    flexDirection: "row",
    alignItems: "center",

    height: 50,
    paddingHorizontal: 16,

    borderRadius: 14,

    backgroundColor: "#121A29",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },

  input: {
    flex: 1,
    marginHorizontal: 10,

    color: "#FFFFFF",

    fontSize: 14,
    fontFamily: "Inter_400Regular",

    paddingVertical: 0,
  },

  rescanButton: {
    marginTop: 14,
    marginBottom: 24,

    height: 52,

    borderRadius: 16,

    backgroundColor: "#121826",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    flexDirection: "row",
    gap: 8,

    justifyContent: "center",
    alignItems: "center",
  },

  devSkip: {
    alignSelf: "center",
    marginTop: -12,
    marginBottom: 12,
    padding: 6,
  },

  devSkipText: {
    color: "#7A8FAF",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textDecorationLine: "underline",
  },

  rescanText: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "Outfit_500Medium",
  },
});
