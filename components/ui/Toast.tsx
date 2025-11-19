import { AlertCircle, CheckCircle } from "lucide-react-native";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
    FadeInUp,
    FadeOutUp
} from "react-native-reanimated";

type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  visible: boolean;
  onHide: () => void;
}

export const Toast = ({ message, type, visible, onHide }: ToastProps) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  if (!visible) return null;

  const backgroundColor = type === "success" ? "#10B981" : "#EF4444";
  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <Animated.View
      entering={FadeInUp.springify()}
      exiting={FadeOutUp}
      style={[styles.container, { backgroundColor }]}
    >
      <Icon color="#FFFFFF" size={24} />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
});
