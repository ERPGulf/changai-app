import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Image,
    Platform,
} from "react-native";
import GradientButton from "../components/common/GradientButton";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import IconGlow from "../components/common/IconGlow";
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
        iconColor: "#6C4FF8",
        glow: "rgba(139,92,246,0.15)",
        title: "Meet changAI",
        description:
            "Your AI assistant that listens and understands your entire business in real time.",
    },
    {
        id: "2",
        icon: "database",
        iconSet: Feather,
        iconColor: "#00D4B4",
        glow: "rgba(0,212,180,0.15)",
        title: "Connected to ERP",
        description:
            "Live sync with SAP, Oracle, and Microsoft Dynamics — ask questions about your data without writing a single query.",
    },
    {
        id: "3",
        icon: "bar-chart-2",
        iconSet: Feather,
        iconColor: "#F59E0B",
        glow: "rgba(245,158,11,0.15)",
        title: "Instant Insights",
        description:
            "From revenue trends to inventory alerts, changAI surfaces what matters before you even think to ask.",
    },
];

function SlideIcon({
    IconSet,
    name,
    color,
}: {
    IconSet: typeof Ionicons | typeof Feather;
    name: string;
    color: string;
}) {
    return <IconSet name={name as any} size={32} color={color} />;
}

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
                // onMomentumScrollEnd doesn't fire for programmatic scrolls on iOS
                setCurrentIndex(currentIndex + 1);

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
                    getItemLayout={(_, index) => ({
                        length: width,
                        offset: width * index,
                        index,
                    })}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.round(
                            e.nativeEvent.contentOffset.x / width
                        );
                        setCurrentIndex(index);
                    }}
                    renderItem={({ item }) => (
                        <Animated.View style={[styles.slide, { opacity: fadeAnim }]}>
                            <View style={styles.glowOuter}>
                                <IconGlow color={item.iconColor} />

                                {/* Glow */}
                                {/* <View
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
                                /> */}

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
                                {/* Figma: linear-gradient(135deg, color 20% → 7%), border 0.8px color 25% */}
                                <LinearGradient
                                    colors={[
                                        `${item.iconColor}33`,
                                        `${item.iconColor}12`,
                                    ]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={[
                                        styles.iconContainer,
                                        { borderColor: `${item.iconColor}40` },
                                    ]}
                                >
                                    {item.id === "1" ? (
                                        <Image
                                            source={require("../../assets/images/Icon.png")}
                                            style={styles.robotIcon}
                                        />
                                    ) : (
                                        <SlideIcon
                                            IconSet={item.iconSet ?? Ionicons}
                                            name={item.icon}
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
                                ? "Get Started"
                                : "Continue"
                        }
                        rightIcon="arrow-right"
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
        fontFamily: Platform.select({ ios: "Menlo", default: "monospace" }),
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
        // Lifts the content so the icon box centre sits at y≈318 of the 844 Figma frame
        paddingBottom: 146,
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
        width: 80,
        height: 80,
        borderRadius: 24,

        justifyContent: "center",
        alignItems: "center",

        borderWidth: 0.8,
    },
    glowOuter: {
        width: 220,
        height: 220,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        // The glow extends past the box; pull the title up so the box→title gap matches Figma
        marginBottom: -42,
    },
    // glowCircle1: {
    //     position: "absolute",
    //     width: 220,
    //     height: 220,
    //     borderRadius: 110,
    //     opacity: 0.015,
    // },

    // glowCircle2: {
    //     position: "absolute",
    //     width: 170,
    //     height: 170,
    //     borderRadius: 85,
    //     opacity: 0.035,
    // },

    // glowCircle3: {
    //     position: "absolute",
    //     width: 120,
    //     height: 120,
    //     borderRadius: 60,
    //     opacity: 0.08,
    // },
    robotIcon: {
        width: 32,
        height: 32,
    },

    title: {
        marginTop: 10,
        color: "#EEF2FF",
        textAlign: "center",
        fontSize: 30,
        fontFamily: "Outfit_700Bold",
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