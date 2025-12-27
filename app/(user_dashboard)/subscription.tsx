import { SubscriptionPlan, useGetSubscriptionsQuery } from "@/api/admin-api/subscription.api";
import ErrorScreen from "@/components/ErrorScreen";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { FlashList } from "@shopify/flash-list";
import { Check } from "lucide-react-native";
import React, { useMemo } from "react";
import {
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const PlanCard = ({ plan }: { plan: SubscriptionPlan }) => {
  const features = useMemo(() => [
    `${plan.msg_limit} Messages`,
    `${plan.user_limit} Users`,
    `${plan.token_limit.toLocaleString()} Tokens`,
    plan.custom ? "Custom configuration" : "Standard configuration",
    `Billed ${plan.duration}`,
  ], [plan]);

  return (
    <View style={styles.planCard}>
      <View style={styles.planHeader}>
        <Text style={styles.planName}>{plan.name.toUpperCase()}</Text>
        <Text style={styles.planPrice}>
          ${plan.price}
          <Text style={styles.perMonth}>/{plan.duration === 'months' ? 'mo' : 'yr'}</Text>
        </Text>
      </View>
      <View style={styles.featuresList}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Check size={14} color={colors.dark.success} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.subscribeButton}>
        <Text style={styles.subscribeButtonText}>Select Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function UserSubscriptionPage() {
  const { data, isLoading, isError, refetch, isFetching } =
    useGetSubscriptionsQuery(undefined);

  return (
    <Layout
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Subscription Plans</Text>
        <Text style={styles.pageSubtitle}>Choose the plan that's right for your business</Text>
      </View>

      <View style={styles.plansContainer}>
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <ErrorScreen onRetry={refetch} />
        ) : (
          <FlashList
            data={data}
            renderItem={({ item }) => <PlanCard plan={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    gap: 4,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.dark.text,
  },
  pageSubtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  plansContainer: {
    flex: 1,
  },
  planCard: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  planHeader: {
    marginBottom: 24,
  },
  planName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.dark.primary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.dark.text,
  },
  perMonth: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    fontWeight: "400",
  },
  featuresList: {
    gap: 16,
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureText: {
    color: colors.dark.text,
    fontSize: 15,
  },
  subscribeButton: {
    backgroundColor: colors.dark.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  subscribeButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
