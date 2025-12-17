import { useGetAdminDataQuery } from "@/api/admin-api/dashboard.api";
import AdminChart from "@/components/admin-chart";
import ErrorScreen from "@/components/Error";
import { Layout } from "@/components/layout/Layout";
import Tickets from "@/components/tickets";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import React from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";

const StatsCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title.toLocaleUpperCase()}</Text>
    <Text style={[styles.cardValue, { color }]}>{value}</Text>
  </View>
);

export default function AdminDashboard() {
  const { data, isLoading, isError, isFetching, refetch } =
    useGetAdminDataQuery(undefined);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorScreen />;
  console.log("admin dashboard", data);

  return (
    <Layout
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
    >
      {/* Stats Grid */}
      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <StatsCard
            title="Total Users"
            value={data.totalUsers}
            color={colors.dark.primary}
          />
          <StatsCard
            title="Active Integrations"
            value={data.activeIntegrations}
            color={colors.dark.primary}
          />
        </View>
        <View style={styles.row}>
          <StatsCard
            title="Net Profit this month"
            value={"$" + data.netProfit}
            color={colors.dark.primary}
          />
          <StatsCard
            title="New companies"
            value={data.newCompanies}
            color={colors.dark.primary}
          />
        </View>
      </View>

      {/* Chart Section */}
      <AdminChart chartData={data.chartData} />

      {/* Support Tickets */}
      <Tickets tickets={data.openTickets} />

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
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.dark.text,
    marginBottom: 20,
  },
  gridContainer: {
    gap: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: colors.dark.cardBackground,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
  },
  cardTitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 8,
    textAlign: "center",
  },
  cardValue: {
    fontSize: 36,
    fontWeight: "700",
  },
  chartCard: {
    backgroundColor: colors.dark.cardBackground,
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: "center", // Center the chart
    overflow: "hidden", // Prevent overflow
  },
  ticketsContainer: {
    backgroundColor: colors.dark.cardBackground,
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark.text,
    marginBottom: 20,
  },
  ticketHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  ticketHeaderId: {
    width: 100,
    fontSize: 14,
    fontWeight: "600",
    color: colors.dark.primary,
  },
  ticketHeaderSubject: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: colors.dark.primary,
  },
  ticketRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  ticketId: {
    width: 100,
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  ticketSubject: {
    flex: 1,
    fontSize: 14,
    color: colors.dark.text,
  },
});
