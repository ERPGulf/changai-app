import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
});

// Figma: linear-gradient(160deg, #0D0620 8.49%, #080C14 50%, #041018 91.51%)
const ANGLE_DEG = 160;

// Converts a CSS gradient angle into expo-linear-gradient start/end points
// (fractions of the view), using the same gradient-line length as CSS.
function cssAngleToPoints(angleDeg: number, width: number, height: number) {
    const rad = (angleDeg * Math.PI) / 180;
    const dx = Math.sin(rad);
    const dy = -Math.cos(rad);
    const halfLength =
        (Math.abs(width * dx) + Math.abs(height * dy)) / 2;

    return {
        start: {
            x: 0.5 - (dx * halfLength) / width,
            y: 0.5 - (dy * halfLength) / height,
        },
        end: {
            x: 0.5 + (dx * halfLength) / width,
            y: 0.5 + (dy * halfLength) / height,
        },
    };
}

type BackgroundProps = {
    children: ReactNode;
};

export default function Background({ children }: BackgroundProps) {
    const { width, height } = Dimensions.get("screen");
    const { start, end } = cssAngleToPoints(ANGLE_DEG, width, height);

    return (
        <LinearGradient
            colors={["#0D0620", "#080C14", "#041018"]}
            locations={[0.0849, 0.5, 0.9151]}
            start={start}
            end={end}
            style={{ flex: 1 }}
        >
            <View style={styles.content}>
                {children}
            </View>
        </LinearGradient>
    );
}
