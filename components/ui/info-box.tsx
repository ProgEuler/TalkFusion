import colors from "@/constants/colors";
import { getHostname } from "@/utils/helpers";
import { ExternalLink } from "lucide-react-native";
import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const InfoRow = ({
  label,
  value,
  url,
}: {
  label: string;
  value: string;
  url?: boolean;
}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>

    {url ? (
      <TouchableOpacity
        onPress={() => Linking.openURL(
         (!value.startsWith("https") ? "https://" + value : value)
        )}
        style={{ flexDirection: "row", gap: 6 }}
      >
        <ExternalLink color={colors.dark.primaryLight} size={14} />
        <Text style={styles.infoValueUrl}>{getHostname(value) || "-"}</Text>
      </TouchableOpacity>
    ) : (
      <Text style={styles.infoValue}>{value || "-"}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  infoValueUrl: {
    fontSize: 14,
    color: colors.dark.primaryLight,
    fontWeight: "500",
    textAlign: "right",
  },
  infoValue: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
    marginLeft: 16,
  },
});
