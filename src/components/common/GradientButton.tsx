import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const GradientButton: React.FC<GradientButtonProps> = ({
    title,
    onPress,
    disabled = false,
    style,
    textStyle,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            disabled={disabled}
            style={[styles.container, style]}
        >
            <LinearGradient
                colors={["#6C4FF8", "#5038E0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.button,
                    disabled && styles.disabledButton,
                ]}
            >
                <Text style={[styles.buttonText, textStyle]}>
                    {title}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default GradientButton;

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    button: {
        width: "100%",
        height: 56,

        borderRadius: 16,

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#6C4FF8",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.35,
        shadowRadius: 28,
        elevation: 12,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24,
    },

    disabledButton: {
        opacity: 0.5,
    },
});