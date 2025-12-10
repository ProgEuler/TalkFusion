import { useGetAnalyticsDataQuery } from "@/api/user-api/analytics.api";
import Facebook from "@/assets/svgs/facebook.svg";
import WhatsApp from "@/assets/svgs/whatsapp.svg";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { RNPicker } from "@/components/ui/picker";
import colors from "@/constants/colors";
import {
   Calendar,
   DollarSign,
   Instagram,
   MessageCircle,
   User2
} from "lucide-react-native";
import React, { useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import PieChart from "react-native-pie-chart";
import Finance from "./analytics/finance";
import TopQuestions from "./analytics/top-questions";
interface PieChartData {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

const widthAndHeight = 200;

export default function AnalyticsScreen() {
  const [timeRange, setTimeRange] = useState("all");
  const [channel, setChannel] = useState("");
  const [messageType, setMessageType] = useState("all");

  const { data, isLoading, refetch } = useGetAnalyticsDataQuery({
    time: timeRange,
    channel: channel,
    type: messageType,
  });

  if (isLoading) return <LoadingSpinner />;
//   console.log("analytics data: ", data);

  const timeRangeLabelMap: Record<string, string> = {
    all: "All Time",
    today: "Today",
    this_week: "This Week",
    this_month: "This Month",
    this_year: "This Year",
  };
  const channelLabelMap = {
    "": "All Channel",
    facebook: "Facebook",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
  };

  const messageTypeLabelMap = {
    all: "All Message",
    incoming: "Incoming",
    outgoing: "Outgoing",
  };

  const totalMessages =
    (data?.message_count?.platforms?.facebook ?? 0) +
    (data?.message_count?.platforms?.instagram ?? 0) +
    (data?.message_count?.platforms?.whatsapp ?? 0);

  const series =
    totalMessages === 0
      ? [
          {
            value: 1,
            color: "#6B7280",
            label: {
              text: "No messages",
              fontSize: 12,
              fontWeight: "bold",
              outline: "white",
              fill: "#FFFFFF",
            },
          },
        ]
      : [
          {
            value: data?.message_count?.platforms?.facebook,
            color: colors.socials.facebook,
            label: {
              text: "Facebook",
              fontWeight: "bold",
              outline: "white",
            },
          },
          {
            value: data?.message_count?.platforms?.instagram,
            color: colors.socials.instagram,
            label: { text: "Instagram", fontWeight: "bold" },
          },
          {
            value: data?.message_count?.platforms?.whatsapp,
            color: colors.socials.whatsapp,
            label: {
              text: `${data?.message_count?.platforms?.whatsapp}%`,
              fontWeight: "bold",
            },
          },
        ];

  const channelData: PieChartData[] = [
    {
      label: "WhatsApp",
      value: data?.channel_messages?.whatsapp ?? 0,
      color: colors.socials.whatsapp,
      icon: <WhatsApp color={"#fff"} width={16} />,
    },
    {
      label: "Facebook",
      value: data?.channel_messages?.facebook ?? 0,
      color: colors.socials.facebook,
      icon: <Facebook color={"#fff"} width={16} />,
    },
    {
      label: "Instagram",
      value: data?.channel_messages?.instagram ?? 0,
      color: colors.socials.instagram,
      icon: <Instagram color={"#fff"} width={16} />,
    },
  ];

  return (
    <Layout refreshControl={ <RefreshControl refreshing={isLoading} onRefresh={refetch} /> }>
      {/* Filters Section */}
      <View>
        <View style={styles.filterRow}>
          <View style={styles.filterItem}>
            {/* <Text style={styles.filterLabel}>Time Range</Text> */}
            <RNPicker
              items={[
                { value: "all", label: "All Time" },
                { value: "today", label: "Today" },
                { value: "this_week", label: "This Week" },
                { value: "this_month", label: "This Month" },
                { value: "this_year", label: "This Year" },
              ]}
              label={"Time Range"}
              value={timeRangeLabelMap[timeRange] || ""}
              onSelectItem={(item) => {
                console.log("selected range: ", item);
                setTimeRange(item);
              }}
              key={timeRange}
            />
          </View>

          <View style={styles.filterItem}>
            <RNPicker
              items={[
                { value: "", label: "All Channel" },
                { value: "facebook", label: "Facebook" },
                { value: "whatsapp", label: "WhatsApp" },
                { value: "instagram", label: "Instagram" },
              ]}
              label="Channel"
              value={channelLabelMap[channel] || ""}
              onSelectItem={(item) => {
                console.log("selected channel: ", item);
                setChannel(item);
              }}
              key={channel}
            />
          </View>

          <View style={styles.filterItem}>
            <RNPicker
              items={[
                { value: "all", label: "All Message" },
                { value: "incoming", label: "Incoming" },
                { value: "outgoing", label: "Outgoing" },
              ]}
              label="All Message"
              value={messageTypeLabelMap[messageType] || ""}
              onSelectItem={(item) => {
                console.log("selected messageType: ", item);
                setMessageType(item);
              }}
              key={messageType}
            />
          </View>
        </View>
      </View>

      {/* stats */}
      <View style={styles.statsRow}>
        {/* Messages Received */}
        <View style={styles.statCard}>
          <View>
            <MessageCircle color={colors.dark.primary} size={24} />
          <Text style={styles.metricValue}>
            {data?.message_count?.total || 0}
          </Text>
          </View>
          <Text style={styles.metricLabel}>Messages Received</Text>
        </View>

        {/* Appointments Booked */}
        <View style={styles.statCard}>
          <View>
            <Calendar color={colors.dark.success} size={24} />
          </View>
          <Text style={styles.metricValue}>{data?.booking_count || 0}</Text>
          <Text style={styles.metricLabel}>Appointments Booked</Text>
        </View>

        {/* Total Revenue */}
        <View style={styles.statCard}>
          <View>
            <DollarSign color={colors.dark.primaryLight} size={24} />
          </View>
          <Text style={styles.metricValue}>
            ${data?.total_revenue?.total?.toLocaleString() || 0}
          </Text>
          <Text style={styles.metricLabel}>Total Revenue</Text>
        </View>

        {/* New Customers */}
        <View style={styles.statCard}>
          <View>
            <User2 color={colors.dark.warning} size={24} />
          </View>
          <Text style={styles.metricValue}>{data?.new_customers || 0}</Text>
          <Text style={styles.metricLabel}>New Customers</Text>
        </View>

        {/* Unanswered Messages */}
        <View style={styles.statCard}>
          <View>
            <MessageCircle color={colors.dark.danger} size={24} />
          </View>
          <Text style={styles.metricValue}>
            {data?.unanswered_messages || 0}
          </Text>
          <Text style={styles.metricLabel}>Unanswered Messages</Text>
        </View>
      </View>

      {/* Channel Distribution */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Channel Distribution</Text>
            <Text style={styles.sectionSubtitle}>Message sources</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chartWrapper}>
            <PieChart widthAndHeight={widthAndHeight} series={series} />
          </View>

          <View style={styles.legendContainer}>
            {channelData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: item.color }]}
                >
                  {item.icon}
                </View>
                <Text style={styles.legendLabel}>{item.label}</Text>
                <Text style={{ color: "#FFFFFF" }}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <Finance />

      {/* Top AI Questions */}
      <TopQuestions />
    </Layout>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.dark.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    fontWeight: "600" as const,
    marginBottom: 4,
  },
  statSubLabel: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 32,
    color: colors.dark.text,
    fontWeight: "700" as const,
  },
  filterRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 12,
  },
  filterItem: {
    flex: 1,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.dark.text,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  chartContainer: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.dark.border,
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  chartWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  legendContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendColor: {
    width: 18,
    height: 18,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  legendLabel: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "500",
  },
  financialRow: {
    flexWrap: "wrap",
    width: "48%",
    gap: 12,
    marginBottom: 24,
  },
  financialCard: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  financialHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  financialIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  financialLabel: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    fontWeight: "500",
  },
  financialValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.dark.text,
    marginBottom: 8,
  },
  financialChange: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  financialChangeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  questionsList: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.dark.border,
    overflow: "hidden",
  },
  questionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  questionItemLast: {
    borderBottomWidth: 0,
  },
  questionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "500",
    flex: 1,
    marginRight: 12,
  },
  questionCount: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    fontWeight: "500",
  },
});
