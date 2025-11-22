import { Layout } from "@/components/layout/Layout";
import colors from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";

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
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={[styles.cardValue, { color }]}>{value}</Text>
  </View>
);

const TicketItem = ({ id, subject }: { id: string; subject: string }) => (
  <View style={styles.ticketRow}>
    <Text style={styles.ticketId}>{id}</Text>
    <Text style={styles.ticketSubject} numberOfLines={1}>
      {subject}
    </Text>
  </View>
);

export default function AdminDashboard() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 380;

  // Chart Data
  const lineData1 = [
    { value: 2000, label: "Jan" },
    { value: 5000, label: "Feb" },
    { value: 8000, label: "Mar" },
    { value: 10000, label: "Apr" },
  ];
  const lineData2 = [
    { value: 0, label: "Jan" },
    { value: 1500, label: "Feb" },
    { value: 2500, label: "Mar" },
    { value: 3800, label: "Apr" },
  ];

  return (
    <Layout>
      <Text style={styles.headerTitle}>Admin control center</Text>

      {/* Stats Grid */}
      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <StatsCard
            title="Total Users"
            value="10,23"
            color={colors.dark.primary}
          />
          <StatsCard
            title="Active Integrations"
            value="20"
            color={colors.dark.primary}
          />
        </View>
        <View style={styles.row}>
          <StatsCard
            title="Net Profit this month"
            value="$ 99.99"
            color={colors.dark.primary}
          />
          <StatsCard
            title="New companies"
            value="513"
            color={colors.dark.primary}
          />
        </View>
      </View>

      {/* Chart Section */}
      <View style={styles.chartCard}>
        <LineChart
          data={lineData1}
          data2={lineData2}
          height={220}
          width={width - 80} // Adjust based on padding
          initialSpacing={20}
          color1="#F59E0B" // Yellow/Orange
          color2="#06B6D4" // Cyan
          textColor1="white"
          dataPointsColor1="#F59E0B"
          dataPointsColor2="#06B6D4"
          startFillColor1="#F59E0B"
          startFillColor2="#06B6D4"
          startOpacity={0.1}
          endOpacity={0.1}
          noOfSections={7}
          maxValue={14000}
          yAxisTextStyle={{ color: colors.dark.textSecondary, fontSize: 12 }}
          xAxisLabelTextStyle={{
            color: colors.dark.textSecondary,
            fontSize: 12,
          }}
          yAxisColor={colors.dark.border}
          xAxisColor={colors.dark.border}
          rulesColor={colors.dark.border}
          rulesType="solid"
          yAxisThickness={0}
          xAxisThickness={0}
          curved
          hideDataPoints={false}
          dataPointsRadius={4}
        />
        {/* Custom Legend/Tooltip overlay could be added here if needed,
                    but gifted-charts has built-in tooltip support which is complex to customize exactly like mockup without more code.
                    For now, the basic chart conveys the data. */}
      </View>

      {/* Support Tickets */}
      <View style={styles.ticketsContainer}>
        <Text style={styles.sectionTitle}>Open Support Tickets</Text>

        <View style={styles.ticketHeader}>
          <Text style={styles.ticketHeaderId}>ID</Text>
          <Text style={styles.ticketHeaderSubject}>Subject</Text>
        </View>

        <TicketItem
          id="#TK-4821"
          subject="Payment gateway not processing transactions"
        />
        <TicketItem
          id="#TK-4819"
          subject="User login issues after system update"
        />
        <TicketItem
          id="#TK-4821"
          subject="Dashboard charts not loading correctly"
        />
        <TicketItem id="#TK-4821" subject="Email notifications delayed" />
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
    padding: 20,
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
    fontSize: 24,
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
