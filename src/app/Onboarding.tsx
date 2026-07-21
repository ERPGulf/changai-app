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
import GradientButton from "../components/common/GradientButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
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
    try {
        await AsyncStorage.setItem("onboardingCompleted", "true");

        router.replace("/QrScan"); // Navigate to QR Scan screen
    } catch (error) {
        console.log("Error saving onboarding status:", error);
    }
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
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const handleNext = async () => {

        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {

            if (currentIndex < slides.length - 1) {

                flatListRef.current?.scrollToIndex({
                    index: currentIndex + 1,
                    animated: true,
                });

                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }).start();

            } else {
                finishOnboarding();
            }

        });

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
                        <Animated.View style={[styles.slide, { opacity: fadeAnim }]}>
                            <View style={styles.glowOuter}>

                                {/* Glow */}
                                <View
                                    style={[
                                        styles.glowCircle1,
                                        { backgroundColor: item.iconColor },
                                    ]}
                                />

                                <View
                                    style={[
                                        styles.glowCircle2,
                                        { backgroundColor: item.iconColor },
                                    ]}
                                />

                                <View
                                    style={[
                                        styles.glowCircle3,
                                        { backgroundColor: item.iconColor },
                                    ]}
                                />

                                {/* Rings */}
                                <View
                                    style={[
                                        styles.ringLarge,
                                        { borderColor: `${item.iconColor}10` },
                                    ]}
                                />

                                <View
                                    style={[
                                        styles.ringMedium,
                                        { borderColor: `${item.iconColor}10` },
                                    ]}
                                />

                                <View
                                    style={[
                                        styles.ringSmall,
                                        { borderColor: `${item.iconColor}10` },
                                    ]}
                                />

                                {/* Icon */}
                                <LinearGradient
                                    colors={[
                                        `${item.iconColor}26`,
                                        `${item.iconColor}12`,
                                    ]}
                                    style={styles.iconContainer}
                                >
                                    {item.id === "1" ? (
                                        <Image
                                            source={require("../../assets/images/Icon.png")}
                                            style={styles.robotIcon}
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

                            <Text style={styles.title}>{item.title}</Text>

                            <Text style={styles.description}>
                                {item.description}
                            </Text>
                        </Animated.View>
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
                                    {
                                        width: currentIndex === index ? 24 : 8,
                                        backgroundColor:
                                            currentIndex === index
                                                ? "#6C4FF8"
                                                : "rgba(255,255,255,0.15)",
                                    },
                                ]}
                            />
                        ))}
                    </View>
                    <GradientButton
                        title={
                            currentIndex === slides.length - 1
                                ? "Get Started →"
                                : "Continue →"
                        }
                        onPress={handleNext}
                        style={styles.button}
                    />
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

        borderWidth: 0.6,
        borderColor: "rgba(255,255,255,.10)",

        backgroundColor: "rgba(255,255,255,.03)",

        justifyContent: "center",
        alignItems: "center",

        zIndex: 10,
    },

    skipText: {
        color: "#83A9E3",
        textAlign: "center",
        fontFamily: "Consolas",
        fontSize: 12,
        fontWeight: "400",
        lineHeight: 16,
    },

    slide: {
        width,
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: "center",
        alignItems: "center",

    },

    ringLarge: {
        position: "absolute",

        width: 122,
        height: 122,

        borderRadius: 61,

        borderWidth: 0.6,
    },

    ringMedium: {
        position: "absolute",

        width: 94,
        height: 94,

        borderRadius: 47,

        borderWidth: 0.6,
    },
    ringSmall: {
        position: "absolute",

        width: 66,
        height: 66,

        borderRadius: 33,

        borderWidth: 0.6,
    },
    iconContainer: {
        width: 84,
        height: 84,
        borderRadius: 26,

        justifyContent: "center",
        alignItems: "center",

        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.10)",
    },
    glowOuter: {
        width: 220,
        height: 220,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    glowCircle1: {
        position: "absolute",
        width: 220,
        height: 220,
        borderRadius: 110,
        opacity: 0.015,
    },

    glowCircle2: {
        position: "absolute",
        width: 170,
        height: 170,
        borderRadius: 85,
        opacity: 0.035,
    },

    glowCircle3: {
        position: "absolute",
        width: 120,
        height: 120,
        borderRadius: 60,
        opacity: 0.08,
    },
    robotIcon: {
        width: 42,
        height: 42,
    },

    title: {
        marginTop: 10,
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
        width: 320,
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
        alignItems: "center",
        marginBottom: 30,
    },

    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },



    button: {
        width: "100%",
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