import { SubscriptionPlan, useGetSubscriptionsQuery } from "@/api/admin-api/subscription.api";
import PlanCard from "@/components/admin-components/plan-card";
import UpdateSubscriptionBottomSheet from "@/components/admin-components/update-subscription-bottom-sheet";
import ErrorScreen from "@/components/ErrorScreen";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useRef, useState } from "react";
import {
    RefreshControl,
    View
} from "react-native";

export default function SubscriptionPage() {
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
      <View>
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
