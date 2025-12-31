import {
    useGetSubscriptionRequestQuery,
} from "@/api/admin-api/subscription.api";
import ApproveSubscriptionModal from "@/components/admin-components/approve-subscription-modal";
import RqCard from "@/components/admin-components/request-card";
import ErrorScreen from "@/components/ErrorScreen";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import React, { useRef, useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";

export interface SubscriptionRequest {
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

  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const modalRef = useRef<BottomSheetModal>(null);

  const handleApprovePress = (id: number) => {
    setSelectedRequestId(id);
    modalRef.current?.present();
  };

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
          renderItem={({ item }) => (
            <RqCard
              item={item}
              refetch={refetch}
              onApprove={handleApprovePress}
            />
          )}
          keyExtractor={(item: SubscriptionRequest) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No pending requests found.</Text>
            </View>
          }
        />
      )}

      <ApproveSubscriptionModal
        ref={modalRef}
        requestId={selectedRequestId}
        onSuccess={refetch}
      />
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
