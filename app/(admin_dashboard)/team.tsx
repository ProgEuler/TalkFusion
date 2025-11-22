import colors from "@/constants/colors";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    status: "Active" | "Inactive";
    avatar: string; // URL or local require
}

const teamData: TeamMember[] = [
    {
        id: "1",
        name: "John Doe",
        role: "Owner & CEO",
        status: "Active",
        avatar: "https://i.pravatar.cc/150?u=john",
    },
    {
        id: "2",
        name: "John Doe",
        role: "Owner & CEO",
        status: "Active",
        avatar: "https://i.pravatar.cc/150?u=john2",
    },
    {
        id: "3",
        name: "John Doe",
        role: "Owner & CEO",
        status: "Active",
        avatar: "https://i.pravatar.cc/150?u=john3",
    },
];

const MemberCard = ({ member }: { member: TeamMember }) => (
    <View style={styles.card}>
        <View style={styles.headerRow}>
            <View style={styles.userInfo}>
                <Image source={{ uri: member.avatar }} style={styles.avatar} />
                <View>
                    <View style={styles.nameRow}>
                        <Text style={styles.name}>{member.name}</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>{member.status}</Text>
                            <View style={styles.statusDot} />
                        </View>
                    </View>
                    <Text style={styles.role}>{member.role}</Text>
                </View>
            </View>
            <Text style={styles.activityLabel}>Activity</Text>
        </View>

        <View style={styles.activityList}>
            <View style={styles.activityItem}>
                <Text style={styles.activityText}>Last Login</Text>
            </View>
            <View style={styles.activityItem}>
                <Text style={styles.activityText}>New User Add</Text>
            </View>
            <View style={styles.activityItem}>
                <Text style={styles.activityText}>Invoice Download</Text>
            </View>
            <View style={styles.activityItem}>
                <Text style={styles.activityText}>Payments</Text>
            </View>
        </View>
    </View>
);

export default function TeamPage() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.pageTitle}>Team Members</Text>

            <View style={styles.listContainer}>
                {teamData.map((member) => (
                    <MemberCard key={member.id} member={member} />
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
    pageTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.dark.text,
        marginBottom: 20,
    },
    listContainer: {
        gap: 16,
    },
    card: {
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 12,
        padding: 20,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 24,
    },
    userInfo: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.dark.border,
    },
    nameRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.dark.text,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(16, 185, 129, 0.2)", // Green with opacity
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 12,
        gap: 4,
    },
    statusText: {
        fontSize: 10,
        color: colors.dark.success,
        fontWeight: "600",
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.dark.success,
    },
    role: {
        fontSize: 12,
        color: colors.dark.textSecondary,
        marginTop: 2,
    },
    activityLabel: {
        fontSize: 12,
        color: colors.dark.text,
        fontWeight: "500",
    },
    activityList: {
        gap: 0,
    },
    activityItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.dark.border,
    },
    activityText: {
        fontSize: 14,
        color: colors.dark.text,
    },
});
