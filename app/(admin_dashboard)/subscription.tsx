import { SubscriptionPlan, useGetSubscriptionsQuery } from "@/api/admin-api/subscription.api";
import PlanCard from "@/components/admin-components/plan-card";
import UpdateSubscriptionBottomSheet from "@/components/admin-components/update-subscription-bottom-sheet";
import ErrorScreen from "@/components/ErrorScreen";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function SubscriptionPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { data, isLoading, isError, refetch, isFetching } =
    useGetSubscriptionsQuery(undefined);

  const handleEditPress = useCallback((plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <Layout
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Subscription Plans</Text>
          </View>
          <Button
            size="sm"
            onPress={() => router.push("/subscription-requests")}
            style={styles.requestsButton}
          >
            Review Requests
          </Button>
        </View>

        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <ErrorScreen onRetry={refetch} />
        ) : (
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <PlanCard plan={item} onEdit={handleEditPress} />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>

      <UpdateSubscriptionBottomSheet
        ref={bottomSheetModalRef}
        plan={selectedPlan}
        onSuccess={refetch}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.dark.text,
  },
  subtitle: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    marginTop: 2,
  },
  requestsButton: {
    minWidth: 120,
  },
});
