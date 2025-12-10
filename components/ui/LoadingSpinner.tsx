import colors from "@/constants/colors";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  color?: string;
  style?: ViewStyle;
  fullscreen?: boolean;
}

export const LoadingSpinner = ({
  size = "large",
  color = colors.dark.primary,
  style,
  fullscreen = false,
}: LoadingSpinnerProps) => {
  if (fullscreen) {
    return (
        <Modal transparent visible animationType="fade">
        <View style={styles.overlay}>
          <ActivityIndicator size={size} color={color} />
        </View>
      </Modal>
    );
  }
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dark.background,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // dimmed background
    justifyContent: "center",
    alignItems: "center",
  },
});
