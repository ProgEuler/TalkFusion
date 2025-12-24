import CompanyInfo from "@/components/company-info";
import { Layout } from "@/components/layout/Layout";
import OpeningHourList from "@/components/opening-hour-list";
import Services from "@/components/servics";
import ActivityLog from "@/components/user-components/activity-log";
import colors from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function KnowledgeBaseScreen() {
  return (
    <Layout>
      <View style={styles.section}>
        <View style={styles.healthHeader}>
          <View>
            <Text style={styles.healthTitle}>Knowledge Base Health</Text>
            <Text style={styles.healthSubtitle}>
              Your AI knowledge is 70% complete. Add missing information for
              better results.
            </Text>
          </View>
        </View>

        <View style={styles.healthPercentageContainer}>
          <View style={styles.percentageCircle}>
            <Text style={styles.percentageText}>70%</Text>
          </View>
        </View>

        <View style={styles.statusTags}>
          <View style={[styles.statusTag, styles.statusTagDanger]}>
            <Text style={styles.statusTagText}>missing items</Text>
          </View>
          <View style={[styles.statusTag, styles.statusTagDanger]}>
            <Text style={styles.statusTagText}>incomplete</Text>
          </View>
          <View style={[styles.statusTag, styles.statusTagDanger]}>
            <Text style={styles.statusTagText}>needs update</Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Knowledge Categories</Text>

        <View style={{ gap: 16 }}>

          <CompanyInfo />

          <Services />

          <OpeningHourList />

          <ActivityLog />
        </View>
      </View>

    </Layout>
  );
}

const styles = StyleSheet.create({
  healthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  healthTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600" as const,
    color: colors.dark.text,
    marginBottom: 4,
  },
  healthSubtitle: {
    fontSize: 13,
    color: colors.dark.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  addButton: {
    backgroundColor: colors.dark.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600" as const,
  },
  healthPercentageContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  percentageCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    borderWidth: 3,
    borderColor: colors.dark.danger,
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: colors.dark.text,
  },
  statusTags: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap" as const,
  },
  statusTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusTagDanger: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
  },
  statusTagText: {
    fontSize: 12,
    color: colors.dark.danger,
    fontWeight: "500" as const,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: colors.dark.text,
    marginBottom: 16,
  },
});
