import { useGetActivityQuery } from "@/api/user-api/company.api";
import colors from "@/constants/colors";
import { timeAgo } from "@/utils/helpers";
import { FlashList } from "@shopify/flash-list";
import { Info, RefreshCcw } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface ActivityItemProps {
  title: string;
  description: string;
  timestamp: string;
}

function ActivityItem({ title, description, timestamp }: ActivityItemProps) {
  return (
    <View style={styles.activityItem}>
      <View>
        <Info color={"#fff"} />
      </View>
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>{title}</Text>
          <Text style={styles.activityDate}>{timestamp}</Text>
        </View>
        <Text style={styles.activityDescription}>{description}</Text>
      </View>
    </View>
  );
}

export default function ActivityLog() {
  const { data, isLoading, refetch } = useGetActivityQuery(undefined);
  console.table(data)

  if(isLoading) return <LoadingSpinner />

  return (
    <View>
      <View style={{ flexDirection: "row", gap: 12 }}>
      <Text style={styles.sectionTitle}>Activity Log</Text>
      <RefreshCcw color={"#fff"} onPress={refetch} />
      </View>
      <View style={styles.activityLog}>
        <FlashList
          data={data}
          renderItem={({ item }: { item: ActivityItemProps }) => (
            <ActivityItem
              title={item.title}
              description={item.description}
              timestamp={timeAgo(item.timestamp)}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: colors.dark.text,
    marginBottom: 16,
  },
  activityLog: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  activityItem: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
    alignItems: "center",
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: colors.dark.text,
  },
  activityDate: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
  activityDescription: {
    fontSize: 13,
    color: colors.dark.textSecondary,
    lineHeight: 18,
  },
});
