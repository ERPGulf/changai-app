import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");
// const finishOnboarding = async () => {
//     try {
//         await AsyncStorage.setItem("onboardingCompleted", "true");
//         router.replace("/Welcome");
//     } catch (error) {
//         console.log("Error saving onboarding status:", error);
//     }
// };
const finishOnboarding = async () => {
    console.log("Onboarding completed");
    // Temporarily disable navigation while designing.
};
const slides = [
    {
        id: "1",
        icon: "null",
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
    const insets = useSafeAreaInsets();
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
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            <LinearGradient
                colors={["#090B14", "#070A12", "#05060D"]}
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
                    style={{ flex: 1 }}
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
                            <View style={styles.glowOuter}>
                                <View style={styles.glowRing}>
                                    <View style={styles.iconGlow} />
                                    <LinearGradient
                                        colors={[
                                            "rgba(108,79,248,0.20)",
                                            "rgba(108,79,248,0.07)",
                                        ]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.iconContainer}
                                    >

                                        {item.id === "1" ? (
                                            <Image
                                                source={require("../../assets/images/Icon.png")}
                                                style={styles.robotIcon}
                                                resizeMode="contain"
                                            />
                                        ) : (
                                            <Ionicons
                                                name={item.icon as any}
                                                size={36}
                                                color={item.iconColor}
                                            />
                                        )}
                                    </LinearGradient>

                                </View>
                            </View>

                            <Text style={styles.title}>{item.title}</Text>

                            <Text style={styles.description}>
                                {item.description}
                            </Text>
                        </View>
                    )}
                />

                <View
                    style={[
                        styles.footer,
                        {
                            paddingBottom: insets.bottom + 16,
                        },
                    ]}
                >
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
                            colors={["#8B5CF6", "#6D28D9"]}
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    skip: {
        position: "absolute",
        top: 58,
        right: 24,

        width: 60,
        height: 34,

        borderRadius: 17,

        borderWidth: 1,
        borderColor: "rgba(255,255,255,.10)",

        backgroundColor: "rgba(255,255,255,.03)",

        justifyContent: "center",
        alignItems: "center",

        zIndex: 10,
    },

    skipText: {
        color: "#C0C5D2",
    },

    slide: {
        width,
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: "center",
        alignItems: "center",

    },

    glowOuter: {
        width: 132,
        height: 132,
        justifyContent: "center",
        alignItems: "center",
    },

    glowRing: {
        width: 108,
        height: 108,
        borderRadius: 54,
        borderWidth: 1,
        borderColor: "rgba(108,79,248,0.08)",
        justifyContent: "center",
        alignItems: "center",
    },

    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 24,

        borderWidth: 0.8,
        borderColor: "rgba(108,79,248,0.25)",

        justifyContent: "center",
        alignItems: "center",
    },

    robotIcon: {
        width: 42,
        height: 42,
    },

    title: {
        marginTop: 32,
        color: "#EEF2FF",
        textAlign: "center",
        fontSize: 30,
        fontFamily: "Outfit_700Bold",
        fontWeight: "700",
        lineHeight: 36,
    },

    iconGlow: {
        position: "absolute",
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "rgba(108,79,248,0.10)",
    },

    description: {
        width: 290,          // adjust if needed (280–300)
        marginTop: 12,
        color: "#7A8FAF",
        textAlign: "center",

        fontFamily: "Inter_400Regular",
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 23,
    },

    dots: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30,
    },

    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginHorizontal: 4,
        backgroundColor: "rgba(255,255,255,.20)",
    },

    activeDot: {
        width: 14,
        borderRadius: 2,
        backgroundColor: "#7C3AED",
    },

    button: {
        height: 60,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#7C3AED",
        shadowOpacity: 0.45,
        shadowRadius: 20,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        elevation: 15,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        paddingHorizontal: 28,
    },
});