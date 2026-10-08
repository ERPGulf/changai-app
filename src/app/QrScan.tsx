// NOSONAR
import { Entypo, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import base64 from "base-64";
import {
  BarcodeScanningResult,
  Camera,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Stack, router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Linking,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import utf8 from "utf8";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import GradientButton from "../components/common/GradientButton";

import {
  setBaseUrl,
  setEmployeeCode,
  setFullname,
  setUsername,
} from "../redux/Slices/UserSlice";

import { COLORS, SIZES } from "../constants";
import type { AppDispatch } from "../redux/Store";

type RootStackParamList = {
  login: undefined;
  QrScan: undefined;
};

interface QRData {
  Company?: string;
  Employee_Code?: string;
  Full_Name?: string;
  User_id?: string;
  API?: string;
  App_key?: string;
  Photo?: string;
  "Restrict Location"?: string;
  "Unrestricted Checkout Location"?: string;
}

interface CleanedQRData {
  company: string;
  employee_code: string;
  full_name: string;
  api_key: string;
  baseUrl: string;
  app_key: string;
  photo: number;
  restrict_location: number;
  unrestricted_checkout_location: number;
}

const QrScan: React.FC = () => {


  const [permission, requestPermission] =
    useCameraPermissions();

  const [scanned, setScanned] = useState<boolean>(false);

  // onBarcodeScanned fires per frame, so state alone can't stop repeat calls
  const scanLock = useRef(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (
      permission &&
      !permission.granted &&
      permission.canAskAgain
    ) {
      requestPermission();
    }
    // only ask once on mount; later asks go through the button
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission?.status]);

  // Re-arm the scanner when coming back from QrPreview
  useFocusEffect(
    useCallback(() => {
      scanLock.current = false;
      setScanned(false);
    }, [])
  );

  const resetScan = (): void => {
    scanLock.current = false;
    setScanned(false);
  };

  const handlePermissionPress = async (): Promise<void> => {
    if (permission?.canAskAgain) {
      await requestPermission();
    } else {
      await Linking.openSettings();
    }
  };



  const sanitizeString = (
    value: unknown,
    defaultValue = ""
  ): string => {
    if (value === null || value === undefined) {
      return defaultValue;
    }

    return String(value).trim();
  };

  const sanitizeNumber = (
    value: unknown,
    defaultValue = 0
  ): number => {
    const parsed = Number(value);

    return Number.isFinite(parsed)
      ? parsed
      : defaultValue;
  };

  const handleQRCodeData = async (
    data: string
  ): Promise<void> => {
    try {
      const KEYS = [
        "Company",
        "Employee_Code",
        "Full_Name",
        "User_id",
        "API",
        "App_key",
        "Photo",
        "Restrict Location",
        "Unrestricted Checkout Location",
      ];

      let value = utf8.decode(base64.decode(data));
      console.log("Decoded QR Content:", value);

      value = value
        .replace(/[\u0000-\u001F\u00A0]+/g, " ")
        .replace(
          /[%#;]+(?:\s+)?(Company|Employee_Code|Full_Name|Photo|Restrict Location|Unrestricted Checkout Location|User_id|API|App_key)(?:\s*[:=])/g,
          (_match: string, key: string) => `${key}:`
        )
        .replace(/[^\S\r\n]+/g, " ")
        .trim();

      const qrData: QRData = {};

      const keyAlt = KEYS.join("|");

      const pairRE = new RegExp(
        `\\b(${keyAlt})\\s*[:=]\\s*([\\s\\S]*?)(?=\\s*(?:${keyAlt})\\s*[:=]|$)`,
        "gi"
      );

      let match: RegExpExecArray | null;

      while ((match = pairRE.exec(value)) !== null) {
        qrData[match[1] as keyof QRData] =
          match[2].trim();
      }

      Object.keys(qrData).forEach((key) => {
        const typedKey = key as keyof QRData;

        if (qrData[typedKey]) {
          qrData[typedKey] = qrData[typedKey]
            ?.replace(/[%#;]+$/, "")
            .trim();
        }
      });

      let appKey = qrData.App_key?.trim() || "";

      const missingPadding = appKey.length % 4;

      if (missingPadding) {
        appKey = appKey.padEnd(
          appKey.length + (4 - missingPadding),
          "="
        );
      }

      if (!appKey.endsWith("==")) {
        if (appKey.endsWith("=")) {
          appKey = appKey.slice(0, -1) + "==";
        } else {
          appKey += "==";
        }
      }


      const cleanedData: CleanedQRData = {
        company: sanitizeString(qrData.Company),
        employee_code: sanitizeString(
          qrData.Employee_Code
        ),
        full_name: sanitizeString(qrData.Full_Name),
        api_key: sanitizeString(qrData.User_id),
        baseUrl: sanitizeString(qrData.API),
        app_key: sanitizeString(appKey),
        photo: sanitizeNumber(qrData.Photo),
        restrict_location: sanitizeNumber(
          qrData["Restrict Location"]
        ),
        unrestricted_checkout_location:
          sanitizeNumber(
            qrData["Unrestricted Checkout Location"]
          ),
      };

      if (
        cleanedData.company &&
        cleanedData.employee_code &&
        cleanedData.baseUrl
      ) {
        await AsyncStorage.multiSet([
          ["company", cleanedData.company],
          ["employee_code", cleanedData.employee_code],
          ["full_name", cleanedData.full_name],
          ["api_key", cleanedData.api_key],
          ["user_id", cleanedData.api_key],
          ["app_key", cleanedData.app_key],
          ["baseUrl", cleanedData.baseUrl],
          ["photo", String(cleanedData.photo)],
          [
            "restrict_location",
            String(cleanedData.restrict_location),
          ],
          [
            "unrestricted_checkout_location",
            String(
              cleanedData.unrestricted_checkout_location
            ),
          ],
        ]);

        dispatch(setUsername(cleanedData.api_key));
        dispatch(setFullname(cleanedData.full_name));
        dispatch(setBaseUrl(cleanedData.baseUrl));
        dispatch(
          setEmployeeCode(cleanedData.employee_code)
        );

        router.push({
          pathname: "/QrPreview",
          params: {
            data: JSON.stringify(cleanedData),
          },
        });
      } else {
        alert("Invalid QR code. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid QR code");
    }
  };

  const handleBarCodeScanned = async ({
    data,
  }: BarcodeScanningResult): Promise<void> => {
    if (scanLock.current) return;
    scanLock.current = true;
    console.log("Raw QR Data:", data);
    setScanned(true);
    await handleQRCodeData(data);
  };

  const pickImage = async (): Promise<void> => {
    try {
      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

      if (result.canceled) return;

      const uri = result.assets?.[0]?.uri;

      if (uri) {
        const scannedResults =
          await Camera.scanFromURLAsync(uri);

        if (scannedResults.length > 0) {
          await handleQRCodeData(
            scannedResults[0].data
          );
        } else {
          alert("No QR-CODE Found");
        }
      }
    } catch {
      alert("No QR-CODE Found");
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#090B14" }}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Scan your QR code</Text>
          <Text style={styles.subtitle}>
            Point your camera at the QR code
          </Text>
        </View>

        <View style={styles.scannerContainer}>
          <View style={styles.qrContainer}>
            {permission?.granted ? (
              <>
                <CameraView
                  style={styles.camera}
                  facing="back"
                  barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                  }}
                  onBarcodeScanned={
                    scanned ? undefined : handleBarCodeScanned
                  }
                />

                <View style={styles.overlay} pointerEvents="none">
                  <Ionicons
                    name="qr-code-outline"
                    size={108}
                    color="rgba(255,255,255,0.12)"
                  />
                </View>
              </>
            ) : (
              <View style={styles.overlay}>
                <Ionicons
                  name="camera-outline"
                  size={40}
                  color="#7A8FAF"
                />
                <Text style={styles.permissionText}>
                  Camera access is needed to scan
                </Text>
                {permission && (
                  <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={handlePermissionPress}
                  >
                    <Text style={styles.permissionButtonText}>
                      {permission.canAskAgain
                        ? "Allow Camera"
                        : "Open Settings"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>

          <View style={styles.buttonGroup}>
            <GradientButton
              title="Upload from Files / Photos"
              onPress={pickImage}
            />

            {scanned && (
              <TouchableOpacity
                style={styles.scanAgainButton}
                onPress={resetScan}
              >
                <Text style={styles.scanAgainText}>
                  Scan Again
                </Text>
              </TouchableOpacity>
            )}

            {/* Dev builds only: lets us reach Login without a valid QR */}
            {__DEV__ && (
              <TouchableOpacity
                style={styles.devSkip}
                onPress={() => router.replace("/Login")}
              >
                <Text style={styles.devSkipText}>
                  Skip QR (dev only)
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.footerText}>
          Enterprise-grade · End-to-end encrypted
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default QrScan;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090B14",
    // Figma button is 326 wide on a 390 frame
    paddingHorizontal: 32,
  },

  header: {
    marginTop: 24,
    alignItems: "center",
  },

  title: {
    color: "#F8FAFC",
    fontSize: 20,
    fontFamily: "Outfit_700Bold",
    lineHeight: 34,
  },

  subtitle: {
    width: 240,
    color: "#7A8FAF",
    textAlign: "center",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 22.75,
  },

  scannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // Figma: scanner + button group sits slightly below centre
    paddingTop: 30,
  },

  buttonGroup: {
    alignSelf: "stretch",
    marginTop: 26,
  },

  qrContainer: {
    width: 240,
    height: 240,
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "#000",
  },

  camera: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  qrIcon: {
    opacity: 0.15,
  },

  permissionText: {
    marginTop: 10,
    color: "#7A8FAF",
    textAlign: "center",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },

  permissionButton: {
    marginTop: 14,
    paddingHorizontal: 18,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#6C4FF8",
    justifyContent: "center",
  },

  permissionButtonText: {
    color: "#FFF",
    fontFamily: "Inter_400Regular",
    fontSize: 13,
  },

  cornerTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#6C4FF8",
    borderTopLeftRadius: 12,
  },

  cornerTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#6C4FF8",
    borderTopRightRadius: 12,
  },

  cornerBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#6C4FF8",
    borderBottomLeftRadius: 12,
  },

  cornerBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#6C4FF8",
    borderBottomRightRadius: 12,
  },

  scanAgainButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#1C2230",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  devSkip: {
    alignSelf: "center",
    marginTop: 14,
    padding: 6,
  },

  devSkipText: {
    color: "#7A8FAF",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textDecorationLine: "underline",
  },

  scanAgainText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },

  uploadButton: {
    width: 270,
    height: 56,
    alignSelf: "center",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#6C4FF8",
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 12,
  },

  uploadText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },

  footerText: {
    marginBottom: 16,
    color: "#7A8FAF",
    textAlign: "center",
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    lineHeight: 16,
  },
});