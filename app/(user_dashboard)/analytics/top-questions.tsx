import { useGetQuerriesDataQuery } from "@/api/user-api/analytics.api";
import ErrorScreen from "@/components/ErrorScreen";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TopQuestions() {
  const { data, isLoading, error, refetch } =
    useGetQuerriesDataQuery(undefined);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorScreen onRetry={refetch} />;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Top AI Questions</Text>
          <Text style={styles.sectionSubtitle}>Most common queries</Text>
        </View>
      </View>

      <View style={styles.questionsList}>

         <FlashList
            data={data}
            renderItem={({ item } : {item: any} ) => (
              <View
                style={[
                  styles.questionItem,
                  item === data.length - 1 && styles.questionItemLast,
                ]}
              >
                <View style={styles.questionContent}>
                  <Text style={styles.questionText}>{item.text}</Text>
                  <Text style={styles.questionCount}>Asked {item.count} times</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text style={{color: colors.dark.textSecondary, textAlign: "center", paddingVertical: 20, fontSize: 14, fontWeight: "500"}}>No data available</Text>}
         />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
