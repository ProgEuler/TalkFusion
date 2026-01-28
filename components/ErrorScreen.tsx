import colors from "@/constants/colors";
import { AlertTriangle, Info, RefreshCw, WifiOff } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "./ui/Button";

interface ErrorProps {
  title?: string;
  message?: string;
  code?: string;
  onRetry?: () => void;
  onOfflineMode?: () => void;
  component?: boolean;
}

export default function ErrorScreen({
  title = "Connection Error",
  message = "We couldn't load the screen. Please check your internet connection or try again later.",
  code = "503_SERVICE_UNAVAILABLE",
  onRetry,
  onOfflineMode,
  component,
}: ErrorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Icon Container */}
        <View style={styles.iconWrapper}>
          <View style={styles.iconCircle}>
            <WifiOff size={48} color={colors.dark.danger} />
          </View>
          <View style={styles.warningBadge}>
            <AlertTriangle size={16} color="#000" fill={colors.dark.warning} />
          </View>
        </View>
        <Text style={styles.title}>{title}</Text>

        {!component && (
          <>
            <Text style={styles.message}>{message}</Text>

            {/* Error Code */}
            <View style={styles.errorCodeContainer}>
              <Info size={16} color={colors.dark.textSecondary} />
              <Text style={styles.errorCodeText}>Error Code: {code}</Text>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <Button
                activeOpacity={0.8}
                onPress={onRetry}
              >
                <RefreshCw size={14} color="#FFFFFF" />
                {"  "}Retry Connection
              </Button>

              {onOfflineMode && (
                <TouchableOpacity
                  style={styles.offlineButton}
                  onPress={onOfflineMode}
                >
                  <Text style={styles.offlineButtonText}>
                    Go to Offline Mode
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  content: {
    alignItems: "center",
    width: "100%",
    maxWidth: 340,
  },
  iconWrapper: {
    position: "relative",
    marginBottom: 24,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.dark.cardBackground,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  warningBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.dark.cardBackground,
    padding: 6,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: colors.dark.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.dark.text,
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  errorCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark.cardBackground,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.dark.border,
    width: "100%",
  },
  errorCodeText: {
    fontFamily: "monospace", // Or Platform.select for monospace
    color: colors.dark.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  actions: {
    width: "100%",
    gap: 16,
  },
  offlineButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  offlineButtonText: {
    color: colors.dark.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
});
