import React, { useState } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    LayoutChangeEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

interface GradientButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    rightIcon?: React.ComponentProps<typeof Feather>["name"];
}

// CSS 135deg gradient line for a w x h box, as expo-linear-gradient start/end points
function points135(w: number, h: number) {
    const d = Math.SQRT1_2;
    const half = (w * d + h * d) / 2;
    return {
        start: { x: 0.5 - (d * half) / w, y: 0.5 - (d * half) / h },
        end: { x: 0.5 + (d * half) / w, y: 0.5 + (d * half) / h },
    };
}

const GradientButton: React.FC<GradientButtonProps> = ({
    title,
    onPress,
    disabled = false,
    style,
    textStyle,
    rightIcon,
}) => {
    // Figma button is 326 x 52; replaced by the real size after layout
    const [size, setSize] = useState({ w: 326, h: 52 });
    const { start, end } = points135(size.w, size.h);

    const onLayout = (e: LayoutChangeEvent) => {
        const { width, height } = e.nativeEvent.layout;
        if (width && height) setSize({ w: width, h: height });
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            disabled={disabled}
            style={[styles.container, style]}
        >
            {/* Figma: linear-gradient(135deg, #6C4FF8 0%, #5038E0 100%) */}
            <LinearGradient
                colors={["#6C4FF8", "#5038E0"]}
                start={start}
                end={end}
                onLayout={onLayout}
                style={[
                    styles.button,
                    disabled && styles.disabledButton,
                ]}
            >
                <Text style={[styles.buttonText, textStyle]}>
                    {title}
                </Text>
                {rightIcon && (
                    <Feather name={rightIcon} size={16} color="#FFFFFF" />
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default GradientButton;

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    // Figma: padding 14px 0, gap 8px, radius 16, shadow 0 8px 28px rgba(108,79,248,0.35)
    button: {
        width: "100%",
        paddingVertical: 14,

        borderRadius: 16,

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,

        boxShadow: "0 8px 28px 0 rgba(108, 79, 248, 0.35)",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "Outfit_600SemiBold",
        lineHeight: 24,
    },

    disabledButton: {
        opacity: 0.5,
    },
});
