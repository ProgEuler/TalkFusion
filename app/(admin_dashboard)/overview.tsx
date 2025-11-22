import colors from "@/constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Check, Search } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const HealthCard = ({ title, value, type }: { title: string; value: string; type: "online" | "offline" }) => (
    <View style={styles.healthCard}>
        <View style={[styles.iconCircle, type === "online" ? styles.iconOnline : styles.iconOffline]}>
            {type === "online" ? (
                <Check size={20} color="white" />
            ) : (
                <Text style={styles.exclamation}>!</Text>
            )}
        </View>
        <Text style={styles.healthValue}>{value}</Text>
        <Text style={styles.healthTitle}>{title}</Text>
    </View>
);

const ChannelItem = ({ icon, name, usage, messages }: { icon: any; name: string; usage: string; messages: string }) => (
    <View style={styles.channelItem}>
        <View style={styles.channelHeader}>
            {icon}
            <Text style={styles.channelName}>{name}</Text>
        </View>
        <View style={styles.channelStats}>
            <Text style={styles.statLabel}>Last Usage:</Text>
            <Text style={styles.statValue}>{usage}</Text>
        </View>
        <View style={styles.channelStats}>
            <Text style={styles.statLabel}>Messages Today:</Text>
            <Text style={styles.statValue}>{messages}</Text>
        </View>
    </View>
);

export default function OverviewPage() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.pageTitle}>Connections Health Overview</Text>

            <View style={styles.searchContainer}>
                <Search size={20} color={colors.dark.textSecondary} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search company"
                    placeholderTextColor={colors.dark.textSecondary}
                />
            </View>

            <View style={styles.healthRow}>
                <HealthCard title="Online Channels" value="20" type="online" />
                <HealthCard title="Offline Channels" value="4" type="offline" />
            </View>

            {/* Company Status Section - Repeated for demo */}
            {[1, 2].map((i) => (
                <View key={i} style={styles.companyCard}>
                    <View style={styles.companyHeader}>
                        <View style={styles.companyTitleRow}>
                            <View style={styles.diamondIcon} />
                            <Text style={styles.companyName}>TechCorp Inc.</Text>
                        </View>
                        <View style={styles.systemStatus}>
                            <Text style={styles.systemStatusText}>All Systems Operational</Text>
                        </View>
                    </View>

                    <View style={styles.channelsList}>
                        <ChannelItem
                            icon={<FontAwesome5 name="whatsapp" size={16} color="#10B981" />}
                            name="WhatsApp Business"
                            usage=""
                            messages=""
                        />
                        <ChannelItem
                            icon={<FontAwesome5 name="instagram" size={16} color="#E1306C" />}
                            name="Instagram"
                            usage=""
                            messages=""
                        />
                        <ChannelItem
                            icon={<FontAwesome5 name="facebook" size={16} color="#1877F2" />}
                            name="Facebook"
                            usage=""
                            messages=""
                        />
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark.background,
    },
    contentContainer: {
        padding: 20,
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.dark.text,
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.dark.border,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 24,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        color: colors.dark.text,
        fontSize: 14,
    },
    healthRow: {
        flexDirection: "row",
        gap: 16,
        marginBottom: 24,
    },
    healthCard: {
        flex: 1,
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    iconOnline: {
        backgroundColor: "#DB2777", // Pinkish/Magenta from image
    },
    iconOffline: {
        backgroundColor: "#2563EB", // Blue from image
    },
    exclamation: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    healthValue: {
        fontSize: 24,
        fontWeight: "700",
        color: "white",
        marginBottom: 4,
    },
    healthTitle: {
        fontSize: 12,
        color: colors.dark.textSecondary,
    },
    companyCard: {
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
    },
    companyHeader: {
        marginBottom: 20,
    },
    companyTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    diamondIcon: {
        width: 8,
        height: 8,
        transform: [{ rotate: "45deg" }],
        backgroundColor: colors.dark.textSecondary,
        borderWidth: 1,
        borderColor: "white",
    },
    companyName: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.dark.text,
    },
    systemStatus: {
        backgroundColor: "#1E3A8A", // Dark Blue
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: "flex-start",
    },
    systemStatusText: {
        fontSize: 10,
        color: "#60A5FA", // Light Blue
        fontWeight: "600",
    },
    channelsList: {
        gap: 16,
    },
    channelItem: {
        gap: 4,
    },
    channelHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 4,
    },
    channelName: {
        fontSize: 14,
        color: colors.dark.text,
    },
    channelStats: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    statLabel: {
        fontSize: 12,
        color: colors.dark.textSecondary,
    },
    statValue: {
        fontSize: 12,
        color: colors.dark.text,
    },
});
