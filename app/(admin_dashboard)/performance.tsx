import { Layout } from "@/components/layout/Layout";
import colors from "@/constants/colors";
import { Inbox, Receipt, Send, TrendingUp } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    trendColor: string;
    icon: React.ComponentType<{ color: string; size: number }>;
    iconColor: string;
}

const StatCard = ({ title, value, trend, trendColor, icon: Icon, iconColor }: StatCardProps) => (
    <View style={styles.card}>
        <View style={styles.iconContainer}>
            <Icon color={iconColor} size={24} />
        </View>
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={[styles.cardTrend, { color: trendColor }]}>{trend}</Text>
    </View>
);

export default function PerformancePage() {
    const [activeFilter, setActiveFilter] = useState("Last Months");

    const filters = ["Today", "Last Months", "Last Years"];

    return (
      <Layout>
            <View style={styles.header}>

                <View style={styles.filterContainer}>
                    {filters.map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                styles.filterButton,
                                activeFilter === filter && styles.filterButtonActive,
                            ]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    activeFilter === filter && styles.filterTextActive,
                                ]}
                            >
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.grid}>
                <View style={styles.row}>
                    <StatCard
                        title="Messages Sent"
                        value="12,450"
                        trend="+12% from last month"
                        trendColor={colors.dark.success}
                        icon={Send}
                        iconColor="#F59E0B" // Amber/Orange
                    />
                    <StatCard
                        title="Messages Received"
                        value="10,890"
                        trend="+8% from last month"
                        trendColor={colors.dark.success}
                        icon={Inbox}
                        iconColor="#10B981" // Emerald/Green
                    />
                </View>
                <View style={styles.row}>
                    <StatCard
                        title="Total Costs"
                        value="$74,580"
                        trend="+8.2% from last month"
                        trendColor={colors.dark.danger} // Red for cost increase
                        icon={Receipt}
                        iconColor="#10B981" // Emerald/Green
                    />
                    <StatCard
                        title="Gross Profit"
                        value="$24,580"
                        trend="+15.3% from last month"
                        trendColor={colors.dark.success}
                        icon={TrendingUp}
                        iconColor="#3B82F6" // Blue
                    />
                </View>
            </View>
        </Layout>
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
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
        flexWrap: "wrap",
        gap: 16,
    },
    headerTitle: {
        fontSize: 18,
        color: colors.dark.text,
        fontWeight: "500",
    },
    filterContainer: {
        flexDirection: "row",
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 8,
        padding: 4,
        borderWidth: 1,
        borderColor: colors.dark.border,
    },
    filterButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    filterButtonActive: {
        backgroundColor: colors.dark.primary,
    },
    filterText: {
        fontSize: 12,
        color: colors.dark.textSecondary,
        fontWeight: "500",
    },
    filterTextActive: {
        color: "white",
    },
    grid: {
        gap: 16,
    },
    row: {
        flexDirection: "row",
        gap: 16,
    },
    card: {
        flex: 1,
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer: {
        marginBottom: 16,
    },
    cardValue: {
        fontSize: 28,
        fontWeight: "700",
        color: "white",
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 14,
        color: colors.dark.textSecondary,
        marginBottom: 8,
    },
    cardTrend: {
        fontSize: 12,
        fontWeight: "500",
    },
});
