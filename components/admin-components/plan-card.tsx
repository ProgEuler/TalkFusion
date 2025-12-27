import { SubscriptionPlan } from '@/api/admin-api/subscription.api';
import colors from '@/constants/colors';
import { Check, Edit2 } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function PlanCard({
  plan,
  onEdit,
}: {
  plan: SubscriptionPlan;
  onEdit: (plan: SubscriptionPlan) => void;
}) {
  const features = useMemo(() => [
    `${plan.msg_limit} Messages`,
    `${plan.user_limit} Users`,
    `${plan.token_limit.toLocaleString()} Tokens`,
    plan.custom ? "Custom setup" : "Standard setup",
    `Duration: ${plan.duration}`,
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
      <View style={styles.planActions}>
        <Pressable style={styles.editPlanButton}>
          <Edit2 size={16} color="white" />
          <Text style={styles.buttonText}>Edit Plan</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
   planCard: {
       backgroundColor: colors.dark.cardBackground,
       borderRadius: 16,
       padding: 24,
       borderWidth: 1,
       borderColor: colors.dark.border,
       marginBottom: 16
     },
     planHeader: {
       marginBottom: 20,
     },
     planName: {
       fontSize: 18,
       fontWeight: "700",
       color: "white",
       marginBottom: 4,
     },
     planPrice: {
       fontSize: 32,
       fontWeight: "700",
       color: colors.dark.primary,
     },
     perMonth: {
       fontSize: 14,
       color: colors.dark.textSecondary,
       fontWeight: "400",
     },
     featuresList: {
       gap: 12,
       marginBottom: 24,
     },
     featureItem: {
       flexDirection: "row",
       alignItems: "center",
       gap: 10,
     },
     featureText: {
       color: colors.dark.text,
       fontSize: 14,
     },
     planActions: {
       gap: 12,
     },
     editPlanButton: {
       flexDirection: "row",
       alignItems: "center",
       justifyContent: "center",
       backgroundColor: colors.dark.primary,
       paddingVertical: 12,
       borderRadius: 8,
       gap: 8,
     },
     buttonText: {
       color: "white",
       fontWeight: "600",
       fontSize: 14,
     },
})
