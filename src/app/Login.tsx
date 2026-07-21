import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientButton from "../components/common/GradientButton";
import { router } from "expo-router";
import { generateToken } from "../services/authService";

export default function Login() {
  const [password, setPassword] = useState("");
  const [employee, setEmployee] = useState({
    fullName: "",
    employeeCode: "",
    company: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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

    try {
      await generateToken(password);
      router.replace("/Home");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Decorative Background */}
      <LinearGradient
        colors={["#181235", "#090B14"]}
        style={styles.topBackground}
      />

      {/* QR Verified Badge */}
      <View style={styles.badge}>
        <Ionicons
          name="checkmark-circle"
          size={12}
          color="#00D4B4"
        />

        <Text style={styles.badgeText}>
          QR Verified
        </Text>
      </View>

      {/* Greeting */}
      <View style={styles.header}>
        <Text style={styles.loginLabel}>
          LOGIN
        </Text>

        <Text style={styles.title}>
          Good Morning,
          {employee.fullName
            ? ` ${employee.fullName.split(" ")[0]}!`
            : " User!"}
        </Text>
      </View>

      {/* Employee Card */}
      <View style={styles.employeeCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {employee.fullName
              .split(" ")
              .map((word) => word[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text style={styles.name}>
            {employee.fullName}
          </Text>
          <Text style={styles.role}>
            {employee.employeeCode} • {employee.company}
          </Text>
        </View>

        <View style={styles.liveBadge}>
          <Text style={styles.liveText}>
            SAP Live
          </Text>
        </View>
      </View>

      {/* Password */}
      <View style={styles.passwordSection}>
        <View style={styles.passwordHeader}>
          <Text style={styles.passwordLabel}>
            PASSWORD
          </Text>

          <TouchableOpacity>
            <Text style={styles.forgot}>
              Forgot?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={15}
            color="#7A8FAF"
          />

          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#7A8FAF"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={
                showPassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={15}
              color="#7A8FAF"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      {/* Login Button */}
      <GradientButton
        title="Login →"
        onPress={() => {
          router.replace("/Home");
        }}
      />

      {/* Rescan */}
      <TouchableOpacity style={styles.rescanButton}>
        <Ionicons
          name="refresh-outline"
          size={14}
          color="#FFFFFF"
        />

        <Text style={styles.rescanText}>
          Rescan QR
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090B14",
    paddingHorizontal: 24,
  },

  topBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 160,
  },

  badge: {
    alignSelf: "flex-end",
    marginTop: 8,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#163A38",

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 20,
  },

  badgeText: {
    marginLeft: 6,
    color: "#00D4B4",
    fontSize: 10,
    fontWeight: "400",
  },

  header: {
    marginTop: 50,
  },

  loginLabel: {
    color: "#7A8FAF",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 2,
  },

  title: {
    marginTop: 6,
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "outfit-bold",
    lineHeight: 32,
  },

  employeeCard: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#0F1521",
    borderRadius: 16,

    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.07)",

    paddingVertical: 14,
    paddingHorizontal: 16,

    minHeight: 72,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,

    backgroundColor: "#4B6BFF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "outfit-bold",
  },

  name: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "outfit-semibold",
    lineHeight: 22,
  },
  role: {
    marginTop: 2,
    color: "#7A8FAF",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "outfit-regular",
  },
  liveBadge: {
    marginLeft: 12,

    backgroundColor: "#113B38",

    borderRadius: 999,

    paddingHorizontal: 12,
    paddingVertical: 6,

    justifyContent: "center",
    alignItems: "center",
  },

  liveText: {
    color: "#00D4B4",
    fontSize: 11,
    fontFamily: "outfit-medium",
  },
  passwordSection: {
    marginTop: 24,
  },

  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  passwordLabel: {
    color: "#7A8FAF",
    fontSize: 11,
    letterSpacing: 2,
  },

  forgot: {
    color: "#6C4FF8",
    fontSize: 12,
  },

  inputContainer: {
    marginTop: 8,

    flexDirection: "row",
    alignItems: "center",

    minHeight: 48,

    paddingVertical: 14,
    paddingHorizontal: 16,

    borderRadius: 16,

    backgroundColor: "#151D2E",

    borderWidth: 0.8,
    borderColor: "rgba(255,255,255,0.07)",
  },

  input: {
    flex: 1,
    marginHorizontal: 12,

    color: "#FFFFFF",

    fontSize: 14,
    fontFamily: "outfit-regular",

    paddingVertical: 0,
  },

  rescanButton: {
    marginTop: 16,
    marginBottom: 24,

    height: 56,

    borderRadius: 16,

    backgroundColor: "#171D2E",

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
  },

  rescanText: {
    color: "#FFF",
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "outfit-semibold",

  },
});