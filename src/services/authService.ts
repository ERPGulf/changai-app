import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const generateToken = async (password: string) => {
  try {
    const baseUrl = await AsyncStorage.getItem("baseUrl");
    const apiKey = await AsyncStorage.getItem("api_key");
    const appKey = await AsyncStorage.getItem("app_key");

    if (!baseUrl || !apiKey || !appKey) {
      throw new Error("QR data not found. Please scan the QR again.");
    }

    const body = new URLSearchParams();

    body.append("api_key", apiKey);
    body.append("api_secret", password);
    body.append("app_key", appKey);

    const response = await axios.post(
      `${baseUrl}/api/method/changai.changai.api.v2.text2sql_pipeline_v2.generate_token_secure`,
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const token = response.data?.data;

    if (!token?.access_token) {
      throw new Error("Failed to generate token.");
    }

    await AsyncStorage.setItem(
      "changai_access_token",
      token.access_token
    );

    if (token.refresh_token) {
      await AsyncStorage.setItem(
        "changai_refresh_token",
        token.refresh_token
      );
    }

    return token;
  } catch (error: any) {
    console.log(
      "Generate Token Error:",
      error.response?.data || error.message
    );

    // Only HTTP errors mean the credentials were rejected; keep the
    // original message for missing QR data, network failures, etc.
    if (error.response) {
      throw new Error(
        error.response.data?.message || "Invalid password."
      );
    }

    throw new Error(error.message || "Something went wrong.");
  }
};