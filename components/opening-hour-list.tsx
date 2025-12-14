import { useGetOpeningHoursQuery } from "@/api/user-api/company.api";
import colors from "@/constants/colors";
import { Clock } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ErrorScreen from "./Error";
import { LoadingSpinner } from "./ui/LoadingSpinner";

export default function OpeningHourList() {
  const { data: openingHour, isLoading, error, refetch } = useGetOpeningHoursQuery(undefined);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorScreen onRetry={refetch} component />;

  return (
    <View style={styles.categoryCardFull}>
      <View style={styles.sectionHeader}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: "rgba(59, 130, 246, 0.1)" },
            ]}
          >
            <Clock color={colors.dark.primary} size={20} />
          </View>
          <Text style={styles.categoryTitle}>Opening Hours</Text>
        </View>
      </View>

      <View style={styles.listContent}>
        {openingHour?.map((hour: any, index: number) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.daysContainer}>
              <View style={styles.dayChip}>
                <Text style={styles.dayChipText}>{hour.day}</Text>
              </View>
            </View>
            <Text style={styles.hoursText}>
              {hour.start} - {hour.end}
            </Text>
          </View>
        ))}
        {(!openingHour || openingHour.length === 0) && (
          <Text style={styles.emptyText}>No opening hours set</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryCardFull: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.dark.border,
    paddingBottom: 16,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: colors.dark.text,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  listItemTitle: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "500",
  },
  listItemSub: {
    fontSize: 13,
    color: colors.dark.textSecondary,
  },
  emptyText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    fontStyle: "italic",
    textAlign: "center",
    padding: 8,
  },
  daysContainer: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
    flex: 1,
  },
  dayChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dayChipText: {
    fontSize: 12,
    color: colors.dark.text,
    textTransform: "capitalize",
  },
  hoursText: {
    fontSize: 13,
    color: colors.dark.textSecondary,
    marginLeft: 12,
  },
});
