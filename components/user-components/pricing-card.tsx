import { SubscriptionPlan } from "@/api/admin-api/subscription.api";
import colors from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Check, Coins, MessageSquare, Users, Zap } from "lucide-react-native";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width: viewportWidth } = Dimensions.get("window");

interface PricingCardProps {
  item: SubscriptionPlan;
  onGetStarted: () => void;
}

export default function PricingCard({
  item,
  onGetStarted,
}: PricingCardProps) {
  const isPremium = item.name.toLowerCase() === "growth";

  return (
    <View style={styles.cardContainer}>
      <View
        style={[styles.card, isPremium && styles.premiumCard]}
      >
        {isPremium && (
          <View style={styles.popularBadge}>
            <Zap size={12} color="#FFFFFF" fill="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
          </View>
        )}

        <View style={styles.header}>
          <Text style={styles.planName}>{item.name.toUpperCase()}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currency}>$</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.duration}>/{item.duration === "months" ? "mo" : item.duration}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.features}>
          <FeatureItem
            icon={<MessageSquare size={18} color={colors.dark.primary} />}
            text={`${item.msg_limit.toLocaleString()} Messages`}
          />
          <FeatureItem
            icon={<Users size={18} color={colors.dark.primary} />}
            text={`${item.user_limit} User Accounts`}
          />
          <FeatureItem
            icon={<Coins size={18} color={colors.dark.primary} />}
            text={`${(item.token_limit / 1000000).toFixed(1)}M Tokens`}
          />
          <FeatureItem
            icon={<Check size={18} color={colors.dark.success} />}
            text="Priority Support"
          />
          <FeatureItem
            icon={<Check size={18} color={colors.dark.success} />}
            text="Advanced Analytics"
          />
        </View>

        <TouchableOpacity onPress={onGetStarted} activeOpacity={0.8}>
          <LinearGradient
            colors={
              isPremium
                ? [colors.dark.gradientStart, colors.dark.gradientEnd]
                : ["#334155", "#1E293B"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.getStartedButton}
          >
            <Text style={styles.getStartedButtonText}>
              {isPremium ? "Go Growth" : "Start Essential"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: viewportWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: "#1E293B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
    height: 480,
    justifyContent: 'space-between'
  },
  premiumCard: {
    borderColor: colors.dark.primary,
    borderWidth: 1.5,
  },
  popularBadge: {
    position: "absolute",
    top: -12,
    alignSelf: 'center',
    backgroundColor: colors.dark.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  popularBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  planName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.dark.primary,
    letterSpacing: 2,
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  currency: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
    marginRight: 2,
  },
  price: {
    fontSize: 56,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  duration: {
    fontSize: 18,
    color: "#94A3B8",
    marginBottom: 10,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#1E293B",
    marginVertical: 10,
  },
  features: {
    marginBottom: 20,
    flex: 1,
    justifyContent: 'center'
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: "#CBD5E1",
    fontWeight: "500",
  },
  getStartedButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  getStartedButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
