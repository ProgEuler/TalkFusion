import colors from "@/constants/colors";
import { ChevronDown, Download, FileText, Mail } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PaymentPage() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.pageTitle}>Payments & Reports Management</Text>

            <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownText}>TechCorp Inc.</Text>
                <ChevronDown size={20} color={colors.dark.text} />
            </View>

            <TouchableOpacity style={styles.createButton}>
                <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>

            <View style={styles.invoiceCard}>
                <View style={styles.invoiceIconCircle}>
                    <FileText size={24} color="white" />
                    <View style={styles.dollarBadge}>
                        <Text style={styles.dollarText}>$</Text>
                    </View>
                </View>
                <Text style={styles.viewInvoiceText}>View Invoice</Text>
            </View>

            <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.actionButtonPrimary}>
                    <Download size={18} color="white" />
                    <Text style={styles.actionButtonTextPrimary}>Download PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonSecondary}>
                    <Mail size={18} color="white" />
                    <Text style={styles.actionButtonTextSecondary}>Email to Client</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Financial Reports</Text>
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
        fontSize: 16,
        color: colors.dark.text,
        marginBottom: 20,
    },
    dropdownContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    dropdownText: {
        fontSize: 16,
        color: colors.dark.text,
    },
    createButton: {
        backgroundColor: colors.dark.primary,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginBottom: 24,
    },
    createButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    invoiceCard: {
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 12,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    invoiceIconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.dark.primary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
        position: "relative",
    },
    dollarBadge: {
        position: "absolute",
        top: -2,
        right: -2,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "white", // Or a lighter blue
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.dark.primary,
    },
    dollarText: {
        fontSize: 10,
        fontWeight: "bold",
        color: colors.dark.primary,
    },
    viewInvoiceText: {
        fontSize: 16,
        color: "white",
        textDecorationLine: "underline",
    },
    actionsRow: {
        flexDirection: "row",
        gap: 16,
        marginBottom: 32,
    },
    actionButtonPrimary: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.dark.primary,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    actionButtonSecondary: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EA580C", // Orange
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    actionButtonTextPrimary: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    actionButtonTextSecondary: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        color: colors.dark.text,
        fontWeight: "500",
    },
});
