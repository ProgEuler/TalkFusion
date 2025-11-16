import { Layout } from "@/components/layout/Layout";
import colors from "@/constants/colors";
import {
  Briefcase,
  Building2,
  Clock,
  Download,
  FileText,
  Upload,
} from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  itemCount: number;
}

function CategoryCard({ icon, title, itemCount }: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.categoryCard}>
      <View style={styles.categoryIconContainer}>{icon}</View>
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={styles.categoryCount}>{itemCount} items</Text>
    </TouchableOpacity>
  );
}

interface ActivityItemProps {
  title: string;
  description: string;
  date: string;
  iconColor: string;
}

function ActivityItem({
  title,
  description,
  date,
  iconColor,
}: ActivityItemProps) {
  return (
    <View style={styles.activityItem}>
      <View style={[styles.activityDot, { backgroundColor: iconColor }]} />
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>{title}</Text>
          <Text style={styles.activityDate}>{date}</Text>
        </View>
        <Text style={styles.activityDescription}>{description}</Text>
      </View>
    </View>
  );
}

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
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Knowledge</Text>
          </TouchableOpacity>
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
        <View style={styles.categoriesGrid}>
          <CategoryCard
            icon={<Building2 color={colors.dark.warning} size={24} />}
            title="Company Info"
            itemCount={1}
          />
          <CategoryCard
            icon={<Briefcase color={colors.dark.success} size={24} />}
            title="Services"
            itemCount={7}
          />
          <CategoryCard
            icon={<Clock color={colors.dark.primary} size={24} />}
            title="Opening Hours"
            itemCount={3}
          />
          <CategoryCard
            icon={<FileText color={colors.dark.primary} size={24} />}
            title="Policies"
            itemCount={7}
          />
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Activity Log</Text>
        <View style={styles.activityLog}>
          <ActivityItem
            title="Price list updated"
            description="Haircut price changed from €12 to €15"
            date="Today, 10:24 AM"
            iconColor={colors.dark.primary}
          />
          <ActivityItem
            title="New FAQ added"
            description="'What payment methods do you accept?'"
            date="Yesterday, 3:45 PM"
            iconColor={colors.dark.success}
          />
          <ActivityItem
            title="Working hours updated"
            description="Extended Saturday hours"
            date="Oct 27, 2023"
            iconColor={colors.dark.primary}
          />
          <ActivityItem
            title="Service removed"
            description="'Beard trimming' service deleted"
            date="Oct 18, 2023"
            iconColor={colors.dark.danger}
          />
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Import/Export</Text>
        <Text style={styles.importExportDescription}>
          Quickly add information in bulk or export your AI knowledge for
          review.
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.importButton}>
            <Upload color="#FFFFFF" size={18} />
            <Text style={styles.importButtonText}>Import</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportButton}>
            <Download color="#FFFFFF" size={18} />
            <Text style={styles.exportButtonText}>Export</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  healthCard: {
    backgroundColor: colors.dark.cardBackground,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  healthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  healthTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: colors.dark.text,
    marginBottom: 4,
  },
  healthSubtitle: {
    fontSize: 13,
    color: colors.dark.textSecondary,
    lineHeight: 18,
    maxWidth: 200,
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
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap" as const,
    gap: 12,
  },
  categoryCard: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    width: "48%",
    borderWidth: 1,
    borderColor: colors.dark.border,
    alignItems: "center",
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: colors.dark.text,
    marginBottom: 4,
    textAlign: "center" as const,
  },
  categoryCount: {
    fontSize: 12,
    color: colors.dark.textSecondary,
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
  importExportDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  importButton: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  importButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600" as const,
  },
  exportButton: {
    flex: 1,
    backgroundColor: colors.dark.cardBackground,
    borderWidth: 1,
    borderColor: colors.dark.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  exportButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600" as const,
  },
});
