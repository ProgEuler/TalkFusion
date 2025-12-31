import {
   useRejectSubscriptionRequestMutation,
} from "@/api/admin-api/subscription.api";
import colors from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { toast } from "sonner-native";
import { Button } from "../ui/Button";

export default function RqCard({ item, refetch, onApprove }) {
  const [rejectRequest, { isLoading: isRejecting }] =
    useRejectSubscriptionRequestMutation();

  const handleReject = async (id: number) => {
    try {
      await rejectRequest(id).unwrap();
      toast.success("Subscription request rejected successfully");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.detail || "Failed to reject request");
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item?.user?.name || "N/A"}</Text>
          <Text style={styles.userEmail}>{item?.email || "N/A"}</Text>
          {item?.user?.company_name && (
            <Text style={styles.companyName}>{item.user.company_name}</Text>
          )}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.limitsContainer}>
        <View style={styles.limitItem}>
          <Text style={styles.limitLabel}>Message Limit</Text>
          <Text style={styles.limitValue}>
            {item?.msg_limit?.toLocaleString() || "0"}
          </Text>
        </View>
        <View style={styles.limitItem}>
          <Text style={styles.limitLabel}>User Limit</Text>
          <Text style={styles.limitValue}>
            {item?.user_limit?.toLocaleString() || "0"}
          </Text>
        </View>
        <View style={styles.limitItem}>
          <Text style={styles.limitLabel}>Token Limit</Text>
          <Text style={styles.limitValue}>
            {item?.token_limit?.toLocaleString() || "0"}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          style={styles.actionButton}
          onPress={() => onApprove(item.id)}
          disabled={isRejecting}
        >
          Approve
        </Button>
        <Button
          variant="destructive_outline"
          style={styles.actionButton}
          onPress={() => handleReject(item.id)}
          isLoading={isRejecting}
        >
          Reject
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.dark.text,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 2,
  },
  companyName: {
    fontSize: 12,
    color: colors.dark.primary,
    fontWeight: "600",
  },
  roleBadge: {
    backgroundColor: "rgba(110, 86, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  roleText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.dark.primary,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: colors.dark.border,
    marginBottom: 16,
  },
  limitsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  limitItem: {
    alignItems: "flex-start",
  },
  limitLabel: {
    fontSize: 10,
    color: colors.dark.textSecondary,
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 1,
  },
  limitValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.dark.text,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
