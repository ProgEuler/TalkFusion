import { TeamMember } from "@/api/admin-api/team-member.api";
import colors from "@/constants/colors";
import { timeAgo } from "@/utils/helpers";
import { Link2, User2 } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function MemberCard({ item: member }: { item: TeamMember }) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.userInfo}>
          {member.image ? (
            <Image source={{ uri: member.image }} style={styles.avatar} />
          ) : (
            <User2 color={"#fff"} />
          )}
          <View>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{member.name}</Text>
              <Text style={styles.name}>{member.email}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {member.is_active ? "Active" : "Inactive"}
                </Text>
                {member.is_active ? (
                  <View style={styles.statusDot} />
                ) : (
                  <View style={styles.statusDotError} />
                )}
              </View>
            </View>
            <Text style={styles.role}>{member.role}</Text>
          </View>
        </View>
        <Text style={styles.activityLabel}>Activity</Text>
      </View>

      <View style={styles.activityList}>
        <View style={styles.activityItem}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.activityText}>Last Login</Text>
            <Text style={styles.activityText}>
              {(member.last_login && timeAgo(member.last_login)) || "N/A"}
            </Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.activityText}>New User Add</Text>
            <Text style={styles.activityText}>{member.new_user_added}</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.activityText}>Invoice Download</Text>

            {member.invoices_download ? (
              <Link2 color={"#fff"} />
            ) : (
              <Text style={styles.activityText}>N/A</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.dark.border,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark.text,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.2)", // Green with opacity
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    color: colors.dark.success,
    fontWeight: "600",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.dark.success,
  },
  statusDotError: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.dark.danger,
  },
  role: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    marginTop: 2,
  },
  activityLabel: {
    fontSize: 12,
    color: colors.dark.text,
    fontWeight: "500",
  },
  activityList: {
    gap: 0,
  },
  activityItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  activityText: {
    fontSize: 14,
    color: colors.dark.text,
  },
});
