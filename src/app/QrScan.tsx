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
import { Stack, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import utf8 from "utf8";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";


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

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);



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

        router.push("/Login");
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
    console.log("Raw QR Data:", data);
    setScanned(true);
    await handleQRCodeData(data);
  };

  const pickImage = async (): Promise<void> => {
    try {
      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes:
            ImagePicker.MediaTypeOptions.Images,
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
        }
      }
    } catch {
      alert("No QR-CODE Found");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#05010D" }}
    >
      <LinearGradient
        colors={["#05010D", "#240046", "#5A189A", "#9D4EDD"]}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingTop: 5,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Entypo
              name="chevron-left"
              size={28}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            Scan QR Code
          </Text>

          <View style={{ width: 28 }} />
        </View>

        {/* Logo
        <Image
          source={require("../../assets/images/ChangAI1.png")}
          style={{
            width: 100,
            height: 100,
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 15,
          }}
          resizeMode="contain"
        /> */}

        {/* Camera Card */}
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            gap: 50,
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: 24,
            overflow: "hidden",
            borderWidth: 2,
            borderColor: "rgba(255,255,255,0.2)",
          }}
        >
          <CameraView
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={
              scanned ? undefined : handleBarCodeScanned
            }
            facing="back"
            style={{ flex: 1 }}
          >
            <View
              style={{
                position: "absolute",
                top: "30%",
                alignSelf: "center",
                width: 240,
                height: 240,
                borderWidth: 3,
                borderColor: "#FFFFFF",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="qr-code-outline"
                size={160}
                color="rgba(255,255,255,0.15)"
              />
            </View>
          </CameraView>
        </View>

        {/* Bottom Buttons */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          {scanned && (
            <TouchableOpacity
              style={{
                height: 56,
                borderRadius: 16,
                backgroundColor:
                  "rgba(255,255,255,0.15)",
                borderWidth: 1,
                borderColor:
                  "rgba(255,255,255,0.25)",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 12,
              }}
              onPress={() => setScanned(false)}
            >
              <Ionicons
                name="scan-outline"
                size={22}
                color="#FFFFFF"
              />
              <Text
                style={{
                  color: "#FFFFFF",
                  marginLeft: 8,
                  fontWeight: "700",
                }}
              >
                Scan Again
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{
              height: 56,
              borderRadius: 16,
              backgroundColor: "#FFFFFF",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={pickImage}
          >
            <Ionicons
              name="image"
              size={22}
              color="#7C3AED"
            />

            <Text
              style={{
                color: "#7C3AED",
                marginLeft: 8,
                fontWeight: "700",
              }}
            >
              Select From Photos
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default QrScan;