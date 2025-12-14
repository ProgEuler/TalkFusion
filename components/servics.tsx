import { useGetServicesQuery } from "@/api/user-api/company.api";
import colors from "@/constants/colors";
import { FlashList } from "@shopify/flash-list";
import { Briefcase } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ErrorScreen from "./Error";
import { LoadingSpinner } from "./ui/LoadingSpinner";

export default function Services() {
  const { data: services, isLoading, error, refetch } = useGetServicesQuery(undefined);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorScreen onRetry={refetch} component />;

  return (
    <View style={styles.categoryCardFull}>
      <View style={styles.sectionHeader}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: "rgba(16, 185, 129, 0.1)" },
            ]}
          >
            <Briefcase color={colors.dark.success} size={20} />
          </View>
          <Text style={styles.categoryTitle}>
            Services ({services?.length || 0})
          </Text>
        </View>
      </View>

      <View style={styles.listContent}>
        <FlashList
          data={services || []}
          keyExtractor={(item: any) => item.id || item.name}
          renderItem={({ item: service }: any) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>{service.name}</Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Text style={styles.listItemSub}>${service.price}</Text>
            </View>
          </View>
          )}
          />
        {(!services || services.length === 0) && (
          <Text style={styles.emptyText}>No services added yet</Text>
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
});
