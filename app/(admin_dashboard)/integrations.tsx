import colors from "@/constants/colors";
import { Briefcase, Eye } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IntegrationItem {
    id: string;
    name: string;
    email: string;
    company: string;
}

const integrationsData: IntegrationItem[] = [
    { id: "1", name: "Jane Cooper", email: "felicia.reid@example.com", company: "Louis Vuitton" },
    { id: "2", name: "Jane Cooper", email: "felicia.reid@example.com", company: "Louis Vuitton" },
    { id: "3", name: "Jane Cooper", email: "felicia.reid@example.com", company: "Louis Vuitton" },
    { id: "4", name: "Jane Cooper", email: "felicia.reid@example.com", company: "Louis Vuitton" },
];

export default function IntegrationsPage() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header Card */}
            <View style={styles.headerCard}>
                <View>
                    <Text style={styles.headerCardTitle}>Facebook API</Text>
                    <Text style={styles.headerCardSubtitle}>Approve or manage access keys</Text>
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity style={[styles.actionButton, styles.enableButton]}>
                        <Text style={styles.enableButtonText}>All Enable</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.disableButton]}>
                        <Text style={styles.disableButtonText}>All Disable</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Integrations List */}
            <View style={styles.listContainer}>
                {integrationsData.map((item, index) => (
                    <View key={`${item.id}-${index}`} style={styles.itemCard}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.name}</Text>

                            <View style={styles.row}>
                                <Text style={styles.itemEmail}>{item.email}</Text>
                            </View>

                            <View style={styles.row}>
                                <Briefcase size={14} color={colors.dark.primary} />
                                <Text style={styles.itemCompany}>{item.company}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.viewButton}>
                            <Eye size={16} color={colors.dark.primary} />
                            <Text style={styles.viewButtonText}>View</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
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
    headerCard: {
        backgroundColor: "#111111", // Darker background for the header card
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
    },
    headerCardTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.dark.text,
        marginBottom: 8,
    },
    headerCardSubtitle: {
        fontSize: 14,
        color: colors.dark.textSecondary,
        marginBottom: 24,
    },
    actionButtons: {
        flexDirection: "row",
        gap: 16,
    },
    actionButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        minWidth: 100,
        alignItems: "center",
    },
    enableButton: {
        backgroundColor: colors.dark.primary,
    },
    disableButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.dark.danger,
    },
    enableButtonText: {
        color: "white",
        fontWeight: "600",
    },
    disableButtonText: {
        color: colors.dark.danger,
        fontWeight: "600",
    },
    listContainer: {
        gap: 16,
    },
    itemCard: {
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    itemInfo: {
        gap: 6,
    },
    itemName: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.dark.primary,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    itemEmail: {
        fontSize: 14,
        color: colors.dark.textSecondary,
    },
    itemCompany: {
        fontSize: 14,
        color: colors.dark.text,
    },
    viewButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.dark.primary,
    },
    viewButtonText: {
        color: colors.dark.primary,
        fontWeight: "600",
    },
});
