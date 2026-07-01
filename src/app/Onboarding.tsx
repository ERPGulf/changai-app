import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");
const finishOnboarding = async () => {
    try {
        await AsyncStorage.setItem("onboardingCompleted", "true");
        router.replace("/Welcome");
    } catch (error) {
        console.log("Error saving onboarding status:", error);
    }
};
const slides = [
    {
        id: "1",
        icon: "briefcase-outline",
        iconColor: "#8B5CF6",
        glow: "rgba(139,92,246,0.15)",
        title: "Meet changAI",
        description:
            "Your AI assistant that listens and understands your entire business in real time.",
    },
    {
        id: "2",
        icon: "server-outline",
        iconColor: "#00D4B4",
        glow: "rgba(0,212,180,0.15)",
        title: "Connected to ERP",
        description:
            "Real answers. Live data. Zero SQL.",
    },
    {
        id: "3",
        icon: "stats-chart",
        iconColor: "#F59E0B",
        glow: "rgba(245,158,11,0.15)",
        title: "Instant Insights",
        description:
            "Get real-time business insights instantly, helping you act quickly on sales trends or stock issues.",
    },
];

export default function Onboarding() {
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = async () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            await finishOnboarding();
        }
    };

    return (
        <LinearGradient
            colors={["#090D16", "#080C14", "#05070D"]}
            style={styles.container}
        >
            <TouchableOpacity
                style={styles.skip}
                onPress={finishOnboarding}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(
                        e.nativeEvent.contentOffset.x / width
                    );
                    setCurrentIndex(index);
                }}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <View style={styles.glowContainer}>
                            <View
                                style={[
                                    styles.iconOuter,
                                    { backgroundColor: item.glow },
                                ]}
                            >
                                <View
                                    style={[
                                        styles.iconInner,
                                        {
                                            borderColor: item.iconColor,
                                            backgroundColor: item.glow,
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name={item.icon as any}
                                        size={20}
                                        color={item.iconColor}
                                    />
                                </View>
                            </View>
                        </View>

                        <Text style={styles.title}>{item.title}</Text>

                        <Text style={styles.description}>
                            {item.description}
                        </Text>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <View style={styles.dots}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity onPress={handleNext}>
                    <LinearGradient
                        colors={["#7C3AED", "#6D28D9"]}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            {currentIndex === slides.length - 1
                                ? "Get Started →"
                                : "Continue →"}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    skip: {
        position: "absolute",
        top: 60,
        right: 24,
        zIndex: 10,
        borderWidth: 1,
        borderColor: "#2E3445",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },

    skipText: {
        color: "#C0C5D2",
    },

    slide: {
        width,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
    },

    glowContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
        marginBottom: 40,
    },

    iconOuter: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    iconInner: {
        width: 32,
        height: 32,
        borderRadius: 8,
        borderWidth: 0.8,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        color: "#FFF",
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 14,
    },

    description: {
        color: "#8B93A8",
        fontSize: 15,
        lineHeight: 24,
        textAlign: "center",
    },

    footer: {
        position: "absolute",
        bottom: 45,
        width: "100%",
        paddingHorizontal: 24,
    },

    dots: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#444",
        marginHorizontal: 4,
    },

    activeDot: {
        width: 24,
        backgroundColor: "#7C3AED",
    },

    button: {
        borderRadius: 16,
        alignItems: "center",
        paddingVertical: 18,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
});