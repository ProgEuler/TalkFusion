import { useGetAdminAnalyticsQuery } from "@/api/admin-api/analytics.api";
import ErrorScreen from "@/components/ErrorScreen";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { Inbox, Receipt, Send } from "lucide-react-native";
import React, { useState } from "react";
import { RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendColor: string;
  icon: React.ComponentType<{ color: string; size: number }>;
  iconColor: string;
}

const StatCard = ({
  title,
  value,
  trend,
  trendColor,
  icon: Icon,
  iconColor,
}: StatCardProps) => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>
      <Icon color={iconColor} size={24} />
    </View>
    <Text style={styles.cardValue}>{value}</Text>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={[styles.cardTrend, { color: trendColor }]}>{trend}</Text>
  </View>
);

interface AnalyticsData {
  current: number;
  previous: number;
}

interface AdminAnalyticsResponse {
  total_message_sent: AnalyticsData;
  total_message_received: AnalyticsData;
  monthly_revenue: AnalyticsData;
  total_revenue: number;
  time_scope: string;
}

export default function PerformancePage() {
  const [activeFilter, setActiveFilter] = useState("Today");

  const filterMapping: Record<string, string> = {
    Today: "today",
    "Last Months": "last_month",
    "Last Years": "last_year",
  };

  const { data, isLoading, isError, isFetching, refetch } = useGetAdminAnalyticsQuery(
    filterMapping[activeFilter]
  ) as {
    data: AdminAnalyticsResponse;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorScreen onRetry={refetch} />;

  const filters = ["Today", "Last Months", "Last Years"];

  const getTrend = (current: number, previous: number) => {
    if (previous === 0) return { trend: "0%", color: colors.dark.success };
    const diff = ((current - previous) / previous) * 100;
    const trend = `${diff > 0 ? "+" : ""}${diff.toFixed(1)}% from last period`;
    const color = diff >= 0 ? colors.dark.success : colors.dark.danger;
    return { trend, color };
  };

  const sentTrend = getTrend(
    data?.total_message_sent?.current || 0,
    data?.total_message_sent?.previous || 0
  );
  const receivedTrend = getTrend(
    data?.total_message_received?.current || 0,
    data?.total_message_received?.previous || 0
  );
  const revenueTrend = getTrend(
    data?.monthly_revenue?.current || 0,
    data?.monthly_revenue?.previous || 0
  );

  return (
    <Layout
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
    >
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
            value={data?.total_message_sent?.current.toLocaleString()}
            trend={sentTrend.trend}
            trendColor={sentTrend.color}
            icon={Send}
            iconColor="#F59E0B"
          />
          <StatCard
            title="Messages Received"
            value={data?.total_message_received?.current.toLocaleString()}
            trend={receivedTrend.trend}
            trendColor={receivedTrend.color}
            icon={Inbox}
            iconColor="#10B981"
          />
        </View>
        <View style={styles.row}>
          <StatCard
            title="Monthly Revenue"
            value={`$${data?.monthly_revenue?.current.toLocaleString()}`}
            trend={revenueTrend.trend}
            trendColor={revenueTrend.color}
            icon={Receipt}
            iconColor="#10B981"
          />
          <StatCard
            title="Total Revenue"
            value={`$${(data?.total_revenue || 0).toLocaleString()}`}
            trend="Lifetime"
            trendColor={colors.dark.success}
            icon={Receipt}
            iconColor="#8B5CF6"
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
