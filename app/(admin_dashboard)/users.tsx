import colors from "@/constants/colors";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface User {
    id: string;
    name: string;
    role: string;
    email: string;
}

const usersData: User[] = [
    { id: "1", name: "Jane Cooper", role: "Owner", email: "felicia.reid@example.com" },
    { id: "2", name: "Wade Warren", role: "Admin", email: "sara.cruz@example.com" },
    { id: "3", name: "Jenny Wilson", role: "Agent", email: "nathan.roberts@example.com" },
    { id: "4", name: "Guy Hawkins", role: "Owner", email: "jackson.graham@example.com" },
    { id: "5", name: "Kristin Watson", role: "Admin", email: "kristin.watson@example.com" },
    { id: "6", name: "Cody Fisher", role: "Agent", email: "cody.fisher@example.com" },
];

export default function UsersPage() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.headerTitle}>Admin control center</Text>

            <View style={styles.tableCard}>
                <Text style={styles.cardTitle}>Admin control center</Text>

                <View style={styles.tableHeader}>
                    <Text style={[styles.headerText, styles.colName]}>Name</Text>
                    <Text style={[styles.headerText, styles.colRole]}>role</Text>
                    <Text style={[styles.headerText, styles.colEmail]}>Email</Text>
                </View>

                {usersData.map((user) => (
                    <View key={user.id} style={styles.tableRow}>
                        <Text style={[styles.cellText, styles.colName]}>{user.name}</Text>
                        <Text style={[styles.cellText, styles.colRole]}>{user.role}</Text>
                        <Text style={[styles.cellText, styles.colEmail]} numberOfLines={1} ellipsizeMode="tail">
                            {user.email}
                        </Text>
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
    headerTitle: {
        fontSize: 16,
        color: colors.dark.textSecondary,
        marginBottom: 20,
    },
    tableCard: {
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 12,
        padding: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.dark.text,
        marginBottom: 24,
    },
    tableHeader: {
        flexDirection: "row",
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.dark.border,
    },
    headerText: {
        fontSize: 14,
        color: colors.dark.textSecondary,
        fontWeight: "500",
        textTransform: "capitalize",
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.dark.border,
    },
    cellText: {
        fontSize: 14,
        color: colors.dark.text,
    },
    colName: {
        flex: 1.5,
    },
    colRole: {
        flex: 1,
    },
    colEmail: {
        flex: 2.5,
    },
});
