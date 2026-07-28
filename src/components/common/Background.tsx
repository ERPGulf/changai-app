import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import BackgroundGlow from "./BackgroundGlow";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});


type BackgroundProps = {
    children: ReactNode;
};

export default function Background({ children }: BackgroundProps) {
    return (
        <LinearGradient
            colors={[
                "#0D0620",
                "#080C14",
                "#041018",
            ]}
            locations={[0.0849, 0.5, 0.9151]}
            start={{ x: 0.15, y: 0 }}
            end={{ x: 0.95, y: 1 }}
            style={{ flex: 1 }}
        >
            {/* Large ambient purple glow */}
            {/* <BackgroundGlow
                color="#6C4FF8"
                size={520}
                top={70}
                left={-90}
                opacity={0.18}
            /> */}

            <View style={styles.content}>
                {children}
            </View>
        </LinearGradient>
    );
}