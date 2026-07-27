import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../../components/home/Header";
import AiCard from "../../components/home/AiCard";
import BottomNav from "../../components/home/BottomNav";
import RecentQuestions from "../../components/home/RecentQuestions";

export default function Home() {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const name =
      (await AsyncStorage.getItem("full_name")) || "";

    setFullName(name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#090B14"
      />

      <Header
        name={fullName || "User"}
      />

      <AiCard />

      <RecentQuestions />

      {/* <BottomNav /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090B14",
    paddingHorizontal: 24,
  },
});