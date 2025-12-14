import { useGetFinanceDataQuery } from "@/api/user-api/analytics.api";
import ErrorScreen from "@/components/Error";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import {
    BarChart2,
    CircleAlert,
    Clock,
    TrendingDown,
    TrendingUp,
    Wallet,
} from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Finance() {
  const { data, isLoading, error, refetch } = useGetFinanceDataQuery({});
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorScreen onRetry={refetch} />;

//   console.log("Finance Data:", data);
  return (
    <View style={styles.financialRow}>
      {/* total payments */}
      <View style={styles.financialCard}>
        <View style={styles.financialHeader}>
          <View
            style={[
              styles.financialIconContainer,
              { backgroundColor: colors.dark.primary + "20" },
            ]}
          >
            <Wallet color={colors.dark.primary} size={20} />
          </View>
          <Text style={styles.financialLabel}>Total Payments</Text>
        </View>
        <Text style={styles.financialValue}>
          ${data?.success_payment.current_month}
        </Text>
        {data?.success_payment.change >= 0 ? (
          <View style={styles.financialChange}>
            <TrendingUp color={colors.dark.success} size={14} />
            <Text
              style={[
                styles.financialChangeText,
                { color: colors.dark.success },
              ]}
            >
              +{data?.success_payment.difference}% from last month
            </Text>
          </View>
        ) : (
          <View style={styles.financialChange}>
            <TrendingDown color={colors.dark.danger} size={14} />
            <Text>
              <Text
                style={[
                  styles.financialChangeText,
                  { color: colors.dark.danger },
                ]}
              >
                {data?.success_payment.difference}% from last month
              </Text>
            </Text>
          </View>
        )}
      </View>

      {/* failed payments */}
      <View style={styles.financialCard}>
        <View style={styles.financialHeader}>
          <View
            style={[
              styles.financialIconContainer,
              { backgroundColor: colors.dark.primary + "20" },
            ]}
          >
            <CircleAlert color={colors.dark.danger} size={20} />
          </View>
          <Text style={styles.financialLabel}>Failed Payments</Text>
        </View>
        <Text style={styles.financialValue}>
          ${data?.failed_payment.current_month}
        </Text>
        {data?.failed_payment.change >= 0 ? (
          <View style={styles.financialChange}>
            <TrendingUp color={colors.dark.success} size={14} />
            <Text
              style={[
                styles.financialChangeText,
                { color: colors.dark.success },
              ]}
            >
              +{data?.failed_payment.last_month}% from last month
            </Text>
          </View>
        ) : (
          <View style={styles.financialChange}>
            <TrendingDown color={colors.dark.danger} size={14} />
            <Text>
              <Text
                style={[
                  styles.financialChangeText,
                  { color: colors.dark.danger },
                ]}
              >
                {data?.failed_payment.last_month}% from last month
              </Text>
            </Text>
          </View>
        )}
      </View>

      {/* pending payments */}
      <View style={styles.financialCard}>
        <View style={styles.financialHeader}>
          <View
            style={[
              styles.financialIconContainer,
              { backgroundColor: colors.dark.primary + "20" },
            ]}
          >
            <Clock color={colors.dark.primary} size={20} />
          </View>
          <Text style={styles.financialLabel}>Pending Payments</Text>
        </View>
        <Text style={styles.financialValue}>
          ${data?.pending_payment.current_month}
        </Text>
        {data?.pending_payment.change >= 0 ? (
          <View style={styles.financialChange}>
            <TrendingUp color={colors.dark.success} size={14} />
            <Text
              style={[
                styles.financialChangeText,
                { color: colors.dark.success },
              ]}
            >
              +{data?.pending_payment.difference}% from last month
            </Text>
          </View>
        ) : (
          <View style={styles.financialChange}>
            <TrendingDown color={colors.dark.danger} size={14} />
            <Text>
              <Text
                style={[
                  styles.financialChangeText,
                  { color: colors.dark.danger },
                ]}
              >
                {data?.pending_payment.difference}% from last month
              </Text>
            </Text>
          </View>
        )}
      </View>

      {/* average order */}
      <View style={styles.financialCard}>
        <View style={styles.financialHeader}>
          <View
            style={[
              styles.financialIconContainer,
              { backgroundColor: colors.dark.primary + "20" },
            ]}
          >
            <BarChart2 color={colors.dark.primary} size={20} />
          </View>
          <Text style={styles.financialLabel}>Average order</Text>
        </View>
        <Text style={styles.financialValue}>
          ${data?.average_order.current_month}
        </Text>
        {data?.average_order.change >= 0 ? (
          <View style={styles.financialChange}>
            <TrendingUp color={colors.dark.success} size={14} />
            <Text
              style={[
                styles.financialChangeText,
                { color: colors.dark.success },
              ]}
            >
              +{data?.average_order.difference}% from last month
            </Text>
          </View>
        ) : (
          <View style={styles.financialChange}>
            <TrendingDown color={colors.dark.danger} size={14} />
            <Text>
              <Text
                style={[
                  styles.financialChangeText,
                  { color: colors.dark.danger },
                ]}
              >
                {data?.average_order.difference}% from last month
              </Text>
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  financialRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  financialCard: {
    width: "48%",
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  financialHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  financialIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  financialLabel: {
    width: "70%",
    fontSize: 14,
    color: colors.dark.textSecondary,
    fontWeight: "500",
  },
  financialValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.dark.text,
    marginBottom: 8,
  },
  financialChange: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  financialChangeText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
