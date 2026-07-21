import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { router, useLocalSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import GradientButton from "../components/common/GradientButton";

import {
    setBaseUrl,
    setEmployeeCode,
    setFullname,
    setUsername,
} from "../redux/Slices/UserSlice";

import type { AppDispatch } from "../redux/Store";

export default function QrPreview() {
    const dispatch = useDispatch<AppDispatch>();

    const params = useLocalSearchParams();

    const qrData = params.data
        ? JSON.parse(params.data as string)
        : null;

    const qrImage = params.qrImage as string | undefined;

    if (!qrData) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        No QR data found
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    const handleAccept = async () => {
        await AsyncStorage.multiSet([
            ["company", qrData.company],
            ["employee_code", qrData.employee_code],
            ["full_name", qrData.full_name],
            ["api_key", qrData.api_key],
            ["user_id", qrData.api_key],
            ["app_key", qrData.app_key],
            ["baseUrl", qrData.baseUrl],
            ["photo", String(qrData.photo)],
            [
                "restrict_location",
                String(qrData.restrict_location),
            ],
            [
                "unrestricted_checkout_location",
                String(
                    qrData.unrestricted_checkout_location
                ),
            ],
        ]);

        dispatch(setUsername(qrData.api_key));
        dispatch(setFullname(qrData.full_name));
        dispatch(setBaseUrl(qrData.baseUrl));
        dispatch(setEmployeeCode(qrData.employee_code));

        router.replace("/Login");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Scan your QR code
                </Text>

                <View style={styles.statusRow}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>
                        QR code detected
                    </Text>
                </View>

                <View style={styles.qrCard}>
                    {qrImage ? (
                        <Image
                            source={{ uri: qrImage }}
                            style={styles.qrImage}
                            resizeMode="contain"
                        />
                    ) : (
                        <QRCode
                            value={JSON.stringify(qrData)}
                            size={210}
                        />
                    )}
                </View>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.cancelText}>
                        Cancel
                    </Text>
                </TouchableOpacity>

                <View style={styles.chooseButton}>
                    <GradientButton
                        title="Choose"
                        onPress={handleAccept}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#090B14",
        paddingHorizontal: 24,
    },

    content: {
        flex: 1,
        alignItems: "center",
    },

    title: {
        marginTop: 44,
        color: "#F8FAFC",
        fontSize: 30,
        fontWeight: "700",
    },

    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#00D6B4",
        marginRight: 8,
    },

    statusText: {
        color: "#00D6B4",
        fontSize: 14,
    },

    qrCard: {
        width: 280,
        height: 280,
        marginTop: 90,

        borderRadius: 30,

        borderWidth: 1.5,
        borderColor: "rgba(0,214,180,0.35)",

        backgroundColor: "#111827",

        justifyContent: "center",
        alignItems: "center",
    },

    qrImage: {
        width: 210,
        height: 210,
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 32,
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        height: 50,
        borderRadius: 16,
        backgroundColor: "#1A2237",
        justifyContent: "center",
        alignItems: "center",
    },

    cancelText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },

    chooseButton: {
        flex: 1,
        width: "100%",
        height: 50,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyText: {
        color: "#FFFFFF",
        fontSize: 18,
    },
});