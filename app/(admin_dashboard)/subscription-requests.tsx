import {
  useApproveSubscriptionRequestMutation,
  useGetSubscriptionRequestQuery,
  useRejectSubscriptionRequestMutation,
} from "@/api/admin-api/subscription.api";
import ErrorScreen from "@/components/ErrorScreen";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { toast } from "sonner-native";

interface SubscriptionRequest {
  id: number;
  user: {
    id: number;
    name: string | null;
    role: string;
    email: string;
    company_name: string | null;
    is_active: boolean;
  };
  email: string;
  msg_limit: number;
  user_limit: number;
  token_limit: number;
}

export default function SubscriptionRequestsPage() {
  const { data, isLoading, isError, refetch, isFetching } =
    useGetSubscriptionRequestQuery(undefined);

  const [approveRequest, { isLoading: isApproving }] =
    useApproveSubscriptionRequestMutation();
  const [rejectRequest, { isLoading: isRejecting }] =
    useRejectSubscriptionRequestMutation();

  const handleApprove = async (id: number) => {
    try {
      await approveRequest(id).unwrap();
      toast.success("Subscription request approved successfully");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.detail || "Failed to approve request");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectRequest(id).unwrap();
      toast.success("Subscription request rejected successfully");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.detail || "Failed to reject request");
    }
  };

  const renderItem = ({ item }: { item: SubscriptionRequest }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user.name || "N/A"}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
          {item.user.company_name && (
            <Text style={styles.companyName}>{item.user.company_name}</Text>
          )}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.limitsContainer}>
        <View style={styles.limitItem}>
          <Text style={styles.limitLabel}>Message Limit</Text>
          <Text style={styles.limitValue}>
            {item.msg_limit.toLocaleString()}
          </Text>
        </View>
        <View style={styles.limitItem}>
          <Text style={styles.limitLabel}>User Limit</Text>
          <Text style={styles.limitValue}>
            {item.user_limit.toLocaleString()}
          </Text>
        </View>
        <View style={styles.limitItem}>
          <Text style={styles.limitLabel}>Token Limit</Text>
          <Text style={styles.limitValue}>
            {item.token_limit.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          style={styles.actionButton}
          onPress={() => handleApprove(item.id)}
          isLoading={isApproving}
          disabled={isRejecting}
        >
          Approve
        </Button>
        <Button
          variant="destructive_outline"
          style={styles.actionButton}
          onPress={() => handleReject(item.id)}
          isLoading={isRejecting}
          disabled={isApproving}
        >
          Reject
        </Button>
      </View>
    </View>
  );

  return (
    <Layout
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
    >
      <View style={styles.pageHeader}>
        <Text style={styles.subtitle}>
          Review and manage custom subscription plan requests from users.
        </Text>
      </View>

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <ErrorScreen onRetry={refetch} />
      ) : (
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: SubscriptionRequest) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No pending requests found.</Text>
            </View>
          }
        />
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  pageHeader: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.dark.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    lineHeight: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
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
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: colors.dark.textSecondary,
  },
});
