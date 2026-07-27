// services/api/changai/changAi.service.ts

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ===========================
   SEND MESSAGE
=========================== */

export const sendChangAiMessage = async (
  question: string,
  userId: string = "mobile_user",
) => {
  try {
    const token = await AsyncStorage.getItem("changai_access_token");
    const baseUrl = await AsyncStorage.getItem("baseUrl");

    if (!token) {
      throw new Error("No token found. Please login again.");
    }

    if (!baseUrl) {
      throw new Error("Base URL not found. Please scan the QR again.");
    }

    const form = new URLSearchParams();

    form.append("question", question);
    form.append("user_id", userId);

    const response = await axios.post(
      `${baseUrl}/api/method/changai.changai.api.v2.text2sql_pipeline_v2.ask_question_secure`,
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
  const baseUrl = await AsyncStorage.getItem("baseUrl");

  if (!token) {
    throw new Error("No token found. Please login again.");
  }

  if (!baseUrl) {
    throw new Error("Base URL not found. Please scan the QR again.");
  }

  const form = new URLSearchParams();

  form.append("user_question", question);
  form.append("chat_id", chatId);
  form.append("request_id", Date.now().toString());
  form.append("sendNonErptoAI", "false");

  const response = await axios.post(
    `${baseUrl}/api/method/changai.changai.api.v2.text2sql_pipeline_v2.run_text2sql_pipeline`,
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
