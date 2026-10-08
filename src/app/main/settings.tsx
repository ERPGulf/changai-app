import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Settings() {
    const [speakEnabled, setSpeakEnabled] = useState(true);
    const [refreshEnabled, setRefreshEnabled] = useState(true);
    const [alertEnabled, setAlertEnabled] = useState(true);
    const { fullname, userDetails } = useSelector(
        (state: any) => state.user
    );

    const designation =
        userDetails?.designation || userDetails?.designation_name || "Employee";

    const email = userDetails?.email || "";

    const initials =
        fullname
            ?.split(" ")
            .map((word: string) => word.charAt(0))
            .join("")
            .substring(0, 2)
            .toUpperCase() || "NA";
    return (
        <SafeAreaView
            style={styles.container}
            edges={["top"]}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <Text style={styles.title}>Settings</Text>

                {/* Profile */}
                <View style={styles.profileCard}>
                    <LinearGradient
                        colors={["#6C4FF8", "#00D4B4"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.avatar}
                    >
                        <Text style={styles.avatarText}>{initials}</Text>
                    </LinearGradient>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>{fullname || "Employee"}</Text>
                        <Text style={styles.role}>{designation}</Text>

                        {!!email && (
                            <Text style={styles.email}>{email}</Text>
                        )}
                    </View>
                </View>

                <Text style={styles.sectionTitle}>ERP Integrations</Text>

                <View style={styles.integrationCard}>
                    <View style={styles.icon}>
                        <Ionicons name="server-outline" size={18} color="#8A96B6" />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.integrationTitle}>SAP S/4HANA</Text>
                        <Text style={styles.integrationSub}>
                            Finance & Inventory
                        </Text>
                    </View>

                    <View style={styles.connectedBadge}>
                        <Text style={styles.connectedText}>✓ Connected</Text>
                    </View>
                </View>

                <View style={styles.integrationCard}>
                    <View style={styles.icon}>
                        <Ionicons name="server-outline" size={18} color="#8A96B6" />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.integrationTitle}>
                            SAP SuccessFactors
                        </Text>
                        <Text style={styles.integrationSub}>
                            Human Resources
                        </Text>
                    </View>

                    <View style={styles.connectedBadge}>
                        <Text style={styles.connectedText}>✓ Connected</Text>
                    </View>
                </View>

                <View style={styles.integrationCard}>
                    <View style={styles.icon}>
                        <Ionicons name="server-outline" size={18} color="#8A96B6" />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.integrationTitle}>SAP Ariba</Text>
                        <Text style={styles.integrationSub}>Procurement</Text>
                    </View>

                    <View style={styles.pendingBadge}>
                        <Text style={styles.pendingText}>Pending</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={18} color="#8A96B6" />
                    <Text style={styles.addText}>Add Integration</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Preferences</Text>

                <View style={styles.preferenceCard}>
                    <View style={styles.preferenceRow}>
                        <Text style={styles.preferenceText}>
                            changAI speaks answers aloud
                        </Text>
                        <Switch
                            value={speakEnabled}
                            onValueChange={setSpeakEnabled}
                            trackColor={{ false: "#2B3345", true: "#6C4FF8" }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.preferenceRow}>
                        <Text style={styles.preferenceText}>
                            Refresh ERP data every 5 min
                        </Text>
                        <Switch
                            value={refreshEnabled}
                            onValueChange={setRefreshEnabled}
                            trackColor={{ false: "#2B3345", true: "#6C4FF8" }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.preferenceRow}>
                        <Text style={styles.preferenceText}>
                            Alerts for critical ERP events
                        </Text>
                        <Switch
                            value={alertEnabled}
                            onValueChange={setAlertEnabled}
                            trackColor={{ false: "#2B3345", true: "#6C4FF8" }}
                            thumbColor="#FFFFFF"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#090B14",
        paddingHorizontal: 24,
    },

    title: {
        color: "#FFF",
        fontFamily: "Outfit_700Bold",
        fontSize: 20,
        lineHeight: 28,
        marginTop: 16,
        marginBottom: 24,
    },
    content: {
        paddingBottom: 24,
    },

    profileCard: {
        flexDirection: "row",
        alignItems: "center",

        padding: 16,

        borderRadius: 16,
        borderWidth: 0.8,
        borderColor: "rgba(255,255,255,0.07)",
        backgroundColor: "#0F1521",

        marginBottom: 28,
    },

    avatar: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",

        marginRight: 16,
    },

    avatarText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: "Outfit_600SemiBold",
        lineHeight: 24,
    },

    name: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "600",
    },

    role: {
        color: "#8A96B6",
        marginTop: 2,
    },

    email: {
        color: "#8A96B6",
        marginTop: 4,
    },

    sectionTitle: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 16,
    },

    integrationCard: {
        backgroundColor: "#151D2E",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        marginBottom: 12,
    },

    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#20293D",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    integrationTitle: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },

    integrationSub: {
        color: "#8A96B6",
        fontSize: 13,
        marginTop: 2,
    },

    connectedBadge: {
        backgroundColor: "#0D3A32",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },

    connectedText: {
        color: "#00D395",
        fontSize: 12,
        fontWeight: "600",
    },

    pendingBadge: {
        backgroundColor: "#3B3215",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },

    pendingText: {
        color: "#F2C94C",
        fontSize: 12,
        fontWeight: "600",
    },

    addButton: {
        height: 56,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 28,
    },

    addText: {
        color: "#8A96B6",
        marginLeft: 8,
        fontSize: 16,
    },

    preferenceCard: {
        backgroundColor: "#151D2E",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
        marginBottom: 120,
    },

    preferenceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 18,
    },

    preferenceText: {
        color: "#FFF",
        fontSize: 15,
        flex: 1,
        marginRight: 12,
    },

    divider: {
        height: 1,
        backgroundColor: "rgba(255,255,255,0.06)",
    },
});