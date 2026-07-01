// services/api/changai/changAi.service.ts

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://hyrin.erpgulf.com:7061";

/* ===========================
   GENERATE TOKEN
=========================== */

export const generateToken = async (
  password: string,
): Promise<string | null> => {
  try {
    const baseUrl = await AsyncStorage.getItem("baseUrl");
    const appKey = await AsyncStorage.getItem("app_key");
    const userId = await AsyncStorage.getItem("user_id");

    if (!baseUrl) {
      throw new Error("Base URL missing from QR data");
    }

    if (!appKey) {
      throw new Error("App Key missing from QR data");
    }

    if (!userId) {
      throw new Error("User ID missing from QR data");
    }

    const form = new URLSearchParams();

    form.append("api_key", userId);
    form.append("api_secret", password);
    form.append("app_key", appKey);

    console.log("Generating token for:", userId);
    console.log("Using URL:", baseUrl);

    const response = await axios.post(
      `${baseUrl}/api/method/changai.changai.api.v2.text2sql_pipeline_v2.generate_token_secure`,
      form.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const token = response?.data?.data?.access_token;

    if (!token) {
      throw new Error("Token not found in API response");
    }

    await AsyncStorage.setItem("changai_access_token", token);

    console.log("ChangAI Token Saved");

    return token;
  } catch (error: any) {
    console.log(
      "ChangAI Token Error:",
      error?.response?.data || error?.message || error,
    );

    return null;
  }
};
/* ===========================
   SEND MESSAGE
=========================== */

export const sendChangAiMessage = async (
  question: string,
  userId: string = "mobile_user",
) => {
  try {
    const token = await AsyncStorage.getItem("changai_access_token");

    if (!token) {
      throw new Error("No token found. Please login again.");
    }

    const form = new URLSearchParams();

    form.append("question", question);
    form.append("user_id", userId);

    const response = await axios.post(
      `${BASE_URL}/api/method/changai.changai.api.v2.text2sql_pipeline_v2.ask_question_secure`,
      form.toString(),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log("Send Message Error:", error);
    throw error;
  }
};
/* ===========================
   TEXT TO SQL PIPELINE
=========================== */

export const runText2SqlPipeline = async (
  question: string,
  chatId: string = "9000",
) => {
  const token = await AsyncStorage.getItem("changai_access_token");

  if (!token) {
    throw new Error("No token found. Please login again.");
  }

  const form = new URLSearchParams();

  form.append("user_question", question);
  form.append("chat_id", chatId);
  form.append("request_id", Date.now().toString());
  form.append("sendNonErptoAI", "false");

  const response = await axios.post(
    `${BASE_URL}/api/method/changai.changai.api.v2.text2sql_pipeline_v2.run_text2sql_pipeline`,
    form.toString(),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  console.log("FULL API RESPONSE", JSON.stringify(response.data, null, 2));

  const message = response.data?.message;

  return {
    answer:
      typeof message?.Bot === "string"
        ? message.Bot
        : (message?.Bot?.answer ?? "No answer found"),
    sql: message?.["Cleaned SQL"] ?? "",
    result: message?.result ?? [],
    raw: message,
  };
};
