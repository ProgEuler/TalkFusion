import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/constants/colors";

interface PricingCardProps {
  planName: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  onGetStarted: () => void;
}

export default function PricingCard({
  planName,
  price,
  features,
  isPopular = false,
  onGetStarted,
}: PricingCardProps) {
  return (
    <View style={[styles.card, isPopular && styles.popularCard]}>
      {isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularBadgeText}>POPULAR</Text>
        </View>
      )}
      <Text style={styles.planName}>{planName}</Text>
      <Text style={styles.price}>{price}</Text>
      <View style={styles.features}>
        {features.map((feature, index) => (
          <Text key={index} style={styles.featureText}>
            {feature}
          </Text>
        ))}
      </View>
      <TouchableOpacity onPress={onGetStarted}>
        <LinearGradient
          colors={
            isPopular
              ? [colors.dark.gradientStart, colors.dark.gradientEnd]
              : ["#3A3A3C", "#3A3A3C"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.getStartedButton}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2C2C2E",
    borderRadius: 16,
    padding: 24,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "#3A3A3C",
  },
  popularCard: {
    borderColor: colors.dark.primary,
    borderWidth: 2,
  },
  popularBadge: {
    position: "absolute",
    top: -12,
    right: 16,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700" as const,
  },
  planName: {
    fontSize: 20,
    fontWeight: "600" as const,
    color: "#FFFFFF",
    marginBottom: 12,
  },
  price: {
    fontSize: 48,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    marginBottom: 24,
  },
  features: {
    marginBottom: 32,
  },
  featureText: {
    fontSize: 16,
    color: "#A0A0A0",
    marginBottom: 8,
  },
  getStartedButton: {
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  getStartedButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600" as const,
  },
});
